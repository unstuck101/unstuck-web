# unstuck-web

Landing page for **Steward Sober Living** — a premium rebuild of the original GoHighLevel page as a dependency-free static site (no build step).

## Structure

```
index.html       # Page markup (all sections)
css/styles.css   # Design system + styles (brand tokens at the top)
js/main.js       # Scroll effects & interactions
assets/          # (optional) real photos — see below
```

## Brand tokens

All brand colors live in CSS custom properties at the top of `css/styles.css`:

```css
--navy: #0a121e;        /* deep navy backgrounds */
--cream: #f6f2ea;       /* light sections */
--gold: #c6a14f;        /* brand gold */
--gold-bright: #e6c980; /* gold gradient light end */
--gold-deep: #9a7a2e;   /* gold gradient dark end */
```

## Swapping in real assets

Two framed placeholders are ready for the real photos:

- **Case study property photo** — replace the `.case__photo-frame` div in
  `index.html` with `<img src="assets/case-study.jpg" alt="...">`
- **Founder portrait** — replace the `.founder__frame` div with
  `<img src="assets/founder.jpg" alt="Jared Galde, Founder">`
- **US properties map** — the stylized SVG map in the Model section can be
  replaced with the real map image the same way.

## Buyer's list link

All CTA buttons resolve through `BUYERS_LIST_URL` at the bottom of
`js/main.js`. Set it to the live GoHighLevel form/calendar URL and every
button on the page updates.

## Running locally

```
python3 -m http.server 8080
```

Then open http://localhost:8080. Host on GitHub Pages, Netlify, Vercel, or
paste into a GoHighLevel custom-code page.
