import { useLanguage } from '../content/useLanguage';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { useContent } from '../content/useContent';
import { Icon } from './Icon';

// Slightly after the entrance ends (760ms, see .hero in sections.css)
const ENTRANCE_DONE_MS = 900;

export function Hero() {
    const { t, href } = useLanguage();
    const { person, project } = useContent();

    // The entrance plays once per session. After it finishes, mark it as
    // seen so coming back to the home page shows the hero already printed.
    // (index.html restores this flag before first paint on later loads.)
    useEffect(() => {
        const timer = window.setTimeout(() => {
            document.documentElement.dataset.heroSeen = '';

            try {
                sessionStorage.setItem('hero-seen', '1');
            } catch {
                /* storage blocked: the entrance simply replays next time */
            }
        }, ENTRANCE_DONE_MS);

        return () => window.clearTimeout(timer);
    }, []);

    return (
        <section className="hero" id="hero">
            {/* Two-ink print: CSS draws the red plate behind each line from
                data-text (generated content), so the name exists once in the
                document. The role is part of the <h1> on purpose: together
                they say who this page is about. */}
            <h1 className="hero-title">
                <span className="hero-name">
                    {person.nameLines.map((line) => (
                        <span className="hero-name-line print" data-text={line} key={line}>
                            {line}{' '}
                        </span>
                    ))}
                </span>
                <span className="hero-role">{person.role}</span>{' '}
                <span className="hero-role-detail">{person.roleDetail}</span>
            </h1>

            <div className="hero-side">
                {/* PENDIENTE slot: rendered only when a tagline exists */}
                {person.tagline && <p className="hero-tagline">{person.tagline}</p>}

                <ul className="hero-status" role="list">
                    <li className="hero-status-open">{person.status}</li>
                    {person.facts.map((fact) => (
                        <li key={fact}>{fact}</li>
                    ))}
                </ul>

                <div className="hero-actions">
                    <Link to={href('/#projects')} className="btn btn-primary">
                        {t('See')} {project.title}
                        <Icon name="arrowRight" />
                    </Link>
                    <Link to={href('/#contact')} className="cta-link">
                        {t('Contact')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
