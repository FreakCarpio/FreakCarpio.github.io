import { site } from './site';
import type { SiteContent, SkillGroup } from './types';

const skillCopy: Record<SkillGroup['symbol'], {
    name: string; example: string; description: string; evidenceLabel: string;
}> = {
    frontend: {
        name: 'Frontend',
        example: 'Este portafolio',
        description: 'El diapasón interactivo está hecho con React. Con TypeScript uso los mismos datos del proyecto en la portada y en el caso de estudio. Ambas páginas se pueden leer desde el HTML inicial.',
        evidenceLabel: 'Ver el código del portafolio',
    },
    backend: {
        name: 'Móvil y backend',
        example: 'Del teléfono al servidor',
        description: 'Desarrollé la app en Kotlin que captura lo que toca el guitarrista y el backend en FastAPI que recibe el audio para analizarlo.',
        evidenceLabel: 'Ver el caso de Fretmaid',
    },
    spectrum: {
        name: 'Audio digital',
        example: 'Cómo reconocer un acorde',
        description: 'Fretmaid sigue la evolución de las frecuencias para identificar notas. Para reconocer acordes, agrupa la energía de la señal en doce clases de altura.',
        evidenceLabel: 'Ver cómo se procesa el audio',
    },
    branch: {
        name: 'Herramientas e IA',
        example: 'De la idea al prototipo',
        description: 'Uso Claude, Cursor y Codex para probar ideas directamente en el código. En tareas que antes me llevaban días de preparación, hoy puedo tener una primera versión funcionando en minutos. Yo elijo el enfoque, reviso los cambios y pruebo el resultado antes de integrarlo.',
        evidenceLabel: 'Ver el historial en GitHub',
    },
};

const terms: Record<string, string> = {
    'REST APIs': 'API REST',
    'Pitch detection': 'Detección de notas',
    'Chroma features': 'Características cromáticas',
    'Pitch detection accuracy': 'Precisión en la detección de notas',
    'End-to-end latency': 'Latencia de extremo a extremo',
    'Test sessions': 'Sesiones de prueba',
};

export const siteEs: SiteContent = {
    person: {
        ...site.person,
        role: 'Desarrollador frontend',
        roleDetail: 'React · TypeScript y desarrollo full-stack',
        status: 'Disponible para trabajar',
        facts: ['México', 'Egresado en 2026'],
    },
    project: {
        ...site.project,
        summary: 'App de Android para aprender guitarra. Envía lo que tocas a un backend en Python que detecta notas y reconoce acordes en tiempo real. La retroalimentación se adapta a tu progreso.',
        facts: [
            { label: 'Mi papel', values: ['Líder del equipo'] },
            { label: 'Equipo', values: ['3 personas'] },
            { label: 'Desarrollo', values: ['App de Android en Kotlin', 'Backend en FastAPI'] },
            { label: 'Metodología', values: ['Scrum y Mobile-D'] },
            { label: 'Contexto', values: ['Tesis de ingeniería aprobada'] },
            { label: 'Estado', values: ['Sin publicar'] },
        ],
        metrics: site.project.metrics.map(metric => ({ ...metric, label: terms[metric.label] ?? metric.label })),
        overview: [
            'Fretmaid es una app de Android para aprender guitarra. Mientras tocas, escucha a través del micrófono del teléfono, analiza el audio en tiempo real y te muestra las notas, los acordes y cómo va tu práctica.',
            'Reúne un afinador, reconocimiento de acordes, práctica guiada y libre, métricas de progreso y retroalimentación adaptada a cada persona.',
        ],
        role: [
            'Fretmaid fue mi tesis de ingeniería. Lideré un equipo de tres personas y desarrollé las dos capas principales del producto: la app de Android en Kotlin y el backend en FastAPI.',
            'Organizamos el trabajo con Scrum y Mobile-D, una metodología ágil para el desarrollo de aplicaciones móviles.',
        ],
        architectureIntro: 'El audio recorre Fretmaid como la señal de una guitarra recorre una cadena de efectos. Cada etapa recibe la salida de la anterior.',
        chain: [
            { stage: 'Captura por micrófono', detail: 'App de Android en Kotlin' },
            { stage: 'Transmisión de audio en tiempo real' },
            { stage: 'API', detail: 'FastAPI y Python' },
            { stage: 'Procesamiento de la señal', detail: 'FFT y STFT' },
            { stage: 'Análisis', detail: 'Detección de notas y reconocimiento de acordes mediante características cromáticas' },
            { stage: 'Métricas de progreso' },
            { stage: 'Retroalimentación adaptativa', detail: 'Umbrales y métricas de cada persona' },
        ],
        pipeline: [
            'El backend analiza el audio en Python. La transformada rápida de Fourier (FFT) permite ver qué frecuencias contiene la señal. La transformada de Fourier de tiempo corto (STFT) muestra cómo cambian esas frecuencias mientras tocas.',
            'La detección de altura identifica las notas. Para reconocer acordes, Fretmaid utiliza características cromáticas que resumen la energía de cada una de las doce clases de altura.',
        ],
        features: [
            { title: 'Afinador', description: 'Afina la guitarra con el micrófono del teléfono.', shot: null },
            { title: 'Reconocimiento de acordes', description: 'Identifica el acorde que tocas a partir de sus características cromáticas.', shot: null },
            { title: 'Práctica guiada y libre', description: 'Sigue una sesión guiada o practica a tu ritmo.', shot: null },
            { title: 'Métricas de progreso', description: 'Registra cómo avanza cada persona a lo largo de sus sesiones.', shot: null },
            { title: 'Retroalimentación adaptativa', description: 'Ajusta las indicaciones según los umbrales y las métricas de cada persona.', shot: null },
        ],
        outcome: ['Fretmaid fue aprobada como mi tesis de ingeniería. La app aún no se ha publicado.'],
    },
    about: {
        ...site.about,
        pullLines: ['Software con una', 'interfaz humana.'],
        text: 'Soy egresado de Ingeniería en Sistemas Computacionales y me enfoco en desarrollo frontend y full-stack. Me interesan las interfaces, los sistemas de backend, las bases de datos, el desarrollo móvil y las aplicaciones inteligentes.',
        facts: [
            { label: 'Formación', values: ['Ingeniería en Sistemas Computacionales'] },
            { label: 'Modalidad', values: ['Remoto, híbrido o presencial', 'Sin disponibilidad para reubicarme'] },
            { label: 'Idiomas', values: ['Español nativo', 'Inglés conversacional básico y lectura técnica'] },
        ],
    },
    skills: site.skills.map(group => {
        const { evidenceLabel, ...copy } = skillCopy[group.symbol];
        return {
            ...group, ...copy,
            skills: group.skills.map(skill => terms[skill] ?? skill),
            evidence: { ...group.evidence, label: evidenceLabel },
        };
    }),
    contact: {
        ...site.contact,
        note: 'Busco oportunidades de frontend y full-stack en modalidad remota, híbrida o presencial.',
        channels: site.contact.channels.map(channel => channel.label === 'Phone' ? { ...channel, label: 'Teléfono' } : channel),
    },
};
