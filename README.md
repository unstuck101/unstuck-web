# unstuck-web

Source for the Travis Ala digital business card (https://contact.mrunstuck.com/).
Static site, no build step.

## The flow
Step 1: pick a branch (help / speaking-business / just connecting). Step 2: first name + mobile (auto-formatted).
Step 3: unlocked card + "next moves" tiles tailored to the branch. Returning visitors (localStorage) land straight on step 3.
`?for=help|biz|connect` preselects the branch. The "Everywhere Travis is" grid consolidates app, podcast, booking and socials;
the app tile links straight to the App Store on iPhone and Google Play on Android.

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
The vCard is served from an unlisted path (`/card/travis-ala-mrunstuck.vcf`, noindex + no-store via `_headers`, disallowed in `robots.txt`)
so iPhones open the native "New Contact" sheet instead of saving a blob to Files. The work cell is already public on the card (Call/Text),
so the handshake gates the *saveable card and the lead capture*, not the number.
Spam: a hidden honeypot field drops bots. Add `?src=church` (any label) to a link to see where leads came from.

To change the card, replace `card/travis-ala-mrunstuck.vcf`.

Note: the gate is a handshake, not a lock. Someone who reads the page source could decode the work-cell card.
That's by design for a business line. Never put a personal number in here.

## Scan mode
The "Scan" button (top right) shows a full-screen QR code of this page with `?src=scan`, so the handshake happens on the OTHER person's phone when Travis is showing his own screen. "Text Them the Link" uses the phone's share sheet. The QR is generated in-page (no external library). Leads from it carry the `src-scan` tag.
