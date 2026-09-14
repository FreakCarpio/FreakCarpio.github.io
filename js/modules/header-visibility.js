// Hides the sticky header while scrolling down and brings it back on
// scroll up, so it frees the screen while reading and returns when needed.
//
// Progressive enhancement: without JS the header is simply sticky and
// always visible. CSS handles the slide (inside the reduced-motion guard);
// this module only toggles [data-header-hidden].
//
// The header is never hidden when:
// - the page is near the top,
// - the mobile menu is open,
// - focus is inside the header (keyboard users must see what's focused,
//   WCAG 2.4.11 Focus Not Obscured).

// Ignore tiny scroll jitters (trackpads, momentum)
const SCROLL_THRESHOLD_PX = 8;

export function initHeaderVisibility() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('[data-js="menu-toggle"]');

    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;

    const isMenuOpen = () => toggle?.getAttribute('aria-expanded') === 'true';

    function show() {
        header.removeAttribute('data-header-hidden');
    }

    function update() {
        ticking = false;

        const y = window.scrollY;
        const delta = y - lastY;

        if (Math.abs(delta) < SCROLL_THRESHOLD_PX) return;

        const nearTop = y < header.offsetHeight;
        const focusInside = header.contains(document.activeElement);

        if (delta > 0 && !nearTop && !isMenuOpen() && !focusInside) {
            header.setAttribute('data-header-hidden', '');
        } else if (delta < 0 || nearTop) {
            show();
        }

        lastY = y;
    }

    // Read scroll position at most once per frame instead of on every event
    window.addEventListener('scroll', () => {
        if (ticking) return;

        ticking = true;
        window.requestAnimationFrame(update);
    }, { passive: true });

    header.addEventListener('focusin', show);
}
