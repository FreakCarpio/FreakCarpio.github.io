import { useLanguage } from '../content/useLanguage';
import { Link } from 'react-router';
import { PageMetadata } from '../components/PageMetadata';

/** An error page gives direction: what happened and where to go next */
export function NotFound() {
    const { t, href } = useLanguage();
    return (
        <div className="error-page">
            <PageMetadata name="notFound" />
            {/* A deliberate misprint: the red plate sits far off register.
                Decorative, so it is hidden from assistive tech. */}
            <p className="error-code print" data-text="404" aria-hidden="true">
                404
            </p>

            <h1 className="error-title">{t("This page doesn't exist")}</h1>

            <p className="error-text">{t('The address may be mistyped, or the page has moved.')}</p>

            <p className="error-links">
                <Link to={href('/')} className="btn btn-primary" viewTransition>
                    {t('Go to the home page')}
                </Link>
                <Link to={href('/#projects')} className="cta-link" viewTransition>
                    {t('See selected work')}
                </Link>
            </p>
        </div>
    );
}
