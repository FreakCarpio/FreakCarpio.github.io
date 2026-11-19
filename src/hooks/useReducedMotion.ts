import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
    const media = window.matchMedia(QUERY);

    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
}

/**
 * True when the visitor asked the system for less motion.
 * CSS handles most of it with media queries; this is for motion driven
 * from JavaScript (string plucks, smooth scrolling, the hiding header).
 */
export function useReducedMotion(): boolean {
    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(QUERY).matches,
        // On the server there is no preference to read
        () => false,
    );
}

/** Same check for code that runs outside React's render (event handlers) */
export function prefersReducedMotion(): boolean {
    return window.matchMedia(QUERY).matches;
}
