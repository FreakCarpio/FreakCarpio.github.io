export type Language = 'en' | 'es';

export function languageOf(path: string): Language {
    return /^\/es(?:\/|$)/.test(path) ? 'es' : 'en';
}

/** Accepts a site path with or without a language prefix, including its fragment. */
export function localizedPath(path: string, language: Language): string {
    const base = path.replace(/^\/es(?=\/|$)/, '') || '/';
    return language === 'es' ? '/es' + base : base;
}
