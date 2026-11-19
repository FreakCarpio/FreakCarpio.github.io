# Especificación de movimiento — "Two-Ink, Live"

Fase 3 de 5 · Skill: **emil-ui-skills** (sub-skills `animate`, `choreograph`,
`mobile-native`, `break-ui`) · Fecha: 2026-11-10
Entradas: `fable-ui-strategy.md`, `design-system.md` (aprobadas).
Estado: **pendiente de aprobación**. Sin cambios de código.

---

## 0. Correcciones que impone la skill

Las reglas de `animate` y `choreograph` contradicen cuatro cosas que yo
había propuesto. Las corrijo aquí; este documento manda sobre los dos anteriores.

| Antes (Fase 1/2) | Regla de la skill | Ahora |
|---|---|---|
| Token `--ease-in` para salidas | "Never `ease-in` on UI" | **Eliminado.** Las salidas usan `--ease-out`, más cortas |
| `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` | "No approximated values": curvas de su tabla | `cubic-bezier(0.77, 0, 0.175, 1)` |
| Enlaces del menú móvil entran escalonados | "One entrance per container" | El telón entra; los enlaces ya están ahí |
| Hover dentro de `(hover: hover)` | Faltaba `(pointer: fine)` | `@media (hover: hover) and (pointer: fine)` |

Se conserva `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, que ya existe en
el código ("extend the codebase's tokens, don't fork them"); es
prácticamente la curva de la skill (`0.23, 1, 0.32, 1`).

---

## 1. Tokens

```css
--duration-press: 120ms;   /* 100–160ms: respuesta al presionar */
--duration-fast: 160ms;    /* hover, color, subrayado */
--duration-base: 240ms;    /* menú, indicador de nav, transición de página */
--duration-reveal: 600ms;  /* revelado por scroll, una vez (superficie de marketing) */
--duration-hero: 700ms;    /* entrada del hero, una vez por visita */

