# unstuck-web

Source for the Travis Ala digital business card (https://contact.mrunstuck.com/).
Static site, no build step.

## The handshake
"Save Contact" doesn't download anything directly. It opens a short step: first name,
mobile number, and what brings them here. On submit:
1. The entry is sent to **Netlify Forms** (form name `contact-save`, backup copy) and to a **Zapier webhook**
   (workflow "Contact card lead to GHL"), which creates a GoHighLevel contact + opportunity in the
   **Contact Card** pipeline (tags: `contact-card`, `cc-help` / `cc-business` / `cc-connecting`, `src-<label>`).
   Accounts written to are listed in the `ACCOUNTS` array of that workflow (currently Unstuck LLC).
2. The contact card unlocks, and the next step adapts to the reason they chose
   (Looking for help -> Book a Call, Speaking or business -> prefilled email, Just connecting -> text prefilled with their name).

Only the Unstuck work cell is on the card. No personal number is stored anywhere in this repo.
The vCard is embedded in `index.html` (base64), not served as a public file, so there is no link to share around the gate.
Spam: a hidden honeypot field drops bots. Add `?src=church` (any label) to a link to see where leads came from.

To change the card, regenerate the base64 vCard and replace the `CARD` string in `index.html`.

Note: the gate is a handshake, not a lock. Someone who reads the page source could decode the work-cell card.
That's by design for a business line. Never put a personal number in here.
