import { useLanguage } from '../content/useLanguage';
import { useRef, type CSSProperties } from 'react';
import { useContent } from '../content/useContent';
import { useInView } from '../hooks/useInView';
import { FactList } from './FactList';

export function About() {
    const { t } = useLanguage();
    const { about } = useContent();
    const pullRef = useRef<HTMLParagraphElement>(null);
    const pullInView = useInView(pullRef, { threshold: 0.4 });

    return (
        <section className="about" id="about" aria-labelledby="about-heading">
            <h2 className="poster-title edge-title" id="about-heading">
                {t('About')}
            </h2>

            <div className="about-body">
                {/* Each line rises from behind its own mask, once. Only this
                    display line moves; the paragraph below never animates. */}
                <p
                    className="about-pull"
                    ref={pullRef}
                    data-inview={pullInView ? '' : undefined}
                >
                    {about.pullLines.map((line, index) => (
                        <span className="pull-line" key={line}>
                            <span style={{ '--line': index } as CSSProperties}>{line} </span>
                        </span>
                    ))}
                </p>

                <p className="about-text">{about.text}</p>

                <FactList facts={about.facts} className="about-facts" />

                {/* PENDIENTE slot: optional portrait */}
                {about.photo && (
                    <img
                        className="about-photo"
                        src={about.photo.src}
                        alt={about.photo.alt}
                        width={about.photo.width}
                        height={about.photo.height}
                        loading="lazy"
                        decoding="async"
                    />
                )}
            </div>
        </section>
    );
}
