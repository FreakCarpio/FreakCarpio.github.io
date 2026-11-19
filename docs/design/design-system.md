# Design System — "Two-Ink, Live"

Fase 2 de 5 · Skill: **ui-ux-pro-max** · Fecha: 2026-11-10
Entrada: `docs/design/fable-ui-strategy.md` (aprobada).
Estado: **pendiente de aprobación**. Sin cambios de código todavía.

## 0. Qué aportó la skill

Consulté la base de datos de ui-ux-pro-max (tablas de producto, estilo,
color, tipografía, landing, motion y 120 reglas UX). Leí las tablas
directamente; no ejecuté su script.

| Consulta | Resultado de la base | Qué hago con él |
|---|---|---|
| Producto #11 Portfolio/Personal | Estilo "Motion-Driven + Minimalism & Swiss", secundario Brutalism; patrón Storytelling-Driven; anti-patrón: "Corporate templates + Generic layouts" | Confirma la dirección: retícula suiza de 12 columnas + movimiento con narrativa |
| Estilo #47 Exaggerated Minimalism | Tipografía sobredimensionada, peso 900, **un solo acento**, sin colores secundarios | Es la descripción del póster. Regla adoptada: un solo acento |
| Estilo #38 Neubrutalism | Sombra dura desplazada, radio 0, sin gradientes | Se adopta solo la sombra dura, reinterpretada como "placa de tinta" |
| Paleta #11 Portfolio | Monocromo claro + acento azul `#2563EB` | **Descartada.** La paleta a dos tintas ya está aprobada y es más propia |
| Tipografía #44 Minimalist Portfolio | Archivo + Space Grotesk | Confirma Archivo. Space Grotesk se descarta: Archivo ya cubre texto |
| Landing #26 Portfolio Grid | "Visuals first. Fast loading essential." | Fretmaid sube al segundo bloque, con escenario de media |
| Reglas UX (ver §9) | #9, #11, #12, #15, #20, #22, #23, #28, #30, #36, #67, #73, #96, #100, #116, #117 | Convertidas en restricciones de componentes |

Alcance: **1 paleta, 1 par tipográfico, 1 escala de espaciado.** Sin tema
claro. Sin Three.js. Sin GSAP: el movimiento es CSS + Web Animations API +
un resorte de ~1 KB para las cuerdas (detalle en Fase 3).

---

## 1. Color

### 1.1 Paleta (contraste medido, WCAG 2.x)

| Token | Hex | Rol | Sobre `bg` | Sobre `surface-1` | Sobre `surface-2` |
|---|---|---|---|---|---|
| `--color-bg` | `#0a0a0a` | Papel | — | — | — |
| `--color-surface-1` | `#131211` | Panel | — | — | — |
| `--color-surface-2` | `#1c1a18` | Control, chip | — | — | — |
| `--color-text` | `#efeae0` | Tinta clara | 16.51 | 15.61 | 14.47 |
| `--color-text-muted` | `#8f8b85` | Texto secundario | 5.84 | 5.52 | 5.12 |
| `--color-signal` | `#ff2a1a` | Tinta roja | 5.28 | 4.99 | 4.63 |
| `--color-line` | `#262422` | Divisor decorativo | 1.28 | — | — |
| `--color-line-control` | `#6a665f` | Borde de control, cuerda en reposo | 3.47 | 3.28 | 3.04 |
| `--color-on-signal` | `#0a0a0a` | Texto sobre rojo | 5.28 sobre `signal` | | |

Todo par de texto cumple AA (≥4.5:1). Los bordes de control cumplen 3:1.

### 1.2 Correcciones respecto a la estrategia

Medir cambió dos cosas que había propuesto en la Fase 1:

- **`line-strong #3d3a36` queda fuera.** Da 1.75:1; no sirve como borde de
  control. Lo sustituye `line-control #6a665f` (≥3.04:1 en las tres
  superficies).
- **`signal-press #d91f10` queda fuera.** Oscurecer el rojo baja el texto
  negro a 3.92:1. El estado presionado sobre rojo será **inversión**:
  fondo `bg`, texto `text` (16.51:1).

### 1.3 Reglas de uso

