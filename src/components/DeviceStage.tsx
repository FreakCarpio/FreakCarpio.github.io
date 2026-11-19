import { useLanguage } from '../content/useLanguage';
import { useRef, useState } from 'react';
import type { Shot, Video } from '../content/types';
import { prefersReducedMotion } from '../hooks/useReducedMotion';

interface Props {
    shots: Shot[];
    video: Video | null;
    projectTitle: string;
}

/**
 * Phone frame with the project's screenshots.
 *
 * The gallery is a native scroll container with scroll snapping: the browser
 * handles swipe physics, keyboard scrolling and momentum. There is no
 * auto-advance and the video never autoplays.
 */
export function DeviceStage({ shots, video, projectTitle }: Props) {
    const { language } = useLanguage();
    const trackRef = useRef<HTMLUListElement>(null);
    const [current, setCurrent] = useState(0);

    if (shots.length === 0 && !video) return null;

    const onScroll = () => {
        const track = trackRef.current;

        if (!track) return;

        setCurrent(Math.round(track.scrollLeft / track.clientWidth));
    };

    const goTo = (index: number) => {
        trackRef.current?.children[index]?.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'nearest',
            inline: 'start',
        });
    };

    return (
        <div className="device-stage">
            {shots.length > 0 && (
                <figure className="device">
                    <ul
                        className="device-track"
                        ref={trackRef}
                        onScroll={onScroll}
                        // Focusable so keyboard users can scroll it with the arrow keys
                        tabIndex={0}
                        role="group"
                        aria-label={language === 'es' ? `Capturas de ${projectTitle}` : `${projectTitle} screenshots`}
                    >
                        {shots.map((shot, index) => (
                            <li key={shot.src}>
                                <img
                                    src={shot.src}
                                    alt={shot.alt}
                                    width={shot.width}
                                    height={shot.height}
                                    // The first image may be on screen early; the rest wait
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    decoding="async"
                                />
                            </li>
                        ))}
                    </ul>
                </figure>
            )}

            {shots.length > 1 && (
                <ul className="device-dots" role="list">
                    {shots.map((shot, index) => (
                        <li key={shot.src}>
                            <button
                                type="button"
                                className="device-dot"
                                aria-label={language === 'es' ? `Ver captura ${index + 1} de ${shots.length}` : `Show screenshot ${index + 1} of ${shots.length}`}
                                aria-current={index === current ? 'true' : undefined}
                                onClick={() => goTo(index)}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {video && (
                <video
                    className="device-video"
                    controls
                    preload="none"
                    playsInline
                    poster={video.poster}
                    aria-label={video.description}
                >
                    <source src={video.src} />
                </video>
            )}
        </div>
    );
}
