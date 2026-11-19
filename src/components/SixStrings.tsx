import { useLanguage } from '../content/useLanguage';
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion';
import { createGuitarSound } from '../lib/guitarSound';
import { pluck, stopPluck } from '../lib/pluck';
import { StringLine } from './StringLine';

const PITCHES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
// Tablature order, high E at the top. A negative fret mutes that string.
const OPEN_MIDI = [64, 59, 55, 50, 45, 40];
const CHORDS = [
    { label: 'Em', name: 'E minor', frets: [0, 0, 0, 2, 2, 0] },
    { label: 'Am', name: 'A minor', frets: [0, 1, 2, 2, 0, -1] },
    { label: 'C', name: 'C major', frets: [0, 1, 0, 2, 3, -1] },
    { label: 'G', name: 'G major', frets: [3, 0, 0, 0, 2, 3] },
] as const;

function noteName(midi: number) {
    return PITCHES[midi % 12] + String(Math.floor(midi / 12) - 1);
}

const frequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

export function SixStrings() {
    const { t } = useLanguage();
    const [chord, setChord] = useState<(typeof CHORDS)[number]>(CHORDS[0]);
    const [selectedString, selectString] = useState<number | null>(null);
    const [soundOn, setSoundOn] = useState(false);
    const [soundUnavailable, setSoundUnavailable] = useState(false);
    const [ready, setReady] = useState(false);
    const audio = useRef<ReturnType<typeof createGuitarSound> | null>(null);
    const paths = useRef<(SVGPathElement | null)[]>([]);
    const pending = useRef(new Set<number>());
    const pick = useRef<HTMLSpanElement>(null);
    const gesture = useRef<{ id: number; top: number; height: number; last: number } | null>(null);

    const notes = chord.frets.map((fret, i) => fret < 0 ? null : OPEN_MIDI[i] + fret);
    const solo = selectedString === null ? null : notes[selectedString];
    const sounding = solo === null ? notes : [solo];
    const chordTones = [...new Set(notes.slice().reverse().flatMap(n => n === null ? [] : [PITCHES[n % 12]]))];

    useEffect(() => {
        setReady(true);
        const timers = pending.current;
        const strings = paths.current;
        return () => {
            timers.forEach(clearTimeout);
            strings.forEach(path => path && stopPluck(path));
            if (audio.current) void audio.current.context.close();
            audio.current = null;
        };
    }, []);

    function stopStrum() {
        pending.current.forEach(clearTimeout);
        pending.current.clear();
        pick.current?.getAnimations().forEach(animation => animation.cancel());
        for (const path of paths.current) {
            if (path) {
                stopPluck(path);
                path.removeAttribute('data-ringing');
            }
        }
    }

    function later(callback: () => void, delay: number) {
        const timer = window.setTimeout(() => {
            pending.current.delete(timer);
            callback();
        }, delay);
        pending.current.add(timer);
    }

    async function toggleSound() {
        if (audio.current) {
            const { context } = audio.current;
            audio.current = null;
            setSoundOn(false);
            await context.close();
            return;
        }
        let guitar: ReturnType<typeof createGuitarSound> | undefined;
        try {
            guitar = createGuitarSound();
            audio.current = guitar;
            await guitar.context.resume();
            if (audio.current === guitar) setSoundOn(true);
        } catch {
            if (guitar && audio.current !== guitar) return;
            if (guitar && guitar.context.state !== 'closed') void guitar.context.close();
            audio.current = null;
            setSoundOn(false);
            setSoundUnavailable(true);
        }
    }

    function ring(i: number) {
        const midi = notes[i];
        const path = paths.current[i];
        if (midi === null || !path) return;
        if (soundOn) audio.current?.play(frequency(midi));
        path.setAttribute('data-ringing', '');
        if (prefersReducedMotion()) {
            later(() => path.removeAttribute('data-ringing'), 220);
            return;
        }
        pluck(path, {
            amplitude: 8 + i * 0.8, cycles: 6 - i * 0.4,
            onDone: () => path.removeAttribute('data-ringing'),
        });
    }

    function strum() {
        stopStrum();
        selectString(null);
        let delay = 0;
        for (let i = notes.length - 1; i >= 0; i--) {
            if (notes[i] === null) continue;
            later(() => ring(i), delay);
            delay += 36;
        }
        const handle = pick.current;
        if (handle && !prefersReducedMotion()) {
            const transforms = ['translateY(41.67%)', 'translateY(-41.67%)'];
            handle.animate(transforms.map(transform => ({ transform })), { duration: delay, easing: 'linear' });
            handle.style.transform = transforms[1];
        }
    }

    function movePick(event: PointerEvent<HTMLButtonElement>) {
        const drag = gesture.current;
        if (!drag || drag.id !== event.pointerId) return;
        const position = Math.max(0, Math.min(1, (event.clientY - drag.top) / drag.height));
        const index = Math.min(5, Math.floor(position * 6));
        if (pick.current) {
            const offset = Math.max(-41.67, Math.min(41.67, (position - 0.5) * 100));
            pick.current.style.transform = `translateY(${offset}%)`;
        }
        if (index === drag.last) return;
        const direction = index > drag.last ? 1 : -1;
        // A fast swipe can cross several strings between two pointer events.
        const first = drag.last < 0 ? index : drag.last + direction;
        for (let i = first; i !== index + direction; i += direction) {
            if (notes[i] !== null) {
                selectString(i);
                ring(i);
            }
        }
        drag.last = index;
    }

    return (
        <section className="six-strings" id="chord-lab" aria-labelledby="chord-lab-heading">
            <header className="lab-header">
                <h4 id="chord-lab-heading">{t('Chord lab')}</h4>
                <button className="sound-toggle" type="button" aria-label={t('Guitar sound')}
                    aria-pressed={soundOn} disabled={soundUnavailable} onClick={toggleSound}>
                    <span className="sound-led" aria-hidden="true" />
                    {t(soundUnavailable ? 'Sound unavailable' : soundOn ? 'Sound on' : 'Sound off')}
                </button>
            </header>
            <div className="lab-controls" role="group" aria-label={t('Choose a chord')}>
                {CHORDS.map(option => (
                    <button key={option.label} type="button" aria-pressed={option === chord}
                        aria-label={t(option.name)} onClick={() => {
                            stopStrum();
                            setChord(option);
                            selectString(null);
                        }}>
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="fretboard">
                <div className="fret-labels" aria-hidden="true"><span>I</span><span>II</span><span>III</span></div>
                <div className="string-bank">
                    {notes.map((note, i) => {
                        const fret = chord.frets[i];
                        return (
                            <button key={OPEN_MIDI[i]} type="button" className="string-button"
                                disabled={!ready || note === null} data-muted={note === null ? '' : undefined}
                                aria-pressed={selectedString === i}
                                aria-label={`${t('String')} ${i + 1}, ${note === null ? t('muted') : noteName(note)}`}
                                onClick={() => {
                                    stopStrum();
                                    selectString(i);
                                    ring(i);
                                }}>
                                <span className="string-note">{noteName(OPEN_MIDI[i])}</span>
                                <span className="string-lane" aria-hidden="true"
                                    style={{ '--string-thickness': (1 + i * 0.4) + 'px' } as CSSProperties}>
                                    <StringLine pathRef={path => { paths.current[i] = path; }} />
                                    <span className="fret-marker" data-open={fret === 0 ? '' : undefined}
                                        data-muted={fret < 0 ? '' : undefined}
                                        style={{ left: fret > 0 ? `${(fret - 0.5) / 3 * 100}%` : '0%' }}>
                                        {fret < 0 ? '×' : ''}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
                <button type="button" className="pick-track" aria-label={t('Drag the pick across the strings or press Enter to strum')}
                    onPointerDown={event => {
                        if (!event.isPrimary || event.button !== 0 || gesture.current) return;
                        stopStrum();
                        const { top, height } = event.currentTarget.getBoundingClientRect();
                        event.currentTarget.setPointerCapture(event.pointerId);
                        gesture.current = { id: event.pointerId, top, height, last: -1 };
                        movePick(event);
                    }}
                    onPointerMove={movePick}
                    onPointerUp={movePick}
                    onTouchEnd={event => event.preventDefault()}
                    onLostPointerCapture={event => {
                        if (gesture.current?.id === event.pointerId) gesture.current = null;
                    }}
                    onClick={event => { if (event.detail === 0) strum(); }}>
                    <span className="pick-position" ref={pick}>
                        <svg aria-hidden="true" viewBox="0 0 30 36" width="30" height="36">
                            <path fill="currentColor" d="M1 10C1-1 29-1 29 10c0 7-8 18-14 25C9 28 1 17 1 10Z" />
                            <path d="m9 11 7-4m-5 9 10-6" fill="none" stroke="var(--color-on-signal)" strokeWidth="2" />
                        </svg>
                    </span>
                </button>
            </div>

            <div className="lab-output">
                <div className="lab-readout" role="status" aria-atomic="true">
                    <strong>{solo === null ? t(chord.name) : noteName(solo)}</strong>
                    <span>{solo === null ? chordTones.join(' · ') : frequency(solo).toFixed(2) + ' Hz'}</span>
                </div>
                <button className="strum-button" type="button" onClick={strum}>
                    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
                        <path fill="currentColor" d="M2 6c0-6 16-6 16 0 0 4-4 9-8 13C6 15 2 10 2 6Z" />
                    </svg>
                    {t('Strum')} {chord.label}
                </button>
            </div>
            <div className="chroma-strip" aria-hidden="true">
                {PITCHES.map((name, pitch) => (
                    <span key={name} data-lit={sounding.some(n => n !== null && n % 12 === pitch) ? '' : undefined}>{name}</span>
                ))}
            </div>
            <p className="lab-caption"><span className="lab-hint">{t('Drag the pick or tap a string.')} </span>{t('Fretmaid uses these twelve pitch classes to recognize chords.')}</p>
        </section>
    );
}