1. El rojo es tinta: placas, estado activo/actual, foco, bloque de Contact.
2. Texto rojo solo sobre `bg` o `surface-1`. Nunca sobre `surface-2` en
   tamaños menores a 18px (4.63:1 es margen demasiado justo).
3. Texto claro sobre rojo está **prohibido** (3.13:1). Sobre rojo, siempre negro.
4. `line` es decorativo; nunca es el único indicador de un límite interactivo.
5. Ningún componente usa hex directo: solo tokens.
6. El color nunca es el único portador de estado: va con subrayado,
   icono, texto o `aria-*`.

---

## 2. Tipografía

### 2.1 Par tipográfico

**Archivo** (variable, ancho 62–125%, peso 100–900) + **Martian Mono**
(variable). Ambas ya autoalojadas, subconjunto Latin, 118 KB en total.

| Rol | Token | Ajuste |
|---|---|---|
| Display | `--font-display` | Archivo, peso 900, mayúsculas, ancho 62–112% según tamaño |
| Texto | `--font-body` | Archivo, ancho 100%, peso 400 (600 para énfasis y botones) |
| Dato | `--font-mono` | Martian Mono 400. Solo datos técnicos |

### 2.2 Escala (fluida 320→1440px, cada paso ≤2.5× para zoom WCAG 1.4.4)

| Token | Mín → Máx | Uso |
|---|---|---|
| `--text-micro` | 12px fijo | Etiqueta mono en mayúsculas (dt técnico, leyendas) |
| `--text-meta` | 14px fijo | Datos secundarios, nav |
| `--text-body` | 16 → 18px | Párrafos (mínimo 16px en móvil) |
| `--text-lead` | 19 → 24px | Entradilla, skill, canal de contacto |
| `--text-title` | 23 → 32px | **Nuevo.** Título de tarjeta, cifra de métrica chica |
| `--text-figure` | 28 → 43px | **Nuevo.** Cifra de métrica, lector de nota |
| `--text-subhead` | 33 → 57px | Rol del hero |
| `--text-section` | 40 → 76px | Frase destacada, menú móvil |
| `--text-poster` | 72 → 176px | Títulos de sección |
| `--text-headliner` | 76 → 190px | "Fretmaid" |
| `--text-hero` | **72 → 180px** (antes 92 → 230) | Nombre |
| `--text-email` | 52 → 130px | Correo |

```css
--text-micro: 0.75rem;
--text-title: clamp(1.44rem, 1.28rem + 0.798vw, 1.999rem);
--text-figure: clamp(1.728rem, 1.461rem + 1.338vw, 2.664rem);
--text-hero: clamp(4.5rem, 2.4rem + 10.5vw, 11.25rem);
```

Interlineado: `0.8` display · `0.95` subtítulos · `1.35` entradilla ·
`1.5` párrafo. Medida de párrafo: 60–65ch. Cifras: `tabular-nums`.
Etiqueta mono (`--text-micro`): mayúsculas, `letter-spacing: 0.06em`.

---

## 3. Espaciado, retícula, radios, capas

```css
--space-2xs: 0.25rem;                                    /* 4 */
--space-xs:  0.5rem;                                     /* 8 */
--space-sm:  clamp(0.75rem, 0.6786rem + 0.3571vw, 1rem); /* 12 → 16 */
--space-md:  clamp(1.5rem, 1.357rem + 0.7143vw, 2rem);   /* 24 → 32 */
--space-lg:  clamp(2.5rem, 2.071rem + 2.143vw, 4rem);    /* 40 → 64 */
--space-xl:  clamp(4rem, 3rem + 5vw, 7.5rem);            /* 64 → 120 */
--space-2xl: clamp(6rem, 4.571rem + 7.143vw, 11rem);     /* 96 → 176 */

--gutter: clamp(1.25rem, 1.036rem + 1.071vw, 2rem);      /* 20 → 32 */
--content-max: 1400px;

--radius-none: 0;        /* paneles, botones, tarjetas */
--radius-chip: 999px;    /* chips */
--radius-device: 2rem;   /* marco de teléfono */

--hit: 2.75rem;          /* 44px: objetivo táctil mínimo */
--hit-lg: 3.5rem;        /* 56px: filas de contacto, botón primario */

--z-base: 0; --z-raised: 10; --z-header: 20; --z-menu: 30;
--z-skip: 40; --z-grain: 50;
```

