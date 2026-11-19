import type { Ref } from 'react';
import { REST_PATH } from '../lib/pluck';

interface Props {
    /** The path that src/lib/pluck.ts animates */
    pathRef?: Ref<SVGPathElement>;
    className?: string;
}

/**
 * One guitar string: a horizontal line that can be plucked.
 * Purely visual; the control (a button or a link) lives in the parent.
 */
export function StringLine({ pathRef, className = '' }: Props) {
    return (
        <svg
            className={`string ${className}`}
            viewBox="0 -12 100 24"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
        >
            {/* non-scaling-stroke keeps the line the same thickness however
                wide the box is stretched */}
            <path ref={pathRef} d={REST_PATH} vectorEffect="non-scaling-stroke" />
        </svg>
    );
}
