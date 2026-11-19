import { useEffect, useState, type RefObject } from 'react';

interface Options {
    /** Portion of the element that must be visible (0 to 1) */
    threshold?: number;
}

/**
 * Becomes true the first time the element enters the viewport and then
 * stays true: reveals play once and never replay on scroll-by.
 */
export function useInView(ref: RefObject<Element | null>, { threshold = 0.25 }: Options = {}) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        if (!('IntersectionObserver' in window)) {
            setInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref, threshold]);

    return inView;
}
