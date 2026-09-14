// Marks the nav link of the section currently in view with aria-current.
//
// IntersectionObserver reports when sections cross a thin band around
// the middle of the viewport, so nothing runs on every scroll event.
// Only in-page links (href="#...") are tracked: on other pages the nav
// points to "../../#..." and this module does nothing.

// A 1%-tall band at 45% of the viewport height: at most one section
// can intersect it at a time
const OBSERVER_OPTIONS = { rootMargin: '-45% 0px -54% 0px' };

export function initActiveNav() {
    if (!('IntersectionObserver' in window)) return;

    const links = [...document.querySelectorAll('[data-js="menu"] a[href^="#"]')];

    const linkBySection = new Map(
        links
            .map((link) => [document.querySelector(link.hash), link])
            .filter(([section]) => section)
    );

    if (linkBySection.size === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const link = linkBySection.get(entry.target);

            if (entry.isIntersecting) {
                links.forEach((other) => other.removeAttribute('aria-current'));
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }, OBSERVER_OPTIONS);

    linkBySection.forEach((_link, section) => observer.observe(section));
}
