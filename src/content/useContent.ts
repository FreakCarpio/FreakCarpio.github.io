import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { buildSparseCase, buildWorstCase } from './fixtures';
import { site } from './site';
import { siteEs } from './site.es';
import { useLanguage } from './useLanguage';
import type { SiteContent } from './types';

export type DataMode = 'demo' | 'worst' | 'sparse';

/** Reads ?data=worst|sparse. Only meaningful while developing. */
export function useDataMode(): DataMode {
    const [params] = useSearchParams();
    const mode = params.get('data');

    return mode === 'worst' || mode === 'sparse' ? mode : 'demo';
}

/**
 * The content every component renders.
 *
 * import.meta.env.DEV is replaced with `false` in a production build, so the
 * branch below (and the fixtures it imports) is removed from the bundle:
 * production can only ever show the real content.
 */
export function useContent(): SiteContent {
    const mode = useDataMode();
    const { language } = useLanguage();

    // Built once per mode, so components get the same object on every render
    return useMemo(() => {
        if (import.meta.env.DEV) {
            if (mode === 'worst') return buildWorstCase();
            if (mode === 'sparse') return buildSparseCase();
        }

        return language === 'es' ? siteEs : site;
    }, [mode, language]);
}