--ease-out: cubic-bezier(0.22, 1, 0.36, 1);     /* todo lo que entra o sale */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* lo que se mueve en pantalla */
/* color y hover: ease · progreso ligado al scroll: linear */
```

`--duration-base` baja de 280 a 240ms: la UI se queda por debajo de 300ms.
Solo las dos entradas de "marketing" (hero y revelados) duran más, porque
se ven una vez por visita.

**Herramienta:** CSS primero (transiciones, `@starting-style`, animaciones
ligadas al scroll). Web Animations API solo para las cuerdas. View
Transitions API para el cambio de ruta. **No se instala librería de
movimiento**: ningún caso necesita layout animado, salidas con estado ni
gestos con velocidad.

---

## 2. Inventario y filtro

Cada movimiento pasa por la compuerta de `animate`: frecuencia y propósito.

| # | Movimiento | Frecuencia | Propósito | ¿Entra? |
|---|---|---|---|---|
| 1 | Presionar botón / chip / fila | Decenas por visita | Feedback | Sí, 120ms |
| 2 | Hover de botón y enlace | Decenas | Feedback | Sí, 160ms, casi imperceptible |
| 3 | Indicador de sección activa en la nav | Ocasional | Indicar estado | Sí |
| 4 | Header ocultar/mostrar | Decenas | Evitar un cambio brusco | Sí |
| 5 | Menú móvil | Ocasional | Consistencia espacial | Sí |
| 6 | Cambio de ruta home ↔ case study | Ocasional | Consistencia espacial | Sí |
| 7 | Entrada del hero | Una vez | Deleite | Sí |
| 8 | Six Strings | Rara | Explicación + deleite | Sí |
| 9 | Signal path (Skills) | Una vez | Explicación | Sí |
| 10 | Título Skills se llena de tinta | Una vez | Deleite | Sí |
| 11 | Frase de About por líneas | Una vez | Deleite | Sí |
| 12 | Telón rojo de Contact | Una vez | Deleite | Sí |
| 13 | Cadena de señal del case study | Ligado al scroll | Explicación | Sí |
| 14 | Placa de "Fretmaid" al registro | Ligado al scroll | Deleite | Sí (ya existe) |
| 15 | "Copied" en copiar correo | Rara | Feedback | Sí |
| 16 | Puntos de la galería | Decenas | Indicar estado | Solo color, 160ms |
| — | Cuerdas divisorias entre secciones | — | No se puede nombrar un propósito | **Fuera** |
| — | Escalonado de enlaces del menú | — | Segunda entrada en el mismo contenedor | **Fuera** |
| — | Párrafos, listas de datos, chips de stack, footer | — | Texto que se lee no se mueve | **Fuera** |
| — | Escalonado de tarjetas de features | — | Ya hay un momento firma en esa página | **Fuera** |
| — | Burbujas flotantes | — | Movimiento continuo sin información | **Fuera** |

Cambio respecto a la estrategia: las **cuerdas divisorias que se pulsan
entre secciones se eliminan**. Serían cinco animaciones sin propósito
nombrable. La cuerda queda reservada a Six Strings y a Signal path, donde
significa algo.

---

## 3. Especificación por componente

Formato: propiedades · curva · duración · entrada · interrupción · salida.

### 3.1 Presionar (todo control)

- `transform: scale(0.97)` en `:active`; el botón primario además lleva la
  placa de 3px a 0 (`box-shadow` + `translate(3px, 3px)`).
- `transition: transform 120ms var(--ease-out), box-shadow 120ms var(--ease-out)`.
- Responde al bajar el dedo, no al soltar (`:active`, sin JS).
- Interrupción: es una transición, se invierte desde donde esté.
- Movimiento reducido: sin escala; se conserva el cambio de placa/color.

### 3.2 Hover (solo `hover: hover` y `pointer: fine`)

| Elemento | Cambio | Timing |
|---|---|---|
| Botón primario | Placa 3 → 6px, botón `translate(-3px, -3px)` | 160ms `--ease-out` |
| Botón secundario | `border-color` a `text` | 160ms `ease` |
| Enlace CTA | Grosor del subrayado 2 → 4px | 160ms `ease` |
| Chip interactivo | `border-color` a `signal` | 160ms `ease` |
| Cuerda | Color a `signal` (el pulso es al hacer clic/tocar, no en hover) | 160ms `ease` |

### 3.3 Indicador de sección activa (nav de escritorio)

- Un único subrayado rojo de 2px, posicionado bajo el enlace actual.
- `transform: translateX() scaleX()` con `transform-origin: left`.
- 240ms `--ease-in-out` (se mueve estando en pantalla).
- Interrupción: transición; si el scroll cruza dos secciones rápido, se
  redirige desde la posición actual sin reiniciar.
- Primera aparición: sin animación (aparece ya colocado).
- Movimiento reducido: salta sin transición.

### 3.4 Header

- Oculto: `transform: translateY(-100%)`. 240ms `--ease-out` en ambos sentidos.
- No se oculta: cerca del inicio, con el menú abierto, con foco dentro.
- Borde inferior `line`: `opacity` 0 → 1 en 160ms cuando `scrollY > 0`.
- Interrupción: transición; cambiar de dirección de scroll a medio camino
  lo invierte desde donde está.
- Movimiento reducido: el header no se oculta; queda fijo.

### 3.5 Menú móvil (telón)

- Contenedor: `clip-path: inset(0 0 100% 0)` → `inset(0)`, más `opacity` 0 → 1.
- Abrir: 240ms `--ease-out`. Cerrar: 160ms `--ease-out`, por el mismo
  camino (sube por donde bajó).
- Los enlaces **no** tienen entrada propia.
- Icono Menu/Close: dos líneas que giran ±45° en 160ms `--ease-out`.
- Interrupción: transición con `@starting-style` + `display allow-discrete`;
  tocar el botón a medio abrir lo cierra desde el punto actual.
- Interacción: los enlaces son tocables desde el primer frame visible.
- Movimiento reducido: solo `opacity`, 160ms.

### 3.6 Cambio de ruta (View Transitions)

React Router con `viewTransition`; el título "Fretmaid" comparte
`view-transition-name` entre la tarjeta y el case study.

| Elemento | Rol | Empieza | Duración | Movimiento |
|---|---|---|---|---|
| Título "Fretmaid" | Protagonista | 0ms | 240ms `--ease-in-out` | Morph de posición y tamaño |
| Página saliente | Apoyo | 0ms | 120ms `--ease-out` | Solo `opacity` → 0 |
| Página entrante | Apoyo | 80ms | 200ms `--ease-out` | Solo `opacity` 0 → 1 |
| Header | Estático | — | — | No participa (nombre propio) |

- Atrás/adelante del navegador usa la misma transición.
- Sin soporte de la API: navegación instantánea.
- Interrupción: una navegación nueva cancela la transición en curso (lo
  hace la API con `skipTransition`).
- Movimiento reducido: sin transición.

### 3.7 Entrada del hero (una vez por carga)

| Elemento | Rol | Empieza | Duración | Movimiento |
|---|---|---|---|---|
| Placa roja de "Emilio" y "Carpio" | Decoración | 0ms | 700ms | `opacity` 0 → 1 + de `translate(0.2em, 0.12em)` a registro |
| "Emilio" | Protagonista | 80ms | 600ms | Barrido `clip-path` de izquierda a derecha |
| "Carpio" | Protagonista | 160ms | 600ms | Igual |
| "Frontend Developer" | Apoyo | 300ms | 400ms | `opacity` + `translateY(8px)` |
| Línea mono, estado, CTAs | Apoyo | 380ms | 300ms | Solo `opacity`, todos juntos |
| Header, grano | Estático | — | — | — |

- Todo con `--ease-out` y `animation-fill-mode: backwards`.
- Fin total: **760ms** (antes ~1,180ms).
- Retardos no uniformes (80 / 80 / 140 / 80) y tratamiento decreciente:
  el protagonista barre, el apoyo sube 8px, el resto solo aparece.
- **No bloquea:** los CTAs son tocables desde el frame 0 (la animación es
  `opacity`, no `visibility` ni `pointer-events`).
- No se repite al volver con el botón atrás (bandera en `sessionStorage`).
- Movimiento reducido: todo aparece junto con un fundido de 200ms.

### 3.8 Six Strings (momento firma de Fretmaid)

**Pulso de una cuerda**

- Cada cuerda es un `<path>` SVG con forma de medio seno y
  `vector-effect: non-scaling-stroke`. Solo se anima `transform: scaleY()`.
- En reposo `scaleY(0)` (línea recta). Al pulsar, oscilación amortiguada:
  `scaleY = A · e^(−6t) · cos(2π · f · t)`, con `t` de 0 a 1.
- Duración 520ms. Amplitud `A` y ciclos `f` por cuerda: la grave (E2) se
  mueve más y más lento (A = 1, f = 4); la aguda (E4) menos y más rápido
  (A = 0.5, f = 7).
- Implementación: fotogramas clave generados con esa fórmula y
  reproducidos con `element.animate()`, `easing: linear`.
- Color: `signal` al instante en el pulso; vuelve a `line-control` en
  400ms `ease` al terminar.
- Lector de nota: cambia de texto **sin animación** (es un dato que se lee).

> Desviación declarada: la skill limita el rebote de los resortes a
> 0.1–0.3 para UI. Una cuerda necesita más oscilaciones. Es una
> ilustración de nivel "raro / explicación", no un control frecuente, así
> que la mantengo y la marco para revisión de sensación (§7).

**Cascada de entrada** (una vez, al entrar el panel 30% en pantalla)

| Cuerda | Empieza | Amplitud relativa |
|---|---|---|
| E2 | 0ms | 100% |
| A2 | 45ms | 90% |
| D3 | 85ms | 80% |
| G3 | 120ms | 70% |
| B3 | 150ms | 60% |
| E4 | 175ms | 50% |

Retardos decrecientes (45, 40, 35, 30, 25) para que se lea como un rasgueo
y no como un metrónomo. Fin total ≈ 700ms.

- Interrupción: pulsar una cuerda que aún vibra cancela su animación y
  arranca una nueva (re-pulsar una cuerda la reinicia también en la
  realidad). Pulsar durante la cascada solo afecta a esa cuerda.
- Las cuerdas son tocables desde el primer frame.
- Movimiento reducido: sin oscilación; la cuerda cambia a rojo 400ms y
  vuelve. El lector funciona igual.
- Fuera de pantalla o pestaña oculta: no hay nada corriendo (no hay bucle).

### 3.9 Signal path (Skills, sustituye a las burbujas)

**Entrada** (una vez, al entrar la lista 25% en pantalla)

| Elemento | Rol | Empieza | Duración | Movimiento |
|---|---|---|---|---|
| Chips y evidencias | Estático | — | — | Ya visibles; no se mueven |
| Cuerda de la fila 1 | Protagonista | 0ms | 500ms `--ease-in-out` | Se dibuja de izquierda a derecha (`scaleX` 0 → 1, origen izquierdo) en rojo |
| Cuerdas 2–5 | Apoyo | +60, +110, +150, +180ms | 450ms | Igual |
| Cuerdas 6 en adelante | Apoyo | +200ms (todas juntas) | 400ms | Igual |
| Color de cada cuerda | — | Al terminar su trazo | 400ms `ease` | Rojo → `line-control` |

- El texto nunca espera a la animación: la lista es legible y enlazable
  desde el primer frame.
- En móvil (<600px) no hay cuerda horizontal (los elementos se apilan):
  la entrada se reduce a un borde izquierdo rojo de 2px que se dibuja de
  arriba abajo por grupo, 500ms, una vez.

**Interacción** (foco, hover fino o toque sobre un chip)

- La cuerda de esa fila se pulsa (mismo pulso de §3.8, A = 0.6, 400ms).
- El subrayado de su evidencia pasa a 4px (160ms `ease`).
- Interrupción: igual que §3.8.
- Movimiento reducido: sin trazo ni pulso; solo el subrayado.

### 3.10 Título "Skills" se llena de tinta

- Dos capas del mismo texto: contorno (visible siempre) y relleno
  (`clip-path: inset(0 100% 0 0)` → `inset(0)`).
- Ligado al scroll: `animation-timeline: view()`, rango
  `entry 20%` → `cover 40%`, `linear`. Reversible, sin duración propia.
- Sin soporte: queda en contorno (estado actual del sitio).
- Movimiento reducido: contorno fijo.
- El relleno es contenido generado; el texto existe una sola vez en el DOM.

### 3.11 Frase destacada de About

- 2–3 líneas, cada una en su máscara: `translateY(100%)` → `0`.
- 500ms `--ease-out` por línea; retardos 0 / 70 / 120ms.
- Una vez, al entrar 40% en pantalla.
- El párrafo y los datos no se animan.
- Movimiento reducido: fundido único de 200ms.

### 3.12 Telón de Contact

- La sección roja: `clip-path: inset(100% 0 0 0)` → `inset(0)`.
- 600ms `--ease-in-out`, una vez, al entrar 15% en pantalla (receta
  "scroll reveal" de la skill).
- Su contenido no tiene entrada propia (una entrada por contenedor).
- Enlaces tocables desde el primer frame.
- Movimiento reducido: sin telón.

### 3.13 Cadena de señal (case study)

- Línea vertical roja en el riel de números: `scaleY` 0 → 1, origen arriba.
- Ligada al scroll: `animation-timeline: view()` sobre la lista, rango
  `entry 60%` → `exit 40%`, `linear`. Reversible.
- Cada número pasa de `text-muted` a `signal` cuando la línea lo alcanza
  (misma línea de tiempo, rangos por elemento).
- Sin soporte: primera y última etapa en rojo (estado actual).
- Movimiento reducido: igual que sin soporte.

### 3.14 Placa de "Fretmaid"

Se conserva la animación existente (placa que entra en registro con el
scroll, rango `entry 0%` → `cover 45%`). Sin cambios.

### 3.15 Copiar correo

- Al copiar: la etiqueta "Copy email" sale hacia arriba y "Copied" entra
  desde abajo dentro de la misma caja: `translateY` ±100% + `opacity`,
  160ms `--ease-out`, las dos a la vez (cruce, no cola).
- El ancho del botón se reserva para la etiqueta más larga: sin salto de layout.
- A los 2s vuelve por el mismo camino.
- Interrupción: son transiciones; un segundo clic durante el cruce
  reinicia el temporizador de 2s, no la animación.
- Anuncio: `role="status"` con "Email address copied".
- Error: texto persistente, sin animación.
- Movimiento reducido: cambio de texto instantáneo.

### 3.16 Galería de capturas

- Desplazamiento nativo con `scroll-snap-type: x mandatory`. Sin JS de gestos.
- Puntos: solo `background-color`, 160ms `ease`.
- Clic en un punto: `scrollIntoView({ behavior: 'smooth' })`; con
  movimiento reducido, `'auto'`.

---

## 4. Lo que deliberadamente no se mueve

- **Párrafos, listas de datos, chips de stack:** se leen; no se animan.
- **Enlaces del menú móvil:** el telón los trae.
- **Contenido del bloque de Contact:** el telón lo trae.
- **Tarjetas de features del case study:** la cadena de señal ya es el
  momento de esa página.
- **Divisores entre secciones:** sin propósito nombrable.
- **Lector de nota de Six Strings:** es un dato; cambia en seco.

---

## 5. Revisión mobile-native

Revisado sobre el sitio publicado. Lo que marca "sí" se verificó en el
navegador; nada de esto sustituye la prueba en un teléfono real.

| Tema | Estado actual | Acción en Fase 4 |
|---|---|---|
| Hover pegado tras tocar | Usa `(hover: hover)` sin `(pointer: fine)` | Todas las reglas `:hover` dentro de `(hover: hover) and (pointer: fine)` |
| Destello gris al tocar | Verificado: `-webkit-tap-highlight-color` es el valor por defecto | `transparent` en `html` + estado `:active` en todo control |
| `100vh` real | Hero usa `svh` con respaldo `vh`: correcto | Hero en `svh`; menú a pantalla completa en `100dvh` |
| Zoom al enfocar inputs | El sitio no tiene inputs | Regla preventiva en el reset: `input, textarea, select { font-size: 16px }`. Nunca `maximum-scale` |
| Toque con retraso | Sin `touch-action` | `touch-action: manipulation` en `a, button`; feedback en `:active` |
| Pull-to-refresh | Sitio de documento: es bienvenido | No se toca en `html`. `overscroll-behavior: contain` en el menú abierto |
| Notch y barra de inicio | Verificado: viewport sin `viewport-fit=cover` | Añadir `viewport-fit=cover`; `env(safe-area-inset-top)` en header, `-bottom` en menú y footer, `-left/-right` sumados al gutter (horizontal) |
| Selección de texto al mantener presionado | Sin regla | `user-select: none` solo en botones y cuerdas. **El correo y el teléfono siguen seleccionables** |
| Galería horizontal | No existe aún | `scroll-snap` nativo; sin `touch-action` a mano |
| Color de la barra de estado | `theme-color` `#0b0a09`, fondo `#0a0a0a` | `#0a0a0a`. Un solo valor: el sitio solo tiene tema oscuro |
| Inflado de texto en horizontal | Sin regla | `-webkit-text-size-adjust: 100%` |
| Objetivos táctiles | Verificado a 320px: logo "EC" mide 24×32px; skip link 37px de alto | Logo con área de 44×44px; skip link a 44px |

