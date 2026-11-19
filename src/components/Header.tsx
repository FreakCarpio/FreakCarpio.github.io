import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useMatches } from 'react-router';
import { useActiveSection } from '../hooks/useActiveSection';
import { useHeaderScroll } from '../hooks/useHeaderScroll';
import { localizedPath } from '../content/language';
import { useLanguage } from '../content/useLanguage';

// Same order as the sections on the home page
const NAV = [
    { id: 'projects', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
] as const;

const SECTION_IDS = NAV.map((item) => item.id);

const DESKTOP_QUERY = '(width >= 600px)';

interface Indicator {
    x: number;
    width: number;
}

export function Header() {
    const { pathname, search, hash, key } = useLocation();
    const { language, t, href, hydrated } = useLanguage();
    const notFound = useMatches().some(match => match.id === 'not-found');
    const alternate = language === 'en' ? 'es' : 'en';
    const basePath = localizedPath(pathname, 'en');
    const onHome = basePath === '/' || basePath === '/index.html';
    const alternatePath = localizedPath(notFound ? '/404.html' : basePath.replace(/\/index\.html$/, '/'), alternate);

    const headerRef = useRef<HTMLElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const [open, setOpen] = useState(false);
    const { hidden, scrolled } = useHeaderScroll(headerRef, open);
    const active = useActiveSection(SECTION_IDS, onHome);

    // ---------- Mobile menu (disclosure pattern) ----------

    // Following any link closes the panel
    useEffect(() => setOpen(false), [key]);

    useEffect(() => {
        // Everything outside the header becomes inert while the panel is
        // open: no focus, no clicks, hidden from assistive tech. Simpler and
        // more robust than a manual focus trap.
        const outside = document.querySelectorAll<HTMLElement>('[data-outside-menu]');

        outside.forEach((element) => {
            element.inert = open;
        });

        if (!open) return;

        menuRef.current?.querySelector('a')?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;

            setOpen(false);
            toggleRef.current?.focus();
        };

        // Rotating or resizing past the breakpoint resets the state
        const desktop = window.matchMedia(DESKTOP_QUERY);
        const onBreakpoint = () => setOpen(false);

        document.addEventListener('keydown', onKeyDown);
        desktop.addEventListener('change', onBreakpoint);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            desktop.removeEventListener('change', onBreakpoint);
        };
    }, [open]);

    // ---------- Sliding underline for the current section ----------

    // One underline that moves between links instead of four that blink.
    // It is positioned with transform only (no layout work while it slides).
    const [indicator, setIndicator] = useState<Indicator | null>(null);
    const [indicatorAnimated, setIndicatorAnimated] = useState(false);

    useLayoutEffect(() => {
        const menu = menuRef.current;

        if (!menu) return;

        const measure = () => {
            const link = menu.querySelector<HTMLElement>('a[aria-current]');

            setIndicator(link ? { x: link.offsetLeft, width: link.offsetWidth } : null);
        };

        measure();

        // Font loading and window resizes move the links
        const observer = new ResizeObserver(measure);

        observer.observe(menu);

        return () => observer.disconnect();
    }, [active, language]);

    // The first placement is instant; only later moves slide
    useEffect(() => {
        if (!indicator) {
            setIndicatorAnimated(false);
            return;
        }

        const frame = requestAnimationFrame(() => setIndicatorAnimated(true));

        return () => cancelAnimationFrame(frame);
    }, [indicator]);

    return (
        <header
            className="site-header"
            ref={headerRef}
            data-header-hidden={hidden ? '' : undefined}
            data-scrolled={scrolled ? '' : undefined}
        >
            <nav className="navbar" aria-label={t('Primary')}>
                <Link
                    to={href('/')}
                    className="logo"
                    viewTransition={!onHome}
                    onClick={() => {
                        if (onHome) window.scrollTo(0, 0);
                    }}
                >
                    <img src="/apple-touch-icon.png?v=c76a14f9" width="40" height="40" alt={t('Emilio Carpio, home')} />
                </Link>

                {/* The label stays "Menu": its state is exposed through
                    aria-expanded, as the WAI-ARIA disclosure pattern recommends */}
                <button
                    type="button"
                    className="menu-toggle"
                    ref={toggleRef}
                    aria-expanded={open}
                    aria-controls="site-menu"
                    onClick={() => setOpen((value) => !value)}
                >
                    {t('Menu')}
                    <span className="menu-icon" aria-hidden="true" />
                </button>

                <ul className="nav-links" id="site-menu" ref={menuRef}>
                    {NAV.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={href(`/#${item.id}`)}
                                // Cross-fade only when the page actually changes
                                viewTransition={!onHome}
                                aria-current={active === item.id ? 'true' : undefined}
                                onClick={() => setOpen(false)}
                            >
                                {t(item.label)}
                            </Link>
                        </li>
                    ))}

                    <li
                        className="nav-indicator"
                        role="presentation"
                        data-visible={indicator ? '' : undefined}
                        data-animated={indicatorAnimated ? '' : undefined}
                        style={
                            indicator
                                ? {
                                      transform: `translateX(${indicator.x}px) scaleX(${indicator.width})`,
                                  }
                                : undefined
                        }
                    />
                </ul>
                <Link
                    className="language-switch"
                    to={{ pathname: alternatePath, search: hydrated ? search : '', hash: hydrated ? hash : '' }}
                    lang={alternate}
                    hrefLang={alternate}
                    aria-label={alternate === 'es' ? 'Cambiar a español' : 'Switch to English'}
                    preventScrollReset
                    onClick={() => setOpen(false)}
                >
                    <span>{alternate.toUpperCase()}</span>
                </Link>
            </nav>
        </header>
    );
}
