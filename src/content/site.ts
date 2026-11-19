import type { SiteContent } from './types';

const REPO_URL = 'https://github.com/FreakCarpio/FreakCarpio.github.io';
const CASE_STUDY = '/projects/fretmaid/';

// The real content of the site. Every statement here is a confirmed fact.
// Search for "PENDIENTE" to find the slots that are waiting for content.
export const site: SiteContent = {
    person: {
        nameLines: ['Emilio', 'Carpio'],
        role: 'Frontend Developer',
        roleDetail: 'React · TypeScript & Full-Stack Developer',
        // PENDIENTE: one or two sentences in Emilio's own words
        tagline: null,
        status: 'Open to work',
        facts: ['Mexico', 'Graduated 2026'],
    },

    project: {
        slug: 'fretmaid',
        title: 'Fretmaid',
        summary:
            'Android app for learning guitar. It streams your playing to a Python backend that detects pitch and recognizes chords in real time, then adapts feedback to your progress.',
        facts: [
            { label: 'Role', values: ['Team lead'] },
            { label: 'Team', values: ['3 people'] },
            { label: 'Built', values: ['Android app (Kotlin)', 'FastAPI backend'] },
            { label: 'Process', values: ['Scrum, Mobile-D'] },
            { label: 'Context', values: ['Engineering thesis (approved)'] },
            { label: 'Status', values: ['Not published'] },
        ],
        stack: ['Kotlin', 'Python', 'FastAPI', 'NoSQL'],

        // PENDIENTE: no measured numbers have been provided. Fill "value"
        // (and "source") with figures from the thesis; tiles with null
        // are not rendered, and with all three null the row does not exist.
        metrics: [
            { label: 'Pitch detection accuracy', value: null },
            { label: 'End-to-end latency', value: null },
            { label: 'Test sessions', value: null },
        ],

        // PENDIENTE: real screenshots (tuner, chords, practice, progress).
        // Put the files in public/assets/images/fretmaid/ and list them here.
        shots: [],

        // PENDIENTE: demo video
        video: null,

        overview: [
            "Fretmaid is an Android app for learning guitar. While you play, it listens through the phone's microphone, analyzes the sound in real time and responds with what it hears: the notes, the chords and how your practice is progressing.",
            'It combines a tuner, chord recognition, guided and free practice modes, progress metrics and feedback that adapts to each learner.',
        ],
        role: [
            'Fretmaid was my engineering thesis, developed by a team of three. I was the team lead, and I built the two main layers of the product: the Android app in Kotlin and the backend with FastAPI.',
            'We organized the work with Scrum and Mobile-D, an agile method designed for mobile application development.',
        ],
        architectureIntro:
            'Audio moves through Fretmaid like a guitar signal through a chain of effects: each stage takes the output of the previous one.',
        chain: [
            { stage: 'Microphone capture', detail: 'Android app, Kotlin' },
            { stage: 'Real-time audio stream' },
            { stage: 'API', detail: 'FastAPI, Python' },
            { stage: 'Signal processing', detail: 'FFT, STFT' },
            { stage: 'Analysis', detail: 'Pitch detection, chord recognition (chroma)' },
            { stage: 'Progress metrics' },
            { stage: 'Adaptive feedback', detail: "Thresholds and each user's metrics" },
        ],
        pipeline: [
            'All audio analysis runs in Python on the backend. The signal is analyzed with the Fast Fourier Transform (FFT) and the Short-Time Fourier Transform (STFT), which show which frequencies are present and how they change over time.',
            'Pitch detection identifies the notes being played. Chord recognition is based on chroma features, which summarize the energy of each of the twelve pitch classes.',
        ],
        // PENDIENTE: one screenshot per feature ("shot")
        features: [
            {
                title: 'Tuner',
                description: "Tune the guitar using the phone's microphone.",
                shot: null,
            },
            {
                title: 'Chord recognition',
                description: 'Identifies the chord being played from chroma features.',
                shot: null,
            },
            {
                title: 'Guided and free practice',
                description: 'Two practice modes: follow a guided session or play freely.',
                shot: null,
            },
            {
                title: 'Progress metrics',
                description: "Tracks each learner's practice over time.",
                shot: null,
            },
            {
                title: 'Adaptive feedback',
                description: 'Adjusts to each learner using thresholds and their own metrics.',
                shot: null,
            },
        ],
        outcome: [
            'Fretmaid was approved as my engineering thesis. The app has not been published yet.',
        ],
    },

    about: {
        // PENDIENTE: Emilio may replace this with his own line
        pullLines: ['Software with a', 'human interface.'],
        text: 'I am a recently graduated Systems Engineering professional focused on frontend and full-stack development, with an interest in modern interfaces, backend systems, databases, mobile development and intelligent applications.',
        facts: [
            { label: 'Education', values: ['Eng. in Computer Systems Engineering'] },
            { label: 'Work mode', values: ['Remote, hybrid or on-site', 'Not open to relocation'] },
            {
                label: 'Languages',
                values: ['Spanish (native)', 'English (basic conversational, technical reading)'],
            },
        ],
        // PENDIENTE: optional portrait
        photo: null,
    },

    // PENDIENTE: final list to be confirmed by Emilio. Only skills with
    // something a visitor can open are published; SQL, MySQL, Java and C++
    // are waiting for evidence.
    skills: [
        {
            name: 'Frontend',
            symbol: 'frontend',
            example: 'This portfolio',
            description: 'React drives the playable fretboard. TypeScript keeps the project data consistent across the home page and case study. Both pages arrive as readable HTML.',
            skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
            evidence: { kind: 'external', label: 'This site: source on GitHub', href: REPO_URL },
        },
        {
            name: 'Mobile & backend',
            symbol: 'backend',
            example: 'From phone to backend',
            description: 'I built the Kotlin app that captures a guitarist’s playing and the FastAPI backend that receives the audio for analysis.',
            skills: ['Kotlin', 'Android', 'Python', 'FastAPI', 'REST APIs', 'NoSQL'],
            evidence: { kind: 'internal', label: 'Fretmaid case study', to: CASE_STUDY },
        },
        {
            name: 'Audio DSP',
            symbol: 'spectrum',
            example: 'Recognizing a chord',
            description: 'Fretmaid follows frequencies over time to identify notes. Its chord recognition groups the signal into twelve pitch classes.',
            skills: ['FFT', 'STFT', 'Pitch detection', 'Chroma features'],
            evidence: {
                kind: 'internal',
                label: 'Fretmaid audio pipeline',
                to: `${CASE_STUDY}#audio-pipeline`,
            },
        },
        {
            name: 'Tools & AI',
            symbol: 'branch',
            example: 'From idea to working prototype',
            description: 'I use Claude, Cursor and Codex to try implementation ideas in code. I can now get a first version running in minutes for tasks that used to take me days to set up. I choose the approach, review the changes and test the result before committing it.',
            skills: ['Claude', 'Cursor', 'Codex', 'Git', 'GitHub'],
            evidence: { kind: 'external', label: 'Commit history on GitHub', href: `${REPO_URL}/commits` },
        },
    ],

    contact: {
        email: 'carpioemilio81@gmail.com',
        note: 'Open to frontend and full-stack roles: remote, hybrid or on-site.',
        channels: [
            { label: 'Phone', value: '+52 55 8094 2853', href: 'tel:+525580942853', external: false },
            {
                label: 'GitHub',
                value: 'FreakCarpio',
                href: 'https://github.com/FreakCarpio',
                external: true,
            },
            {
                label: 'LinkedIn',
                value: 'emilio-alejandro-carpio-guzmán',
                href: 'https://www.linkedin.com/in/emilio-alejandro-carpio-guzm%C3%A1n/',
                external: true,
            },
        ],
    },
};
