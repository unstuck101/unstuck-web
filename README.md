# unstuck-web

Source for https://contact.mrunstuck.com/ (Travis Ala digital business card).
Static site, no build step. Open `index.html` to preview.

## Contact tiers
- **Public (everyone):** Save Contact, Call, Text, Email all use the Unstuck **work cell** (`travis-ala.vcf`).
- **Help / business:** "I'm looking for help" goes to Book a Call. "Speaking or business" opens a prefilled email.
- **Inner circle (personal cell):** locked behind a word Travis tells people in person. The personal vCard is
  AES-GCM encrypted in `inner.json`, so the number is not readable in the page source or any file.
  The Inner circle option stays hidden until `inner.json` exists.

## Turn on / change the Inner circle
1. Make a vCard with the personal number (any file, keep it OUT of git): `personal.vcf`
2. `node tools/seal.mjs personal.vcf "the word"` writes `inner.json` (commit that, not the vcf).
3. Re-run with a new word any time to rotate it. Old word stops working.

The word is case-insensitive and ignores surrounding spaces. Pick something not guessable
from his public profiles. This stops casual access; it is not a defense against a determined
attacker who can try many words (the file is public, so a weak word can be guessed offline).

## Preselect a path (QR codes / NFC tags)
`?for=help`, `?for=biz`, `?for=inner`
