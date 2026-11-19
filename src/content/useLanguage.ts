import { useSyncExternalStore } from 'react';
import { useLocation } from 'react-router';
import { languageOf, localizedPath } from './language';

const spanish = {
    'Primary': 'Navegación principal',
    'Skip to content': 'Ir al contenido',
    'Emilio Carpio, home': 'Emilio Carpio, inicio',
    'Menu': 'Menú',
    'Work': 'Proyectos',
    'About': 'Sobre mí',
    'Skills': 'Habilidades',
    'Contact': 'Contacto',
    'See': 'Ver',
    'Selected work': 'Proyectos destacados',
    'Read the case study': 'Leer el caso de estudio',
    'about': 'sobre',
    'Stack': 'Tecnologías',
    'Step on a pedal to explore the stack.': 'Pisa un pedal para explorar las tecnologías.',
    'Choose a skill group': 'Elige un área',
    'Copy email': 'Copiar correo',
    'Copied': 'Copiado',
    'Email address copied.': 'Correo copiado.',
    "Couldn't copy. Select the address instead.": 'No se pudo copiar. Selecciona la dirección para copiarla.',
    'Overview': 'Resumen',
    'My role': 'Mi papel',
    'Architecture': 'Arquitectura',
    'Audio pipeline': 'Procesamiento de audio',
    'Features': 'Funciones',
    'Outcome': 'Resultado',
    'Breadcrumb': 'Ruta de navegación',
    'In this case study': 'En este caso de estudio',
    'Back to selected work': 'Volver a los proyectos',
    "This page doesn't exist": 'Esta página no existe',
    'The address may be mistyped, or the page has moved.': 'Revisa la dirección. Es posible que la página haya cambiado de lugar.',
    'Go to the home page': 'Ir al inicio',
    'See selected work': 'Ver proyectos destacados',
    'Chord lab': 'Laboratorio de acordes',
    'Guitar sound': 'Sonido de la guitarra',
    'Sound unavailable': 'Sonido no disponible',
    'Sound on': 'Sonido activado',
    'Sound off': 'Sonido apagado',
    'Choose a chord': 'Elige un acorde',
    'E minor': 'Mi menor',
    'A minor': 'La menor',
    'C major': 'Do mayor',
    'G major': 'Sol mayor',
    'String': 'Cuerda',
    'muted': 'silenciada',
    'Drag the pick across the strings or press Enter to strum': 'Arrastra la púa por las cuerdas o pulsa Intro para rasguear',
    'Strum': 'Rasguear',
    'Drag the pick or tap a string.': 'Arrastra la púa o toca una cuerda.',
    'Fretmaid uses these twelve pitch classes to recognize chords.': 'Fretmaid usa estas doce clases de altura para reconocer acordes.',
    'Demo data': 'Datos reales',
    'Worst case': 'Caso extremo',
    'One of each': 'Uno de cada',
    'Test data (development only)': 'Datos de prueba (solo en desarrollo)',
} as const;

const subscribe = () => () => {};

export function useLanguage() {
    const { pathname } = useLocation();
    const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
    // GitHub Pages can serve the English 404 HTML for an unknown Spanish URL.
    // Hydrate in the document's language before switching to the route language.
    const language = !hydrated && typeof document !== 'undefined'
        ? (document.documentElement.lang === 'es' ? 'es' : 'en')
        : languageOf(pathname);
    const t = (text: keyof typeof spanish) => language === 'es' ? spanish[text] : text;
    const href = (path: string) => localizedPath(path, language);
    return { language, t, href, hydrated };
}
