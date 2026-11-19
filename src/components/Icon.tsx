// Closed icon set: inline SVG, 1.5px stroke, inherits the text color.
// Icons always sit next to a text label, so they are hidden from assistive tech.

const PATHS = {
    arrowRight: 'M4 10h12M11 5l5 5-5 5',
    arrowUpRight: 'M6 14 14 6M7 6h7v7',
    copy: 'M7 7V4.5h8.5V13H13M4.5 7H13v8.5H4.5z',
    check: 'm4.5 10.5 3.5 3.5 7.5-8',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name }: { name: IconName }) {
    return (
        <svg
            className="icon"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            aria-hidden="true"
            focusable="false"
        >
            <path d={PATHS[name]} />
        </svg>
    );
}
