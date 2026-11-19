# Emilio Carpio · Portfolio

Emilio Carpio's frontend portfolio features Fretmaid, an Android guitar-learning app built for his engineering thesis. The case study follows the audio from microphone capture to pitch and chord recognition and describes Emilio's work on the Kotlin app and FastAPI backend. [Visit the portfolio](https://freakcarpio.github.io/)

## Run locally

Use Node.js 24 and npm. From the repository root, run

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. The development toolbar switches between real content and fixtures for checking long text and missing media.

## Preview the production site

```sh
npm run build
npm run preview
```

The build checks TypeScript, bundles the React app and generates HTML for the home page, the Fretmaid case study and the 404 page. Visitors can read the pages and follow links with JavaScript disabled. React adds the mobile menu, interactive guitar strings and clipboard control. GitHub Actions publishes the contents of `dist/` when changes reach `main` and the repository's Pages source is set to GitHub Actions.

## Edit the portfolio

- `src/content/site.ts` contains the profile, project, skills and contact details. The root URL opens in English. Its Spanish counterpart at `/es/` uses the copy in `src/content/site.es.ts` and shares project assets and links.
- `src/pages/` and `src/components/` contain the route views and shared interface. The browser and build use the route table in `src/routes.tsx`.
- `src/styles/` contains the two-ink poster palette, typography, layouts and motion rules.
- `public/assets/` holds the self-hosted fonts and images. The fonts ship with their SIL Open Font Licenses. [Archivo](https://github.com/Omnibus-Type/Archivo) · [Martian Mono](https://github.com/evilmartians/mono)
