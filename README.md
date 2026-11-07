# unstuck-web

Source for https://contact.mrunstuck.com/ (Travis Ala digital business card).
Static site, no build step. Open `index.html` to preview.

## How it works
The page opens with "How do we know each other?" and hands out a different contact card:

| Choice | Contact file | Includes personal cell? | Next step |
|---|---|---|---|
| We just met | `travis-ala-friend.vcf` | Yes | Save + "Text me your name" |
| I'm looking for help | `travis-ala-business.vcf` | No | Book a Call + Save |
| Speaking or business | `travis-ala-business.vcf` | No | Email + Save |

`travis-ala.vcf` is the original card (kept so old links keep working).

## Separate QR codes / NFC tags
Preselect a path with a URL parameter, e.g. `https://contact.mrunstuck.com/?for=friend`
(`friend`, `help`, `biz`). Use `?for=friend` for church and personal circles, `?for=help` for coaching.

Note: this is a soft filter. The friend vCard URL is public, so anyone who knows it can download it.
