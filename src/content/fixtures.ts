// DEVELOPMENT ONLY. Stress-test data for the "Demo data / Worst case" toggle
// (src/components/DataToggle.tsx, break-ui method).
//
// NOTHING HERE IS REAL. The metrics, screenshots and long strings exist only
// to check that layouts survive realistic extremes. useContent() never
// returns these objects in a production build.
//
// They are functions (not top-level constants) so the bundler can drop the
// whole file from production: unused functions are removed, but top-level
// code with calls in it would be kept.

import { site } from './site';
import type { Shot, SiteContent } from './types';

// A flat placeholder image, so the gallery can be tested without real files
function placeholderShot(label: string): Shot {
    const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 780'>` +
        `<rect width='360' height='780' fill='%231c1a18'/>` +
        `<text x='180' y='390' fill='%238f8b85' font-family='monospace' font-size='20' text-anchor='middle'>${label}</text>` +
        `</svg>`;

    return {
        src: `data:image/svg+xml;utf8,${svg}`,
        alt: `Test fixture: ${label}`,
        width: 360,
        height: 780,
    };
}

/** Long, plausible values in every field at once */
export function buildWorstCase(): SiteContent {
    return {
    ...site,
    person: {
        ...site.person,
        tagline:
            'I build accessible, fast interfaces with React and TypeScript, and I led the team that shipped a real-time guitar learning app from microphone to feedback.',
        facts: ['Ciudad Nezahualcóyotl, Mexico', 'Graduated 2026'],
    },
    project: {
        ...site.project,
        title: 'Dulcería La Esperanza',
        summary:
            'Android app for learning guitar. It streams your playing to a Python backend that detects pitch and recognizes chords in real time, then adapts feedback to your progress, tracks every practice session and reports how your accuracy changes week over week.',
        facts: [
            {
                label: 'Responsibilities',
                values: [
                    'Android app (Kotlin), FastAPI backend, real-time audio pipeline, progress dashboard',
                ],
            },
            ...site.project.facts,
        ],
        stack: [
            'Kotlin',
            'Python',
            'FastAPI',
            'NoSQL',
            'TypeScript',
            'React Router',
            'Web Audio API',
            'PostgreSQL',
            'customer-feedback-from-enterprise-onboarding',
        ],
        metrics: [
            { label: 'Pitch detection accuracy', value: '97.25%', source: 'Test fixture, not real' },
            { label: 'End-to-end latency', value: '1,284.5 ms', source: 'Test fixture, not real' },
            {
                label: 'Guided practice sessions recorded during testing',
                value: '12,840',
                source: 'Test fixture, not real',
            },
        ],
        shots: [
            placeholderShot('Tuner'),
            placeholderShot('Chords'),
            placeholderShot('Practice'),
            placeholderShot('Progress'),
        ],
        chain: site.project.chain.map((item, index) =>
            index === 0
                ? {
                      ...item,
                      detail:
                          'Android app, Kotlin, AudioRecord 44,100 Hz mono PCM 16-bit, 2,048-sample frames',
                  }
                : item,
        ),
        features: site.project.features.map((feature, index) => ({
            ...feature,
            title: index === 0 ? 'Benachrichtigungseinstellungen recognition' : feature.title,
            shot: index < 2 ? placeholderShot(feature.title) : null,
        })),
    },
    about: {
        ...site.about,
        pullLines: ['Software with a human interface,', 'built by someone who plays guitar every day.'],
    },
    skills: [
        {
            ...site.skills[0]!,
            skills: [
                ...site.skills[0]!.skills,
                'Accessibility',
                'Web Animations API',
                'IntersectionObserver',
                'View Transitions',
            ],
            evidence: {
                kind: 'external',
                label: 'This site: source code, commit history and build pipeline on GitHub',
                href: 'https://example.com/',
            },
        },
        ...site.skills.slice(1),
    ],
    contact: {
        ...site.contact,
        email: 'bartholomew.fitzgerald@northwind-industries-holdings.example.com',
        note: 'Open to frontend and full-stack roles: remote, hybrid or on-site, full-time or contract, starting in January.',
    },
    };
}

/** Exactly one of everything: catches layouts that assume a full grid */
export function buildSparseCase(): SiteContent {
    return {
    ...site,
    project: {
        ...site.project,
        stack: ['Kotlin'],
        metrics: [
            { label: 'Latency', value: '9 ms', source: 'Test fixture, not real' },
            { label: 'Accuracy', value: null },
        ],
        shots: [placeholderShot('Only one')],
        features: site.project.features.slice(0, 1),
    },
    about: { ...site.about, pullLines: ['Hi.'] },
    skills: [{ ...site.skills[0]!, skills: ['React'] }],
    contact: { ...site.contact, email: 'a@b.co', channels: site.contact.channels.slice(0, 1) },
    };
}
