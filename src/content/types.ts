// Shape of everything the site renders. Components never hardcode copy:
// they receive these objects, so the same component can be rendered with
// real content or with the worst-case fixture (see fixtures.ts).
//
// PENDIENTE convention: a field typed "| null" is a slot whose real content
// has not been provided yet. null means "do not render this at all".
// Nothing is ever shown empty, and nothing is ever estimated.

export interface Fact {
    label: string;
    values: string[];
}

export interface Metric {
    label: string;
    /** null = PENDIENTE: the tile is not rendered */
    value: string | null;
    /** Where the number comes from (thesis chapter, test protocol...) */
    source?: string;
}

export interface Shot {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface Video {
    src: string;
    poster: string;
    /** Text alternative describing what the demo shows */
    description: string;
}

export interface ChainStage {
    stage: string;
    detail?: string;
}

export interface Feature {
    title: string;
    description: string;
    /** null = PENDIENTE: the card renders without a media slot */
    shot: Shot | null;
}

export interface Project {
    slug: string;
    title: string;
    summary: string;
    facts: Fact[];
    stack: string[];
    metrics: Metric[];
    /** Empty = PENDIENTE: "Six Strings" takes the stage instead */
    shots: Shot[];
    /** null = PENDIENTE */
    video: Video | null;
    overview: string[];
    role: string[];
    architectureIntro: string;
    chain: ChainStage[];
    pipeline: string[];
    features: Feature[];
    outcome: string[];
}

export type Evidence =
    | { kind: 'internal'; label: string; to: string }
    | { kind: 'external'; label: string; href: string };

export interface SkillGroup {
    name: string;
    symbol: 'frontend' | 'backend' | 'spectrum' | 'branch';
    example: string;
    description: string;
    skills: string[];
    /** Every published group points at something a visitor can open */
    evidence: Evidence;
}

export interface Channel {
    label: string;
    value: string;
    href: string;
    external: boolean;
}

export interface SiteContent {
    person: {
        nameLines: string[];
        role: string;
        roleDetail: string;
        /** null = PENDIENTE */
        tagline: string | null;
        status: string;
        facts: string[];
    };
    project: Project;
    about: {
        /** One entry per display line of the pull quote */
        pullLines: string[];
        text: string;
        facts: Fact[];
        /** null = PENDIENTE */
        photo: Shot | null;
    };
    skills: SkillGroup[];
    contact: {
        email: string;
        note: string;
        channels: Channel[];
    };
}
