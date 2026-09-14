# Emilio Carpio · Portfolio

Personal portfolio of Emilio Carpio, frontend and full-stack developer.

**Live:** https://freakcarpio.github.io/

## About the project

A hand-built site with no frameworks and no build step: semantic HTML, modern CSS and native JavaScript modules. The visual direction, "Two-Ink Poster", borrows from screen-printed gig posters: black paper, light ink and a red plate printed slightly off register.

It features:

- **Fretmaid**, my engineering thesis: an Android app for learning guitar with real-time audio analysis (Kotlin, Python, FastAPI, PostgreSQL).
- A skills section grouped by real experience level, shown as floating bubbles.

## Technical decisions

- **No dependencies.** Every feature uses web platform APIs: CSS Grid and subgrid, fluid type with `clamp()`, View Transitions, scroll-driven animations, IntersectionObserver, ResizeObserver and the Clipboard API.
- **Progressive enhancement.** Navigation, content and links work without JavaScript. Scripts only add behavior (mobile menu, copy email, header visibility, floating bubbles).
- **Accessibility.** Semantic landmarks and headings, visible focus, skip link, 44px touch targets for navigation and actions, WCAG AA contrast, `prefers-reduced-motion` respected everywhere, and a pause control for continuous motion (WCAG 2.2.2).
- **Performance.** Self-hosted, Latin-subset variable fonts with metric-matched fallbacks, animations limited to `transform`, `opacity` and `clip-path`, and motion loops that only run on screen.
- **SEO.** Canonical URLs, Open Graph, structured data (JSON-LD), `sitemap.xml` and `robots.txt`.

## Structure

```
├── index.html               Home
├── projects/fretmaid/       Fretmaid case study
├── 404.html                 Not found page (served by GitHub Pages)
├── css/styles.css           Design tokens, layout and components
├── js/main.js               Entry point (ES modules)
├── js/modules/              One module per behavior
└── assets/                  Fonts (with OFL licenses) and images
```

## Run locally

ES modules don't load from `file://`, so serve the folder:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Credits

- [Archivo](https://github.com/Omnibus-Type/Archivo) and [Martian Mono](https://github.com/evilmartians/mono), both under the SIL Open Font License 1.1.
