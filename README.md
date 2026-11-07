# unstuck-web

Source for the Travis Ala digital business card (https://contact.mrunstuck.com/).
Static site, no build step.

## The handshake
"Save Contact" doesn't download anything directly. It opens a short step: first name,
mobile number, and what brings them here. On submit:
1. The entry is sent to **Netlify Forms** (form name `contact-save`, backup copy) and to a **Zapier webhook**
   (workflow "Contact card lead to GHL"), which creates a GoHighLevel contact + opportunity in the
   **Contact Card** pipeline (tags: `contact-card`, `cc-help` / `cc-business` / `cc-connecting`, `src-<label>`).
   Leads go to ONE GoHighLevel account on purpose: **MRUNSTUCK.COM** (never duplicated across accounts).
   Other brands get their own workflow + their own Zapier connection.
   Status: LIVE. Zapier workflow "Contact card lead to GHL" is bound to the MRUNSTUCK.COM LeadConnector connection only.
2. The contact card unlocks, and the next step adapts to the reason they chose
   (Looking for help -> Book a Call, Speaking or business -> prefilled email, Just connecting -> text prefilled with their name).

Only the Unstuck work cell is on the card. No personal number is stored anywhere in this repo.
The vCard is embedded in `index.html` (base64), not served as a public file, so there is no link to share around the gate.
Spam: a hidden honeypot field drops bots. Add `?src=church` (any label) to a link to see where leads came from.

To change the card, regenerate the base64 vCard and replace the `CARD` string in `index.html`.

Note: the gate is a handshake, not a lock. Someone who reads the page source could decode the work-cell card.
That's by design for a business line. Never put a personal number in here.

## Scan mode
The "Scan" button (top right) shows a full-screen QR code of this page with `?src=scan`, so the handshake happens on the OTHER person's phone when Travis is showing his own screen. "Text Them the Link" uses the phone's share sheet. The QR is generated in-page (no external library). Leads from it carry the `src-scan` tag.