**Requiere teléfono real (no lo puedo verificar yo):** hover pegado,
destello al tocar, comportamiento de la barra de URL con `svh`/`dvh`,
insets del notch, retraso de toque, sensación del pulso de las cuerdas y
del scroll-snap. Probar también una vez en horizontal.

---

## 6. break-ui: textos largos y pantallas chicas

**Método.** Sobre el sitio publicado, a 320px y 280px de ancho, sustituí
el contenido por peores casos plausibles y medí desbordes en el
navegador. Como el sitio es HTML estático, el "dato" es el propio texto.
El conmutador "Demo data / Worst case" que pide la skill no existe
todavía: se construye en la Fase 4 (`?data=worst`, solo en desarrollo)
junto con los componentes de React.

Valores usados:

| Campo | Peor caso |
|---|---|
| Rol del hero | "Frontend Developer React · TypeScript & Full-Stack Developer" (el texto aprobado, en una sola pieza) |
| Frase del hero | Dos oraciones, 160 caracteres |
| Título de proyecto | "Dulcería La Esperanza" (un segundo proyecto real posible) |
| Descripción de proyecto | 250 caracteres |
| Valor de dato | "Android app (Kotlin), FastAPI backend, real-time audio pipeline, progress dashboard" |
| Etiqueta de dato | "Responsibilities" |
| Stack | 9 chips, uno de 44 caracteres sin espacios |
| Detalle de etapa | "Android app, Kotlin, AudioRecord 44,100 Hz mono PCM 16-bit, 2,048-sample frames" |
| Título de feature | "Benachrichtigungseinstellungen recognition" |