- Retícula: 1 columna en móvil; 12 columnas desde 1024px con `gap: --space-md`.
- Breakpoints: 600px y 1024px (los actuales).
- Ritmo vertical: Hero→Fretmaid `lg` · Fretmaid `2xl` · About y Skills `xl` · Contact `xl`.
- Separación mínima entre objetivos táctiles contiguos: 8px.
- Alturas de pantalla con `svh` (estable) y `dvh` solo en el menú a pantalla completa.

---

## 4. Elevación

Sin sombras difusas. Cuatro niveles:

| Nivel | Token | Definición |
|---|---|---|
| 0 Papel | — | `bg` + grano |
| 1 Panel | `--elev-panel` | `background: surface-1; border: 1px solid line` |
| 2 Control | `--elev-control` | `background: surface-2; border: 1px solid line-control` |
| 3 Placa | `--plate` | `box-shadow: var(--plate-x) var(--plate-y) 0 0 var(--color-signal)` |

```css
--plate-rest: 3px;   /* placa visible en reposo */
--plate-hover: 6px;  /* fuera de registro */
--plate-press: 0px;  /* en registro: impreso */
```

La placa se usa en: títulos display (como texto generado, ya existe),
botón primario, marco de media de Fretmaid. En ningún otro lugar.

---

## 5. Componentes

### 5.1 Botones

Tres variantes, radio 0, etiqueta Archivo 600 a `--text-body`, icono
opcional de 20px a la derecha.

| | Primario | Secundario | Enlace (CTA) |
|---|---|---|---|
| Uso | 1 por bloque: "See Fretmaid", "Read the case study" | Acción alterna: "Contact", "Copy email" | Navegación en línea |
| Alto | 56px (`--hit-lg`) | 48px | 44px de área, texto en línea |
| Relleno | `text` (`#efeae0`) | transparente | — |
| Texto | `bg` (16.51:1) | `text` | `text` |
| Borde | ninguno | 1px `line-control` | subrayado 2px `signal` |
| Padding | `0 1.5rem` | `0 1.25rem` | — |
| Reposo | placa roja 3px | — | subrayado 2px |
| Hover (solo `hover: hover`) | placa 6px, botón sube 3px | borde `text` | subrayado 4px |
| Presionado | placa 0, botón baja a registro | fondo `surface-2`, escala 0.98 | escala 0.98 |
| Foco | contorno 2px `signal`, offset 3px | igual | igual |
| Deshabilitado | relleno `surface-2`, texto `text-muted`, sin placa, `aria-disabled` | borde `line`, texto `text-muted` | — |

Sobre el bloque rojo de Contact:

| | Reposo | Presionado | Foco |
|---|---|---|---|
| Secundario sobre rojo | borde 1.5px negro, texto negro | **inversión**: fondo negro, texto `text` | contorno 2px negro |

Ancho: en móvil el primario ocupa el 100% del contenedor; desde 600px,
ancho de contenido.

### 5.2 Chip

- Alto 32px, `padding: 0 0.75rem`, radio 999px, `surface-2`, borde `line`.
- Tipografía: mono 13px para stack; Archivo `--text-meta` para skills.
- **No interactivo por defecto** (no parece botón: sin borde de control).
- Variante interactiva (skill con evidencia): es un `<a>` o `<button>`
  real, borde `line-control`, área táctil 44px mediante padding vertical,
  estado actual con borde `signal` + `aria-current` o `aria-pressed`.
- Una línea siempre (`white-space: nowrap`).

### 5.3 Tarjetas

**Panel** (base de todo lo demás)
`surface-1`, borde `line`, radio 0, padding `--space-md`. Sin sombra.

**Tarjeta de feature** (case study)
Panel con: ranura de media arriba (proporción 4:3, fondo `surface-2`),
título `--text-title` display, descripción `text-muted`. Si no hay media,
la ranura no se renderiza y la tarjeta queda solo con texto.

