import { OG_IMAGE, personJsonLd, metadata } from '../content/meta';
import { useLanguage } from '../content/useLanguage';

/** React places title, meta and link elements in the document head. */
export function PageMetadata({ name }: { name: keyof typeof metadata.en }) {
    const { language } = useLanguage();
    const page = metadata[language][name];
    return (
        <>
            <title>{page.title}</title>
            <meta name="description" content={page.description} />
            {page.noindex && <meta name="robots" content="noindex" />}
            {page.canonical && <link rel="canonical" href={page.canonical} />}
            {page.canonical && <>
                <link rel="alternate" hrefLang="en" href={metadata.en[name].canonical} />
                <link rel="alternate" hrefLang="es" href={metadata.es[name].canonical} />
                <link rel="alternate" hrefLang="x-default" href={metadata.en[name].canonical} />
            </>}
            <meta property="og:type" content={page.ogType} />
            <meta property="og:site_name" content="Emilio Carpio" />
            <meta property="og:title" content={page.title} />
            <meta property="og:description" content={page.description} />
            {page.canonical && <meta property="og:url" content={page.canonical} />}
            <meta property="og:image" content={OG_IMAGE} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={language === 'es' ? 'Emilio Carpio, desarrollador frontend' : 'Emilio Carpio, Frontend Developer'} />
            <meta name="twitter:card" content="summary_large_image" />
            {name === 'home' && (
                <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
            )}
        </>
    );
}
