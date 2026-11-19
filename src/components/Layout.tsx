import { useLayoutEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { DataToggle } from './DataToggle';
import { Footer } from './Footer';
import { Header } from './Header';
import { useLanguage } from '../content/useLanguage';

/** Page shell shared by every route: skip link, header, main, footer */
export function Layout() {
    const { language, t } = useLanguage();
    useLayoutEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    useLayoutEffect(() => {
        document.documentElement.classList.add('js');
        return () => document.documentElement.classList.remove('js');
    }, []);

    return (
        <>
            {/* data-outside-menu: made inert while the mobile menu is open */}
            <a className="skip-link" href="#main" data-outside-menu>
                {t('Skip to content')}
            </a>

            <Header />

            <main id="main" tabIndex={-1} data-outside-menu>
                <Outlet />
            </main>

            <Footer />

            <ScrollRestoration />

            {import.meta.env.DEV && <DataToggle />}
        </>
    );
}
