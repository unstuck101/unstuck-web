# unstuck-web

Landing page for **Unstuck** (joinunstuck.com) — a premium, conversion-focused redesign built as a static site with no build step or dependencies.

## Structure

```
index.html       # Page markup (all sections)
css/styles.css   # Design system + styles (theme tokens at the top)
js/main.js       # Scroll effects & interactions
```

## Rebranding / theming

All brand colors live in CSS custom properties at the top of `css/styles.css`:

```css
--brand-1: #3b6bff;     /* primary */
--brand-2: #8b5cf6;     /* secondary / gradient end */
--brand-glow: #4f7dff;  /* glows & background orbs */
--accent-warm: #ffb454; /* stars / warm highlights */
```

Change those four values and the entire page — buttons, gradients, orbs, icons, charts — updates to match.

## Booking link

The CTA buttons point at `#book` (the offer section). To route them to the live
GoHighLevel calendar, set `BOOKING_URL` at the bottom of `js/main.js`.

## Running locally

Any static server works:

```
python3 -m http.server 8080
```

Then open http://localhost:8080. The site can be hosted on GitHub Pages, Netlify,
Vercel, or pasted into a GoHighLevel custom-code page.
