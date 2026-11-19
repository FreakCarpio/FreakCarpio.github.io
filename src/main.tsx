import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { routes } from './routes';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';

const container = document.getElementById('root')!;
const router = createBrowserRouter(routes);

const app = (
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

// Production pages arrive prerendered: React attaches to the existing HTML
// (hydration). The dev server sends an empty root, so it renders from scratch.
if (container.childElementCount > 0) {
    hydrateRoot(container, app);
} else {
    createRoot(container).render(app);
}
