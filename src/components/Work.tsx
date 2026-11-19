import { useLanguage } from '../content/useLanguage';
import { Link } from 'react-router';
import { useContent } from '../content/useContent';
import { fitTitleStyle } from '../lib/fitTitle';
import { DeviceStage } from './DeviceStage';
import { FactList } from './FactList';
import { Icon } from './Icon';
import { Metrics } from './Metrics';
import { SixStrings } from './SixStrings';

// The card shows a short stack; the case study lists everything
const MAX_STACK_CHIPS = 6;

/** Selected work: Fretmaid as the headliner of the home page */
export function Work() {
    const { t, href } = useLanguage();
    const { project } = useContent();
    const hasMedia = project.shots.length > 0 || project.video !== null;
    const stack = project.stack.slice(0, MAX_STACK_CHIPS);

    return (
        <section className="work" id="projects" aria-labelledby="work-heading">
            <div className="work-inner">
                <h2 className="work-heading" id="work-heading">
                    {t('Selected work')}
                </h2>

                <article className="project">
                    {/* view-transition-name morphs this title into the case
                        study heading. It must be unique per page. */}
                    <h3
                        className="headliner print fit-title"
                        data-text={project.title}
                        style={fitTitleStyle(project.title, {
                            viewTransitionName: `project-${project.slug}`,
                        })}
                    >
                        {project.title}
                    </h3>

                    <div className="project-body">
                        <div className="project-summary">
                            <p className="project-description">{project.summary}</p>

                            <Link
                                to={href(`/projects/${project.slug}/`)}
                                className="btn btn-primary"
                                viewTransition
                            >
                                {t('Read the case study')}
                                <span className="visually-hidden"> {t('about')} {project.title}</span>
                                <Icon name="arrowRight" />
                            </Link>
                        </div>

                        {/* Real screenshots take the stage when they exist.
                            Until then (PENDIENTE) the interactive strings do. */}
                        <div className="project-stage">
                            {hasMedia ? (
                                <DeviceStage
                                    shots={project.shots}
                                    video={project.video}
                                    projectTitle={project.title}
                                />
                            ) : (
                                <SixStrings />
                            )}
                        </div>

                        <div className="project-data">
                            <Metrics metrics={project.metrics} />

                            <FactList facts={project.facts} variant="technical" />

                            <ul className="chips" role="list" aria-label={t('Stack')}>
                                {stack.map((item) => (
                                    <li className="chip chip-mono" key={item}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
