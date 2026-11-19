import { useEffect, useState } from 'react';

// A 1%-tall band at 45% of the viewport height: at most one section can
// intersect it at a time, and nothing runs on every scroll event.
const OBSERVER_OPTIONS: IntersectionObserverInit = { rootMargin: '-45% 0px -54% 0px' };

/** The id of the section currently crossing the middle of the screen */
export function useActiveSection(ids: readonly string[], enabled: boolean): string | null {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled || !('IntersectionObserver' in window)) {
            setActive(null);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                const id = entry.target.id;

                if (entry.isIntersecting) {
                    setActive(id);
                } else {
                    // Only clear if this section was the active one
                    setActive((current) => (current === id ? null : current));
                }
            }
        }, OBSERVER_OPTIONS);

        for (const id of ids) {
            const section = document.getElementById(id);

            if (section) observer.observe(section);
        }

        return () => observer.disconnect();
    }, [ids, enabled]);

    return active;
}