### Parte 1 — Qué se rompió

| # | Severidad | Campo | Valor | Qué pasa | Arreglo |
|---|---|---|---|---|---|
| 1 | Roto | Título del case study | "Dulcería La Esperanza" | "ESPERANZA" se corta y la página gana scroll horizontal (433px de contenido en 305px) | Título con tamaño por contenedor (`cqi`) y `overflow-wrap: anywhere`; nunca `nowrap` |
| 2 | Roto | Título de la tarjeta (`.headliner`) | "Dulcería La Esperanza" | `white-space: nowrap` + `overflow-x: clip`: se lee solo "DULCERÍ" | Permitir salto de línea; tamaño ajustado al contenedor |
| 3 | Roto | Título de la tarjeta | "Fretmaid" (dato real) a 320px con barra de scroll | La "D" queda cortada | Mismo arreglo que #2 |
| 4 | Roto | Correo de Contact | El real, a 280px | Desborda 28px a la derecha y genera scroll horizontal | Tamaño mínimo menor por debajo de 320px + `overflow-wrap: anywhere` como red |
| 5 | Feo | Rol del hero | Texto aprobado en una pieza | 6 líneas a 320px; el hero mide 842px | Ya resuelto por diseño: "Frontend Developer" en display y el resto en una línea mono de 14px |
| 6 | Frágil | Logo "EC" | — | Objetivo táctil de 24×32px | Área de 44×44px |
| 7 | Frágil | Enlace "Fretmaid" en la nota de Skills | — | Enlace en línea de 18px de alto | Desaparece con el rediseño (la evidencia es un CTA de 44px) |

