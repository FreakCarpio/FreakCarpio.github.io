import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pages, notFoundMeta } from './src/content/meta.ts';

// User site on GitHub Pages (freakcarpio.github.io), so the base is "/".
export default defineConfig(({ isPreview }) => ({
    appType: isPreview ? 'custom' : 'spa',
    plugins: [
        react(),
        {
            name: 'preview-github-pages',
            configurePreviewServer(server) {
                // Vite serves physical files first. Directory URLs and missing
                // pages should receive the same HTML as on GitHub Pages.
                const dist = resolve(server.config.root, server.config.build.outDir);
                return () => server.middlewares.use(async (req, res, next) => {
                    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
                    const path = req.url?.split('?')[0].replace(/\/$/, '');
                    const page = pages.find((item) => item.path.replace(/\/$/, '') === path);
                    try {
                        const html = await readFile(resolve(dist, (page ?? notFoundMeta).file));
                        res.writeHead(page && !page.noindex ? 200 : 404, {
                            'Content-Type': 'text/html; charset=utf-8',
                        });
                        res.end(html);
                    } catch (error) {
                        next(error);
                    }
                });
            },
        },
    ],
    build: {
        // One stylesheet for the whole site: it is small and every page needs it
        cssCodeSplit: false,
    },
}));
