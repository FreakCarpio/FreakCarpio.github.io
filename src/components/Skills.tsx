import { useLanguage } from '../content/useLanguage';
import { useId, useState } from 'react';
import { Link } from 'react-router';
import type { SkillGroup } from '../content/types';
import { useContent } from '../content/useContent';
import { Icon } from './Icon';

// Screen-printed symbols on the pedals: code, layers, signal and version history.
const ART: Record<SkillGroup['symbol'], string> = {
    frontend: 'M17 8 7 18l10 10 M47 8l10 10-10 10 M37 4 27 32',
    backend: 'm6 13 26-10 26 10-26 10z M6 19l26 10 26-10 M6 25l26 10 26-10',
    spectrum: 'M4 18h5l4-8 5 18 7-26 7 31 6-24 5 16 5-12 4 5h8',
    branch: 'M6 26h50 M17 26c12 0 12-17 24-17h15 M50 4l6 5-6 5',
};

export function Skills() {
    const { t, href } = useLanguage();
    const { skills } = useContent();
    const [selection, setSelection] = useState('');
    const active = skills.find((group) => group.symbol === selection) ?? skills[0];
    const boardId = useId();

    if (!active) return null;

    return (
        <section className="skills" id="skills" aria-labelledby="skills-heading">
            <header className="skills-intro">
                <h2 className="poster-title outline-title" id="skills-heading" data-text={t('Skills')}>{t('Skills')}</h2>
                <p className="pedal-instruction">{t('Step on a pedal to explore the stack.')}</p>
            </header>

            <div className="pedalboard">
                <fieldset className="pedal-controls">
                    <legend className="visually-hidden">{t('Choose a skill group')}</legend>
                    <div className="pedal-rail">
                        {skills.map((group, index) => (
                            <label className="pedal" key={group.name}>
                                <input
                                    type="radio"
                                    className="visually-hidden"
                                    name={boardId}
                                    checked={active === group}
                                    aria-controls={`${boardId}-panel-${index}`}
                                    onChange={() => setSelection(group.symbol)}
                                />
                                <span className="pedal-face">
                                    <svg className="pedal-art" aria-hidden="true" viewBox="0 0 64 38">
                                        <path d={ART[group.symbol]} />
                                    </svg>
                                    <span className="pedal-name">{group.name}</span>
                                    <span className="pedal-hardware" aria-hidden="true">
                                        <span className="pedal-switch" />
                                        <span className="pedal-light" />
                                    </span>
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {skills.map((group, index) => (
                    <article
                        key={group.name}
                        id={`${boardId}-panel-${index}`}
                        className="skill-panel"
                        data-active={active === group ? '' : undefined}
                    >
                        <div className="skill-example">
                            <span className="skill-print-category">{group.name}</span>
                            <h3>{group.example}</h3>
                            <p>{group.description}</p>
                        </div>
                        <div className="skill-stack">
                            <ul className="chips" role="list" aria-label={`${t('Stack')} · ${group.name}`}>
                                {group.skills.map((skill) => <li className="chip chip-mono" key={skill}>{skill}</li>)}
                            </ul>
                            {group.evidence.kind === 'internal' ? (
                                <Link to={href(group.evidence.to)} className="cta-link skill-evidence" viewTransition>
                                    {group.evidence.label}<Icon name="arrowRight" />
                                </Link>
                            ) : (
                                <a href={group.evidence.href} className="cta-link skill-evidence">
                                    {group.evidence.label}<Icon name="arrowUpRight" />
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
