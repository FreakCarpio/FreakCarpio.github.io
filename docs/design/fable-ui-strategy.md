# Estrategia de UI — Portafolio Emilio Carpio

Fase 1 de 5 · Estrategia (solo lectura, sin cambios de código)
Fecha: 2026-11-10 · Estado: **pendiente de aprobación**

Revisado en vivo: `https://freakcarpio.github.io/` y `/projects/fretmaid/`,
en escritorio (1536×742) y a ancho de teléfono (390×720), más lectura de
`index.html`, `projects/fretmaid/index.html` y `css/styles.css`.

---

## 1. Diagnóstico: por qué se siente genérico y seco

La identidad visual **no** es el problema. El póster a dos tintas (Archivo
condensada, placa roja fuera de registro, bloque rojo de contacto) es
reconocible y no parece plantilla. Lo que falla es otra cosa:

### 1.1 No hay evidencia, solo afirmaciones

- En todo el sitio no hay **una sola imagen, captura, video ni demo**. Fretmaid,
  el proyecto estrella, es un título gigante y una tabla de datos.
- Un reclutador que abre el sitio en el teléfono ve en la primera pantalla
  un nombre, un rol y "Open to work". Ninguna prueba de trabajo hasta el
  cuarto bloque, después de ~2,900px de scroll.
- El case study son 3,400px de párrafos y listas. Describe una app de audio
  en tiempo real sin mostrar nada que se mueva ni suene.

### 1.2 El posicionamiento contradice el objetivo

- El objetivo es **Jr Frontend React**. El sitio dice "Frontend & Full-Stack
  Developer", pero el Core de skills es Kotlin, Python, FastAPI, FFT.
  React aparece en "Exploring · Currently learning", en gris y más chico.
- La única evidencia de frontend es el propio sitio, y está hecho sin React.
- Copy genérico que cualquiera podría firmar: "Building interfaces,
  applications and intelligent systems", "Software with a human interface",
  "with an interest in modern interfaces, backend systems, databases…".

### 1.3 El ritmo es plano

- Cada sección repite el mismo molde: título enorme → párrafo → lista `dl`
  de etiqueta/valor a 14px. Hay cinco `dl` casi idénticas en el sitio.
- Solo existen dos niveles de superficie: negro y rojo. No hay profundidad,
  ni marcos, ni capas. Todo es texto sobre fondo plano.
- Después de la entrada del hero (700ms), **nada responde al scroll** salvo
  el registro de la placa de "Fretmaid". El resto de la página es estática.

### 1.4 El movimiento que hay no trabaja a favor

- Las burbujas de skills son movimiento perpetuo sin información. En móvil
  la sección mide **1,649px (más de dos pantallas)** para mostrar 30
  etiquetas. Es el bloque más largo del sitio y el de menor valor.
- 30 skills, con "NoSQL" repetido en Core y en Working Knowledge, y nueve
  frameworks en Exploring. Eso se lee como relleno.
- Hover es casi lo único interactivo (grosor de subrayado, escala de
  burbuja). En táctil no hay respuesta al presionar.
- La navegación entre home y case study ya usa View Transitions, pero el
  resto del contenido de la página aparece de golpe.

### 1.5 Detalles que restan

- `theme-color` es `#0b0a09` y el fondo real `#0a0a0a`.
- "NoSql" en el case study vs "NoSQL" en el home.
- El botón "Menu" es texto plano sin estado visual de abierto más allá del color.
- "English (basic conversational…)" está en la segunda pantalla de un sitio
  100% en inglés. Es honesto, pero su posición lo vuelve protagonista.

**Resumen:** el sitio tiene estilo pero no tiene producto. Premium no va a
salir de más efectos; sale de mostrar Fretmaid, de jerarquía con profundidad
y de movimiento corto que responde a lo que hace la persona.

---

## 2. Dirección de gusto (una sola)

### "Two-Ink, Live" — el póster impreso, conectado a la señal

Se conserva el póster a dos tintas (ya aprobado, ya distintivo) y se le
agrega lo que le falta: **la señal en vivo**. El póster es la parte impresa
y fija; la señal es lo único que se mueve.