**Tesela de métrica**
Etiqueta mono `--text-micro` arriba · cifra `--text-figure` mono,
`tabular-nums` · nota de fuente `--text-meta` `text-muted`.
**Estado PENDIENTE:** el dato vive en el código como `value: null` con
comentario `PENDIENTE`. Con `null` la tesela no se renderiza; si todas
son `null`, la fila completa no existe en producción.

**Escenario de media** (Fretmaid)
Marco de teléfono: radio `--radius-device`, borde 1px `line-control`,
fondo `surface-2`, proporción 9:19.5, ancho máximo 320px, placa roja de
nivel 3. Dentro: carrusel con `scroll-snap` nativo, puntos de posición
(botones reales de 44px de área), sin avance automático.
Video: `controls`, `preload="none"`, póster, sin autoplay.
**Estado PENDIENTE:** sin capturas, el marco no se renderiza y su lugar lo
ocupa "Six Strings".

**Six Strings**
Panel con 6 cuerdas (líneas SVG, grosor 1 → 3.5px de E4 a E2, color
`line-control` en reposo, `signal` al vibrar). Cada cuerda es un
`<button>` con área de 44px de alto y nombre accesible ("Low E string,
82.41 hertz"). Lector: nota en display `--text-figure` + frecuencia en
mono, en una región `role="status"`. Rótulo fijo: "Standard tuning.
Interactive illustration."

**Fila de skill**
Rejilla de 2 columnas en ≥600px: chip de skill → evidencia (enlace CTA
con destino real: repo, sección o case study). En móvil se apilan con
4px de separación. Entre ambos, en ≥600px, una cuerda horizontal de 1px.
Sin evidencia confirmada, la skill no se publica.

**Lista de datos**
`dl` de etiqueta/valor. Variante técnica (Fretmaid, case study): etiqueta
mono `--text-micro` mayúsculas. Variante editorial (About): Archivo
`--text-meta`.

**Fila de canal** (Contact)
Enlace de 56px de alto a todo el ancho: etiqueta `--text-micro` · valor
`--text-lead` · flecha 20px a la derecha. Borde inferior 1.5px negro.
Presionado: inversión.

### 5.4 Hero

**Móvil (<600px)**

```
[EC]                              [Menu]     header 60px
EMILIO                                       --text-hero, ancho 62%
CARPIO                                       placa roja
Frontend Developer                           --text-subhead, peso 800
React · TypeScript & Full-Stack Developer    mono --text-meta
<frase propia, 1–2 líneas>                   PENDIENTE (oculta si falta)
● Open to work · Mexico · 2026               una fila, --text-meta
[ See Fretmaid            → ]                primario, 100% de ancho
  Contact                                    enlace CTA
──────────────  cuerda divisoria
FRETMAID asoma                               ≥64px visibles a 390×720
```

- Altura objetivo: ≤ 70svh para que Fretmaid asome.
- El punto de "Open to work" es rojo fijo de 8px + el texto (no depende del color).

**Escritorio (≥1024px)**

- Fila 1: nombre a 12 columnas, `min(--text-hero, 25svh)`.
- Fila 2: rol + línea mono en columnas 1–7; frase, datos y CTAs en 9–12.
- El hero completo cabe en la primera pantalla desde 1024×640.

### 5.5 Navegación

- Header pegajoso de 60px + padding. Borde inferior `line` solo cuando
  `scrollY > 0`.
- Enlaces de nav: `--text-meta`, `text-muted`; actual = `text` + subrayado
  rojo 2px + `aria-current`.
- Botón de menú móvil: texto "Menu"/"Close" + icono de dos líneas, 44px,
  `aria-expanded`. Panel a pantalla completa (`100dvh`), enlaces en
  `--text-section`, padding inferior con `env(safe-area-inset-bottom)`.
- Rutas: `/` y `/projects/fretmaid/`. Enlaces profundos y botón atrás
  funcionan igual que hoy.

### 5.6 Iconos

SVG en línea, trazo 1.5px, 20×20, `currentColor`, `aria-hidden="true"`
cuando acompañan texto. Conjunto cerrado: flecha derecha, flecha
arriba-derecha (externo), copiar, check, menú, cerrar. Sin emoji.

---

## 6. Estados (matriz)

| Estado | Tratamiento | Aplica a |
|---|---|---|
| Reposo | Según componente | Todo |
| Hover | Solo dentro de `@media (hover: hover)` | Botones, enlaces, chips interactivos, cuerdas |
| Foco visible | Contorno 2px `signal`, offset 3px. Sobre rojo: contorno negro | Todo control |
| Presionado | Botón primario: placa a 0. Resto: escala 0.98 o inversión sobre rojo | Todo control |
| Actual | `text` + subrayado rojo + `aria-current` | Nav, breadcrumb, punto de galería |
| Deshabilitado | `text-muted`, sin placa, `aria-disabled="true"`, cursor por defecto | Botones |
| Cargando media | Ranura con tamaño reservado y fondo `surface-2`. Sin shimmer | Imágenes, video |
| Vacío / PENDIENTE | El componente **no se renderiza** | Métricas, media, frase del hero, foto |
| Éxito | Etiqueta del botón cambia a "Copied" + check, 2s; anunciado con `role="status"` | Copiar correo |
| Error | Texto visible y persistente junto al botón: "Couldn't copy. Select the address instead." | Copiar correo |
| Sin JS / sin soporte | Contenido completo y estático; las cuerdas quedan como líneas | Todo |
| Movimiento reducido | Estado final sin animación; interacciones conservan cambio de color | Todo |
| Colores forzados | Sin grano, sin placas; bordes y contornos del sistema | Todo |

---

## 7. Tokens de movimiento (se detallan en Fase 3)

```css
--duration-press: 120ms;
--duration-fast: 160ms;
--duration-base: 280ms;
--duration-slow: 700ms;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-in: cubic-bezier(0.5, 0, 0.75, 0);
```

La nueva animación de Skills (que sustituye a las burbujas) queda
definida así a nivel de sistema, y se especifica con curvas en la Fase 3:

- **"Signal path":** cada fila de skill está unida a su evidencia por una
  cuerda. Al entrar la sección, la señal recorre cada cuerda de izquierda a
  derecha (la línea se dibuja en rojo y se asienta en `line-control`),
  fila por fila. Una sola vez.
- Al enfocar, pasar o tocar un chip, su cuerda se pulsa (vibración
  amortiguada) y la evidencia se subraya.
- Sin movimiento perpetuo. No necesita botón de pausa.

---

## 8. Anti-patrones (no entran)

- Gradientes, glassmorphism, sombras difusas, brillos de neón.
- Segundo color de acento. Azul de enlace por defecto.
- Radios de 8–16px en tarjetas y botones.
- Emoji como iconos.
- Animación infinita decorativa (regla UX #12).
- Parallax y scroll secuestrado (regla UX #99).
- Carrusel con avance automático (regla UX #108).
- Video con autoplay (regla UX #96).
- Barras de porcentaje de skills.
- Ranuras vacías o con datos estimados.

---

## 9. Reglas UX de la base, convertidas en restricciones

| # | Regla | Restricción en este sistema |
|---|---|---|
| 36, 76 | Contraste 4.5:1 | Tabla §1.1; texto claro sobre rojo prohibido |
| 28, 100 | Foco visible y no tapado | Contorno 2px; `scroll-padding-top` = alto del header |
| 22, 23, 66 | Objetivo táctil y separación | `--hit` 44px, 8px entre objetivos |
| 11, 29, 30 | Hover no es táctil; estado presionado | Hover solo con `hover: hover`; presionado en todo control |
| 9, 99 | Movimiento reducido | Todo movimiento dentro de `no-preference` |
| 12 | Sin animación continua | Burbujas retiradas |
| 20 | `100vh` en móvil | `svh` / `dvh` |
| 15, 18 | Escala de z-index | §3, seis capas con nombre |
| 67, 73 | 16px mínimo, 65–75 caracteres | `--text-body` ≥16px, medida 60–65ch |
| 47, 75 | Carga diferida y sin salto de layout | Tamaños reservados; fuentes con métricas de respaldo |
| 116, 117 | Chips: una línea; si son interactivos, control nativo | §5.2 |
| 96, 108 | Sin autoplay ni auto-rotación | §5.3 Escenario de media |
