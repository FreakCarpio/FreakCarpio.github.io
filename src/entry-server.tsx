// Build-time entry: runs on Node, never in the browser.
// scripts/prerender.mjs calls render() once per page.

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { pages } from './content/meta';
import { languageOf } from './content/language';
import { routes } from './routes';

export { pages };

export async function render(path: string) {
    const handler = createStaticHandler(routes);
    const context = await handler.query(new Request(`https://freakcarpio.github.io${path}`));

    if (context instanceof Response) {
        throw new Error(`Route ${path} returned a response instead of a page`);
    }

    const router = createStaticRouter(handler.dataRoutes, context);

    // Render a document so React collects each route's metadata in its head.
    // Vite supplies the outer document and the fingerprinted asset URLs.
    const document = renderToString(
        <html lang={languageOf(path)}>
            <head />
            <body>
                <StrictMode>
                    <StaticRouterProvider router={router} context={context} hydrate={false} />
                </StrictMode>
            </body>
        </html>,
    );
    const parts = document.match(/<head>([\s\S]*?)<\/head><body>([\s\S]*)<\/body>/);
    if (!parts) throw new Error(`Missing head or body while rendering ${path}`);

    return { head: parts[1]!, body: parts[2]!, language: languageOf(path) };
}