Tres reglas que definen la dirección:

1. **Tinta = fijo. Señal = vivo.** Tipografía, placas y bloques se comportan
   como impresión: entran una vez y se quedan. Lo único con vida propia es
   el motivo de **cuerda de guitarra**: líneas finas que vibran y se
   amortiguan cuando algo pasa (entra una sección, se toca un control).
2. **Fretmaid es el cabeza de cartel.** Sube al segundo bloque del home y
   recibe el espacio de producto: marco de dispositivo para capturas, ranura
   de demo, ranura de métricas.
3. **El rojo sigue siendo tinta, nunca adorno.** Placas, estado activo,
   foco y el bloque de contacto. No se agrega un segundo color de acento.

Lo que **no** es esta dirección: glassmorphism, gradientes, sombras
difusas, 3D, cursores custom, parallax de fondo, marquees, partículas.

### Toque distintivo: "Six Strings"

Seis líneas horizontales (las cuerdas, de E2 a E4) dentro del bloque de
Fretmaid. Al tocar o pasar por una cuerda, vibra con amortiguación (~500ms)
y un lector muestra la nota y su frecuencia en afinación estándar
(E2 82.41 Hz, A2 110.00, D3 146.83, G3 196.00, B3 246.94, E4 329.63).

- Son constantes físicas, no datos de Fretmaid: no inventa nada.
- Se rotula como ilustración interactiva, no como la app.
- SVG + un resorte amortiguado en JS (~1 KB). Sin Three.js, sin GSAP.
- Sin audio en la primera versión.
- La misma cuerda, en versión de una línea, sirve como divisor de sección
  que se "pulsa" una vez al entrar en pantalla.

---

## 3. Fundación

### 3.1 Tipografía

Se mantiene el par ya autoalojado (118 KB en total, sin petición externa):

| Rol | Familia | Uso |
|---|---|---|
| Display | Archivo variable, wdth 62–112%, wght 800–900, mayúsculas | Nombre, títulos de póster, Fretmaid |
| Texto | Archivo, wdth 100%, wght 400/600 | Párrafos, etiquetas, botones |
| Dato | Martian Mono 400 | Solo datos técnicos: stack, frecuencias, etapas, métricas |

Cambios sobre lo actual:

- Escala existente se conserva. Se agregan dos pasos intermedios que hoy
  faltan (23→32px y 28→43px) para subtítulos y cifras de métricas.
- El `dt` de las listas de datos pasa de Archivo gris a **mono en
  mayúsculas pequeñas** solo dentro de bloques técnicos (Fretmaid, case
  study). En About y Contact se queda en Archivo. Así se rompe la
  repetición de cinco `dl` iguales.
- Cifras siempre `tabular-nums`.
- Párrafos: 60–65 caracteres de medida, interlineado 1.5.

### 3.2 Color

Paleta única, oscura. Se añaden superficies y una línea fuerte; no se
añaden tonos nuevos.

| Token | Valor | Uso | Contraste sobre `bg` |
|---|---|---|---|
| `bg` | `#0a0a0a` | Papel | — |
| `surface-1` | `#131211` | Paneles (bloque Fretmaid, marco de media) | — |
| `surface-2` | `#1c1a18` | Elementos sobre panel (chips, controles) | — |
| `line` | `#262422` | Divisores menores | decorativo |
| `line-strong` | `#3d3a36` | Bordes de controles, cuerdas en reposo | ≥3:1 a verificar |
| `text` | `#efeae0` | Texto | ~16.5:1 |
| `text-muted` | `#8f8b85` | Secundario | ~5.8:1 |
| `signal` | `#ff2a1a` | Placa, activo, foco, contacto | ~5.3:1 |
| `signal-press` | `#d91f10` | Estado presionado sobre rojo | a verificar |

Los valores marcados "a verificar" se miden en la Fase 5 (contraste medible).

### 3.3 Espaciado

Se conserva la escala fluida actual (`xs 8` · `sm 12→16` · `md 24→32` ·
`lg 40→64` · `xl 64→120`) y se agregan `2xs 4px` y `2xl 96→176`.

