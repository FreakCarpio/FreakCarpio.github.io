// Shared by the prerender and client-side navigation.

const ORIGIN = 'https://freakcarpio.github.io';

export interface PageMeta {
    /** Route rendered for this page */
    path: string;
    /** Output file inside dist/ */
    file: string;
    title: string;
    description: string;
    ogType: 'website' | 'article';
    /** Absolute canonical URL; omitted for the error page */
    canonical?: string;
    noindex?: boolean;
}

export const homeMeta: PageMeta = {
    path: '/',
    file: 'index.html',
    title: 'Emilio Carpio — Frontend Developer',
    description:
        'Emilio Carpio, frontend developer (React, TypeScript) based in Mexico. Featured work: Fretmaid, an Android app for learning guitar with real-time audio analysis.',
    ogType: 'website',
    canonical: `${ORIGIN}/`,
};

export const fretmaidMeta: PageMeta = {
    path: '/projects/fretmaid/',
    file: 'projects/fretmaid/index.html',
    title: 'Fretmaid case study | Emilio Carpio',
    description:
        'Fretmaid case study: an Android app for learning guitar with real-time pitch detection and chord recognition, built with Kotlin, FastAPI and Python.',
    ogType: 'article',
    canonical: `${ORIGIN}/projects/fretmaid/`,
};

// GitHub Pages serves 404.html for every unknown address
export const notFoundMeta: PageMeta = {
    path: '/404',
    file: '404.html',
    title: 'Page not found | Emilio Carpio',
    description: "This page doesn't exist.",
    ogType: 'website',
    noindex: true,
};

const homeEs: PageMeta = {
    ...homeMeta,
    path: '/es/',
    file: 'es/index.html',
    title: 'Emilio Carpio — Desarrollador frontend',
    description: 'Portafolio de Emilio Carpio, desarrollador frontend en México. Descubre Fretmaid, su app de Android para aprender guitarra con análisis de audio en tiempo real.',
    canonical: `${ORIGIN}/es/`,
};

const fretmaidEs: PageMeta = {
    ...fretmaidMeta,
    path: '/es/projects/fretmaid/',
    file: 'es/projects/fretmaid/index.html',
    title: 'Caso de estudio de Fretmaid | Emilio Carpio',
    description: 'Cómo desarrollé la app de Android y el backend de Fretmaid para detectar notas y reconocer acordes en tiempo real con Kotlin, FastAPI y Python.',
    canonical: `${ORIGIN}/es/projects/fretmaid/`,
};

const notFoundEs: PageMeta = {
    ...notFoundMeta,
    path: '/es/404',
    file: 'es/404.html',
    title: 'Página no encontrada | Emilio Carpio',
    description: 'Esta página no existe.',
};

export const metadata = {
    en: { home: homeMeta, fretmaid: fretmaidMeta, notFound: notFoundMeta },
    es: { home: homeEs, fretmaid: fretmaidEs, notFound: notFoundEs },
};
export const pages = [...Object.values(metadata.en), ...Object.values(metadata.es)];

export const OG_IMAGE = `${ORIGIN}/assets/images/og/og-default.png`;

// Structured data: tells search engines these profiles belong to one person
export const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emilio Alejandro Carpio Guzmán',
    alternateName: 'Emilio Carpio',
    jobTitle: 'Frontend Developer',
    url: `${ORIGIN}/`,
    sameAs: [
        'https://github.com/FreakCarpio',
        'https://www.linkedin.com/in/emilio-alejandro-carpio-guzm%C3%A1n/',
    ],
};
