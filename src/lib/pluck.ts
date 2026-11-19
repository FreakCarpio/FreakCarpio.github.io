// A plucked string: a damped oscillation drawn on an SVG path.
//
//   displacement(t) = amplitude · e^(−6t) · cos(2π · cycles · t),  t from 0 to 1
//
// e^(−6t) is the decay (the string loses energy) and the cosine is the swing.
// It starts at full displacement, like a string at the moment it is released.
//
// The path lives in a "0 -12 100 24" viewBox stretched to any width
// (preserveAspectRatio="none"), so nothing needs measuring: x runs 0–100 and
// the resting string is the line y = 0.

export const REST_PATH = 'M0 0 Q50 0 100 0';

const DECAY = 6;

export interface PluckOptions {
    /** Peak displacement in viewBox units (the box is 12 units tall each way) */
    amplitude: number;
    /** How many full swings happen before the string settles */
    cycles: number;
    duration?: number;
    delay?: number;
    onDone?: () => void;
}

// One animation per string. Plucking a string that is still ringing cancels
// the old motion and starts again, as it would on a real guitar.
const running = new WeakMap<SVGPathElement, number>();

export function pluck(
    path: SVGPathElement,
    { amplitude, cycles, duration = 520, delay = 0, onDone }: PluckOptions,
) {
    stopPluck(path);

    const start = performance.now() + delay;

    const frame = (now: number) => {
        const t = (now - start) / duration;

        if (t < 0) {
            running.set(path, requestAnimationFrame(frame));
            return;
        }

        if (t >= 1) {
            path.setAttribute('d', REST_PATH);
            running.delete(path);
            onDone?.();
            return;
        }

        const displacement = amplitude * Math.exp(-DECAY * t) * Math.cos(2 * Math.PI * cycles * t);

        // A quadratic curve peaks at half its control point's offset
        path.setAttribute('d', `M0 0 Q50 ${(displacement * 2).toFixed(2)} 100 0`);
        running.set(path, requestAnimationFrame(frame));
    };

    running.set(path, requestAnimationFrame(frame));
}

export function stopPluck(path: SVGPathElement) {
    const id = running.get(path);

    if (id !== undefined) cancelAnimationFrame(id);

    running.delete(path);
    path.setAttribute('d', REST_PATH);
}