Ritmo de página en lugar de `xl` uniforme en todas las secciones:

- Hero → Fretmaid: `lg` (Fretmaid debe asomarse en la primera pantalla móvil).
- Fretmaid: `2xl` arriba y abajo. Es el bloque con más aire.
- About, Skills: `xl`.
- Contact: `xl`, a sangre.

Objetivos táctiles: mínimo 44×44px, 8px entre objetivos contiguos.

### 3.4 Elevación

Vocabulario de imprenta, sin sombras difusas:

| Nivel | Cómo se expresa |
|---|---|
| 0 Papel | `bg` plano con grano |
| 1 Panel | `surface-1` + borde `line` de 1px |
| 2 Control | `surface-2` + borde `line-strong` |
| 3 Placa | Desplazamiento duro en rojo (la placa fuera de registro) — reservado para títulos display y para el marco de media de Fretmaid |

Radios: `0` en paneles y botones (es un póster), `999px` solo en chips,
y el radio propio del marco de dispositivo.

### 3.5 Movimiento

| Token | Valor | Uso |
|---|---|---|
| `press` | 120ms | Respuesta al presionar (escala 0.97) |
| `fast` | 160ms | Hover, subrayados, color |
| `base` | 280ms | Entradas de bloque, menú, transición de página |
| `slow` | 700ms | Solo el momento firma de cada pantalla |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Todo lo que entra |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Lo que se mueve estando en pantalla |
| `ease-in` | `cubic-bezier(0.5, 0, 0.75, 0)` | Solo salidas |
| Resorte de cuerda | amortiguado, ~500ms, sin rebote al final | Cuerdas |

Principios:

1. **Un momento firma por pantalla**, y dura menos de 1 segundo.
2. **Nunca se anima lo que se está leyendo.** El texto de párrafo no se
   desliza ni aparece letra por letra.
3. **Las entradas ocurren una vez.** Al volver a subir no se repiten.
4. **Salir es más rápido que entrar** (≈65% de la duración).
5. **Interrumpible:** los estados conmutables usan transiciones, no
   keyframes, para poder invertirse a medio camino.
6. Solo `transform`, `opacity` y `clip-path`. Nada que provoque layout.
7. Escalonado máximo de 50ms entre elementos y máximo 5 elementos.
8. Todo dentro de `prefers-reduced-motion: no-preference` (ya es la regla
   del proyecto). Con movimiento reducido el sitio queda completo y estático.
9. Nada bloquea el scroll ni el toque mientras se anima.

La especificación fina (curvas por componente, interrupciones, salidas,
revisión mobile-native) es la Fase 3.

---

## 4. Plan pantalla por pantalla

Nuevo orden del home: **Hero → Fretmaid → About → Skills → Contact.**

### 4.1 Cromo global (header, menú, transiciones)

- Header: se conserva el ocultar/mostrar con el scroll. Gana un borde
  inferior `line` que aparece solo cuando la página ya no está arriba.
- Menú móvil: el botón "Menu" pasa a "Menu / Close" con dos líneas que se
  cruzan. El telón se conserva; los enlaces entran escalonados (4 × 40ms).
  Al cerrar no hay escalonado: sale de una pieza y más rápido.
- Enlace activo de la nav: el subrayado rojo se desliza de un enlace al
  siguiente en vez de saltar.
- Presionar: todo botón y CTA responde con escala 0.97 en 120ms. Hover solo
  dentro de `@media (hover: hover)` para que no se quede pegado en táctil.
- Transición de página: se conserva el morph del título Fretmaid. El resto
  del contenido hace fundido corto (160ms sale, 280ms entra).
- Divisores: la cuerda de una línea entre secciones, pulsada una vez.

**Momento firma:** el morph del título "Fretmaid" entre la tarjeta y el
case study (ya existe; se afina la duración y se acompaña del fundido).

### 4.2 Hero

- El nombre se reduce ~25% en móvil para que el hero mida ≤70% de la
  pantalla y **Fretmaid asome** debajo. El nombre es la firma, no el producto.
