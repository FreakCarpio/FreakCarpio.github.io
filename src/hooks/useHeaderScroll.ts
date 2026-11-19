import { useEffect, useState, type RefObject } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

// Ignore tiny scroll jitters (trackpads, momentum)
const SCROLL_THRESHOLD_PX = 8;

interface HeaderScroll {
    /** Scrolling down: the header slides away to free the screen */
    hidden: boolean;
    /** The page is no longer at the very top */
    scrolled: boolean;
}

/**
 * Hides the sticky header while scrolling down and brings it back on scroll
 * up. It is never hidden near the top, while the menu is open, while focus
 * is inside it (WCAG 2.4.11 Focus Not Obscured) or with reduced motion.
 */
export function useHeaderScroll(
    headerRef: RefObject<HTMLElement | null>,
    menuOpen: boolean,
): HeaderScroll {
    const [state, setState] = useState<HeaderScroll>({ hidden: false, scrolled: false });

    useEffect(() => {
        const header = headerRef.current;

        if (!header) return;

        let lastY = window.scrollY;
        let ticking = false;

        const update = () => {
            ticking = false;

            const y = window.scrollY;
            const delta = y - lastY;
            const scrolled = y > 0;

            if (Math.abs(delta) < SCROLL_THRESHOLD_PX) {
                setState((current) =>
                    current.scrolled === scrolled ? current : { ...current, scrolled },
                );
                return;
            }

            const nearTop = y < header.offsetHeight;
            const focusInside = header.contains(document.activeElement);
            const mayHide = !nearTop && !menuOpen && !focusInside && !prefersReducedMotion();
            const hidden = delta > 0 ? mayHide : false;

            setState((current) =>
                current.hidden === hidden && current.scrolled === scrolled
                    ? current
                    : { hidden, scrolled },
            );

            lastY = y;
        };

        // Read the scroll position at most once per frame
        const onScroll = () => {
            if (ticking) return;

            ticking = true;
            window.requestAnimationFrame(update);
        };

        const show = () =>
            setState((current) => (current.hidden ? { ...current, hidden: false } : current));

        window.addEventListener('scroll', onScroll, { passive: true });
        header.addEventListener('focusin', show);

        return () => {
            window.removeEventListener('scroll', onScroll);
            header.removeEventListener('focusin', show);
        };
    }, [headerRef, menuOpen]);

    return state;
}
