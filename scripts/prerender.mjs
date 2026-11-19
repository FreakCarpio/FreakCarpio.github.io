// Static prerender: renders every route to HTML at build time.
//
// GitHub Pages only serves files, so each route needs its own index.html.
// Steps (see "build" in package.json):
//   1. vite build                  -> dist/ (client bundle + index.html template)
//   2. vite build --ssr ...        -> dist-ssr/entry-server.js (React on Node)
//   3. this script                 -> fills the template once per route
// In the browser, src/main.tsx hydrates that HTML instead of re-creating it.

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { pages, render } = await import(
    pathToFileURL(resolve(ssrDir, 'entry-server.js')).href
);

const template = await readFile(resolve(dist, 'index.html'), 'utf8');

for (const page of pages) {
    const { head, body, language } = await render(page.path);

    const output = template
        .replace('<html lang="en">', `<html lang="${language}">`)
        .replace('<!--app-head-->', () => head)
        .replace('<!--app-html-->', () => body);

    const file = resolve(dist, page.file);

    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, output);

    console.log(`prerendered ${page.path} -> ${page.file}`);
}

await rm(ssrDir, { recursive: true, force: true });
