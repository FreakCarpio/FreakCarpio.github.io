import type { CSSProperties } from 'react';

/**
 * Display titles shrink to fit their container before they wrap, and they
 * are never truncated. CSS can't count characters, so the length of the
 * longest unbreakable piece is passed in as --longest; the stylesheet
 * divides the container width by it (see .fit-title in components.css).
 */
export function fitTitleStyle(text: string, extra: CSSProperties = {}): CSSProperties {
    const longest = Math.max(...text.split(/\s+/).map((word) => word.length), 1);

    return { '--longest': longest, ...extra } as CSSProperties;
}