- Rol: propuesta "Frontend Developer" con línea de dato en mono
  "React · TypeScript". (Decisión tuya, ver §6.)
- La descripción genérica se reemplaza por una frase concreta tuya. (§6)
- Los tres datos (Based in / Graduated / Status) pasan a una sola fila
  compacta. "Open to work" lleva un punto rojo fijo (estado = señal).
- CTA principal con forma de botón (nivel 2), no solo subrayado:
  "See Fretmaid". Secundario en subrayado: "Contact".

Microinteracciones: presionar en CTA; el subrayado del secundario crece
desde la izquierda en hover.

**Momento firma:** el registro a dos tintas actual, ajustado a ≤900ms en
total (hoy son ~1,180ms contando el retardo del rol), seguido de un único
pulso de la primera cuerda divisoria.

### 4.3 Fretmaid en el home (cabeza de cartel)

Panel `surface-1` a sangre, con tres zonas:

1. **Título** "Fretmaid" con placa roja + una línea de qué es.
2. **Escenario de media:** marco de dispositivo Android con placa
   desplazada (nivel 3). Admite 1–4 capturas con cambio por deslizamiento
   (scroll-snap nativo) y puntos de posición. Ranura para video demo.
   → **PENDIENTE: capturas y/o video reales.** Sin ellos, el marco no se
   publica vacío: en su lugar ocupa el espacio "Six Strings".
3. **Datos:** rol, equipo, lo construido, stack en chips mono, y fila de
   **métricas** con tres ranuras de cifra grande.
   → **PENDIENTE: no hay métricas confirmadas.** Las ranuras quedan
   marcadas `PENDIENTE` en el código y **ocultas en producción** hasta que
   des cifras reales. No se publica un campo vacío ni una cifra estimada.

CTA: "Read the case study" (botón, nivel 2).

Microinteracciones: chips del stack sin animación; puntos de galería
siguen el scroll-snap; el marco responde a presionar.

**Momento firma:** "Six Strings". Las seis cuerdas se pulsan en cascada
una vez al entrar el panel (6 × 50ms) y luego quedan interactivas.

### 4.4 About

- Se conserva el título vertical rojo en escritorio.
- La frase destacada pasa a ser tuya y concreta (por ejemplo, la conexión
  real guitarra + código). (§6)
- Datos: Education y Work mode arriba; Languages al final.
- Ranura opcional para foto. → **PENDIENTE: foto, si la quieres.**

**Momento firma:** la frase destacada entra línea por línea con máscara
(2–3 líneas, 50ms entre líneas, 280ms cada una), una sola vez. El párrafo
no se anima.

### 4.5 Skills

- **Recorte de 30 a ~14–16**, en tres filas con evidencia enlazada:
  - **Core** — React, TypeScript, JavaScript, HTML, CSS, + Kotlin, Python,
    FastAPI. Cada una con "dónde se ve": este portafolio (repo) o Fretmaid.
  - **Audio / DSP** — FFT, STFT, pitch detection, chroma (evidencia: Fretmaid).
  - **Tools** — Git, GitHub, REST APIs, SQL/NoSQL (una sola vez).
  - Se elimina "Exploring" como vitrina de nueve frameworks.
  → **PENDIENTE: confirmar la lista final y la evidencia de React.** (§6)
- Las burbujas flotantes se retiran. Recomendación firme: son 1,649px de
  scroll en móvil y movimiento sin información. Se conserva la forma de
  chip. (Decisión tuya porque antes pediste no romperlas, ver §6.)
- Formato: filas compactas "skill → evidencia", alineadas en columnas.
  En móvil la sección completa cabe en ~1 pantalla.

Microinteracciones: al enfocar o pasar por una skill se subraya su
evidencia; presionar en los enlaces de evidencia.

**Momento firma:** el título "Skills" en contorno **se llena de tinta**
al entrar (de trazo a relleno, ligado al scroll, sin duración propia).

### 4.6 Contact

- Se conserva el bloque rojo a sangre con el correo gigante.
- "Copy email": el texto del botón cambia a "Copied" con un cruce vertical
  de 160ms y regresa a los 2s. Hoy el aviso aparece aparte.