### Parte 2 — Decisiones para ti

1. **Títulos de proyecto largos: ¿partir en líneas o reducir tamaño?**
   Recomiendo ambas: reducir hasta un mínimo y, si aún no cabe, partir.
   Un título nunca se trunca.
2. **Ancho mínimo soportado:** recomiendo 320px como piso oficial y que a
   280px (plegables cerrados) no haya scroll horizontal aunque se vea apretado.
3. **Chips de stack: ¿cuántos mostrar?** Recomiendo máximo 6 en la tarjeta
   del home y la lista completa en el case study.

### Parte 3 — Qué aguantó

- Valores de dato largos: parten línea dentro de su columna sin desbordar.
- Etiqueta de dato "Responsibilities": cabe en la columna de 7rem.
- Descripción de 250 caracteres y frase del hero de 160: bien, con medida limitada.
- Chip de 44 caracteres sin espacios: no desborda a 320px.
- Detalle de etapa largo y título de feature en alemán: parten línea, sin desborde.
- Nombre del hero a 320px y 280px: cabe.

### Para la Fase 4

El conjunto de peor caso se guarda como fixture junto a los datos reales
y cubre además lo que hoy no existe: cero capturas, una captura, métricas
todas `null`, una sola métrica, cifra larga ("1,284.5 ms"), una sola
skill en un grupo, y 200% de zoom.

---

## 7. Revisión de sensación (no se puede juzgar desde el código)

- **Pulso de la cuerda:** si lee como cuerda o como temblor. Revisar a
  cámara lenta en el inspector de animaciones y en un teléfono.
- **Cascada de seis cuerdas:** si lee como un rasgueo o como una cola.
- **Morph del título entre rutas:** si a 240ms el cambio de tamaño se
  siente como un solo objeto.
- **Entrada del hero a 760ms:** si el rol llega antes de que termine el barrido.
- **Telón de Contact:** si 600ms estorba al llegar rápido con el enlace "Contact".
- Regla general: imaginar la visita número 50. Si estorba, se quita.
