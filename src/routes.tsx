import type { RouteObject } from 'react-router';
import { Layout } from './components/Layout';
import { FretmaidCase } from './pages/FretmaidCase';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

// One route table shared by the browser (main.tsx) and the build-time
// prerender (entry-server.tsx), so both always agree on what a URL shows.
export const routes: RouteObject[] = [
    {
        path: 'es?',
        caseSensitive: true,
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'index.html', element: <Home /> },
            { path: 'projects/fretmaid', element: <FretmaidCase /> },
            { path: 'projects/fretmaid/index.html', element: <FretmaidCase /> },
            { id: 'not-found', path: '*', element: <NotFound /> },
        ],
    },
];