- Canales (Phone / GitHub / LinkedIn) como filas grandes tocables de 56px
  con flecha, en lugar de enlaces de 14px.
- Estado presionado sobre rojo con `signal-press`.

**Momento firma:** la placa roja sube como telón al entrar la sección
(`clip-path` ligado al scroll, termina antes de que el correo llegue al
centro de la pantalla, para no tapar la lectura).

### 4.7 Case study de Fretmaid

- Intro: título + resumen + **galería/video** arriba del pliegue.
  → **PENDIENTE: mismos assets que §4.3.**
- Fila de métricas (mismas ranuras, misma regla de ocultar si no hay datos).
- Índice de secciones pegajoso en escritorio; en móvil, barra de progreso
  de lectura de 2px bajo el header.
- Features: de lista de texto a tarjetas `surface-1`, cada una con ranura
  de captura. → **PENDIENTE: una captura por feature, si existen.**
- Secciones nuevas sugeridas, solo si tienes el contenido: "What I'd do
  differently" y "Decisions". → **PENDIENTE: contenido tuyo.**
- Navegación final: "Back to work" + "Contact".

**Momento firma:** la cadena de señal de 7 etapas se **enciende etapa por
etapa** al hacer scroll: una línea vertical roja baja por el riel y cada
número pasa de gris a rojo cuando la señal lo alcanza. Ligado al scroll,
reversible, sin duración propia.

### 4.8 404

- Mismo cromo. Título "404" con la placa roja **deliberadamente fuera de
  registro** (más que en el resto del sitio): un error de imprenta.

**Momento firma:** ninguno animado. La placa mal registrada es estática.

---

## 5. Riesgos y cómo se controlan

| Riesgo | Control |
|---|---|
| Demasiado movimiento | Un momento firma por pantalla; el resto son respuestas de ≤160ms |
| Publicar ranuras vacías | Toda ranura sin contenido real se oculta en producción |
| Efectos ligados al scroll sin soporte | Mejora progresiva: sin soporte, el estado final se muestra fijo |
| LCP por la animación del hero | El texto existe en el HTML desde el primer byte; se mide en Fase 5 |
| Marco de dispositivo con capturas pesadas | Formatos modernos, tamaños fijos reservados, carga diferida bajo el pliegue |
| Romper lo ya auditado (axe 0 violaciones) | Se re-audita en Fase 5; P0 se corrigen antes de cerrar |

---

## 6. Decisiones y contenido que necesito de ti

Decisiones (con mi recomendación):

1. **Dirección "Two-Ink, Live"** — ¿aprobada?
2. **Burbujas de skills** — recomiendo retirarlas. ¿De acuerdo?
3. **Rol en el hero** — recomiendo "Frontend Developer" + "React · TypeScript"
   en lugar de "Frontend & Full-Stack Developer". ¿De acuerdo?
4. **Orden del home** — Fretmaid sube al segundo bloque. ¿De acuerdo?
5. **Stack de implementación** — se decide formalmente en Fase 4;
   adelanto mi recomendación: **migrar a React + TypeScript (Vite)**,
   porque el puesto es React y hoy el sitio no contiene ninguna evidencia
   de React. El portafolio pasa a ser esa evidencia. Condición: que puedas
   explicar el código en entrevista.

Contenido (nada de esto lo invento):

- **Evidencia de React:** ¿tienes algún otro proyecto en React/TS además
  de lo que sería este portafolio (por ejemplo la landing de la dulcería)?
- **Métricas de Fretmaid:** precisión de detección, latencia, tamaño de
  ventana/sample rate, número de usuarios o sesiones de prueba, cobertura
  de acordes. Las que existan en la tesis, con su fuente.
- **Capturas y/o video** de Fretmaid (pantallas: afinador, acordes,
  práctica, progreso).
- **Lista final de skills** y qué evidencia respalda cada una.
- **Copy propio:** frase del hero, frase destacada de About.
- **Foto** para About (opcional).
- **Repo de Fretmaid:** ¿ya es público para enlazarlo?
