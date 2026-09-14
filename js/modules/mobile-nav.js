// Collapsible navigation for narrow screens (disclosure pattern).
//
// Progressive enhancement: without JS the links stay visible and the
// toggle stays [hidden]. This module reveals the toggle and marks the
// navbar as ready; CSS collapses the list only after that.
//
// The button label stays "Menu": its state is exposed through
// aria-expanded, as the WAI-ARIA disclosure pattern recommends.

const MOBILE_QUERY = '(width < 600px)';

export function initMobileNav() {
    const navbar = document.querySelector('[data-js="navbar"]');
    const toggle = document.querySelector('[data-js="menu-toggle"]');
    const menu = document.querySelector('[data-js="menu"]');

    if (!navbar || !toggle || !menu) return;

    const mobile = window.matchMedia(MOBILE_QUERY);

    // Everything outside the header (skip link, main, footer) becomes
    // inert while the panel is open: no focus, no clicks, hidden from
    // assistive tech. Simpler and more robust than a manual focus trap.
    const outside = document.querySelectorAll('body > :not(.site-header)');

    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
        outside.forEach((element) => {
            element.inert = open;
        });
    }

    function close({ returnFocus = false } = {}) {
        if (!isOpen()) return;

        setOpen(false);

        if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => {
        const open = !isOpen();

        setOpen(open);

        if (open) menu.querySelector('a')?.focus();
    });

    // Following a link (in-page anchor or another page) closes the panel
    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) close();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') close({ returnFocus: true });
    });

    // Rotating or resizing past the breakpoint resets the state
    mobile.addEventListener('change', () => close());

    toggle.hidden = false;
    navbar.dataset.navReady = '';
}
