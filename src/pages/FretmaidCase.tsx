import { useLanguage } from '../content/useLanguage';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { DeviceStage } from '../components/DeviceStage';
import { FactList } from '../components/FactList';
import { Icon } from '../components/Icon';
import { Metrics } from '../components/Metrics';
import { useContent } from '../content/useContent';
import { useActiveSection } from '../hooks/useActiveSection';
import { PageMetadata } from '../components/PageMetadata';
import { fitTitleStyle } from '../lib/fitTitle';

const sectionTitles = {
    overview: 'Overview',
    'my-role': 'My role',
    architecture: 'Architecture',
    'audio-pipeline': 'Audio pipeline',
    features: 'Features',
    outcome: 'Outcome',
} as const;

const sectionIds = Object.keys(sectionTitles) as (keyof typeof sectionTitles)[];

function CaseIndex() {
    const { t } = useLanguage();
    const active = useActiveSection(sectionIds, true);

    return (
        <nav className="case-index" aria-labelledby="case-index-label">
            <h2 id="case-index-label">{t('In this case study')}</h2>
            <ul role="list">
                {sectionIds.map((id) => (
                    <li key={id}>
                        <Link to={`#${id}`} aria-current={active === id ? 'location' : undefined}>
                            {t(sectionTitles[id])}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function Section({ id, children }: { id: keyof typeof sectionTitles; children: ReactNode }) {
    const { t } = useLanguage();
    return (
        <section className="section" id={id} aria-labelledby={`${id}-heading`}>
            <h2 className="section-label" id={`${id}-heading`}>
                {t(sectionTitles[id])}
            </h2>
            <div className="section-content">{children}</div>
        </section>
    );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
    return (
        <div className="prose">
            {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
    );
}

export function FretmaidCase() {
    const { t, href } = useLanguage();
    const { project } = useContent();

    const facts = [...project.facts, { label: t('Stack'), values: [project.stack.join(', ')] }];

    return (
        <article className="case-study">
            <PageMetadata name="fretmaid" />
            {/* Reading progress, driven by scroll position in CSS (no script) */}
            <div className="read-progress" aria-hidden="true" />

            <header className="case-intro">
                <nav className="breadcrumb" aria-label={t('Breadcrumb')}>
                    <ol role="list">
                        <li>
                            <Link to={href('/#projects')} viewTransition>
                                {t('Work')}
                            </Link>
                        </li>
                        <li aria-current="page">{project.title}</li>
                    </ol>
                </nav>

                {/* Shares its view-transition-name with the card on the home
                    page, so the title travels between the two pages */}
                <h1
                    className="case-title print fit-title"
                    data-text={project.title}
                    style={fitTitleStyle(project.title, {
                        viewTransitionName: `project-${project.slug}`,
                    })}
                >
                    {project.title}
                </h1>

                <p className="case-summary">{project.summary}</p>

                <FactList facts={facts} variant="technical" className="case-facts" />

                {/* PENDIENTE slots: both render nothing until real content exists */}
                <Metrics metrics={project.metrics} />
                <DeviceStage
                    shots={project.shots}
                    video={project.video}
                    projectTitle={project.title}
                />
            </header>

            <div className="case-body">
                <CaseIndex />
                <div>
                    <Section id="overview">
                        <Prose paragraphs={project.overview} />
                    </Section>

                    <Section id="my-role">
                        <Prose paragraphs={project.role} />
                    </Section>

                    <Section id="architecture">
                        <Prose paragraphs={[project.architectureIntro]} />

                        {/* The red signal travels down the chain as you scroll */}
                        <ol className="signal-chain">
                            {project.chain.map((item) => (
                                <li key={item.stage}>
                                    <span className="signal-chain-stage">{item.stage}</span>
                                    {item.detail && (
                                        <span className="signal-chain-detail">{item.detail}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </Section>

                    <Section id="audio-pipeline">
                        <Prose paragraphs={project.pipeline} />
                    </Section>

                    <Section id="features">
                        <ul className="feature-grid" role="list">
                            {project.features.map((feature) => (
                                <li className="feature-card panel" key={feature.title}>
                                    {feature.shot && (
                                        <img
                                            className="feature-shot"
                                            src={feature.shot.src}
                                            alt={feature.shot.alt}
                                            width={feature.shot.width}
                                            height={feature.shot.height}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    )}
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section id="outcome">
                        <Prose paragraphs={project.outcome} />

                        <p className="case-actions">
                            <Link to={href('/#projects')} className="btn btn-primary" viewTransition>
                                {t('Back to selected work')}
                            </Link>
                            <Link to={href('/#contact')} className="cta-link" viewTransition>
                                {t('Contact')}
                                <Icon name="arrowRight" />
                            </Link>
                        </p>
                    </Section>
                </div>
            </div>
        </article>
    );
}
