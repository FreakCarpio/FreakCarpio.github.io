// Floating "bubbles" for the Skills lists.
//
// Each technology drifts with its own heading, bounces off the edges,
// pushes other bubbles away when they touch and moves away from the mouse.
// Hovering a bubble stops it (CSS grows it and lights its border).
// The first time Skills comes into view, bubbles appear in a staggered
// sequence, like a signal lighting up the matrix.
//
// Accessibility and performance:
// - Enhancement only: without JS or with prefers-reduced-motion the static
//   grid stays. DOM order is untouched, so reading order never changes.
// - Continuous motion longer than 5 s needs a pause control (WCAG 2.2.2):
//   the "Pause motion" button.
// - The loop runs only while the section is on screen, and only moves
//   elements with transform (no layout work per frame).

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const BASE_SPEED = 16;          // px per second
const WANDER = 1.8;             // how quickly each heading drifts (rad/s)
const STEER = 1.2;              // how quickly velocity follows the heading
const MAX_SPEED_FACTOR = 6;     // cap after pushes, relative to BASE_SPEED
const POINTER_RADIUS = 140;     // px around the mouse that pushes bubbles
const POINTER_FORCE = 900;      // px/s² right at the pointer
const GAP = 8;                  // minimum space between bubbles, px
const AREA_FACTOR = 3;          // field area relative to the bubbles' area
const MIN_HEIGHT_REM = 12;
const MAX_DT = 1 / 30;          // clamp long frames (tab switches, jank)
const ENTRANCE_STAGGER_MS = 45;
const ENTRANCE_DURATION_MS = 600;

export function initSkillBubbles() {
    const section = document.querySelector('[data-js="skills"]');
    const control = document.querySelector('[data-js="bubbles-control"]');
    const toggle = document.querySelector('[data-js="bubbles-toggle"]');
    const lists = section ? [...section.querySelectorAll('[data-js="bubble-field"]')] : [];

    if (!section || !control || !toggle || lists.length === 0) return;

    const reducedMotion = window.matchMedia(REDUCED_MOTION);

    if (reducedMotion.matches) return;

    // Bubble sizes depend on the web fonts, so measure after they load
    document.fonts.ready.then(() => {
        const fields = lists.map(createField);

        let pausedByUser = false;
        let inView = false;
        let running = false;
        let entered = false;
        let frame = 0;
        let lastTime = 0;

        function loop(time) {
            const dt = Math.min(Math.max((time - lastTime) / 1000, 0), MAX_DT);
            lastTime = time;

            fields.forEach((field) => stepField(field, dt));

            frame = window.requestAnimationFrame(loop);
        }

        function start() {
            if (running || pausedByUser || !inView) return;

            running = true;
            lastTime = performance.now();
            frame = window.requestAnimationFrame(loop);
        }

        function stop() {
            running = false;
            window.cancelAnimationFrame(frame);
        }

        function setPaused(paused) {
            pausedByUser = paused;
            toggle.textContent = paused ? 'Resume motion' : 'Pause motion';

            if (paused) stop();
            else start();
        }

        control.hidden = false;
        toggle.addEventListener('click', () => setPaused(!pausedByUser));

        // Run only while Skills is on screen; play the entrance once
        new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;

            if (inView && !entered) {
                entered = true;
                playEntrance(fields);
            }

            if (inView) start();
            else stop();
        }).observe(section);

        // Turning on reduced motion while the page is open stops the motion
        reducedMotion.addEventListener('change', (event) => {
            if (event.matches) setPaused(true);
        });
    });
}

function createField(list) {
    const items = [...list.children].map((li) => {
        const bubble = document.createElement('span');
        bubble.className = 'bubble';
        bubble.append(...li.childNodes);
        li.append(bubble);

        return {
            li,
            bubble,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            w: 0,
            h: 0,
            heading: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 0.8,
            hovered: false,
        };
    });

    const field = { list, items, width: 0, height: 0, pointer: null };

    list.dataset.bubblesReady = '';

    measure(field);
    scatter(field);
    settle(field);
    render(field);

    // Re-measure whenever the field or any bubble changes size: viewport
    // changes, zoom, and the web font finishing loading after first measure
    const remeasure = () => {
        measure(field);
        items.forEach((item) => keepInside(item, field));
        render(field);
    };

    const resizeObserver = new ResizeObserver(remeasure);

    resizeObserver.observe(list);
    items.forEach((item) => resizeObserver.observe(item.bubble));

    // Font swaps also change bubble widths; listen directly as a safety net
    document.fonts.addEventListener('loadingdone', remeasure);

    list.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;

        const rect = list.getBoundingClientRect();
        field.pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    });

    list.addEventListener('pointerleave', () => {
        field.pointer = null;
    });

    items.forEach((item) => {
        item.li.addEventListener('pointerenter', (event) => {
            if (event.pointerType === 'mouse') item.hovered = true;
        });

        item.li.addEventListener('pointerleave', () => {
            item.hovered = false;
        });
    });

    return field;
}

// The field grows with the total size of its bubbles, so dense lists
// get more room and narrow screens get a taller field
function measure(field) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let area = 0;

    field.width = field.list.clientWidth;

    field.items.forEach((item) => {
        item.w = item.bubble.offsetWidth;
        item.h = item.bubble.offsetHeight;
        area += item.w * item.h;
    });

    field.height = Math.max(
        MIN_HEIGHT_REM * rootFontSize,
        Math.ceil((area * AREA_FACTOR) / Math.max(field.width, 1))
    );

    field.list.style.blockSize = `${field.height}px`;
}

// Random starting positions, retrying a few times to avoid overlaps
function scatter(field) {
    field.items.forEach((item, index) => {
        const placed = field.items.slice(0, index);

        for (let attempt = 0; attempt < 40; attempt++) {
            item.x = Math.random() * Math.max(0, field.width - item.w);
            item.y = Math.random() * Math.max(0, field.height - item.h);

            if (!placed.some((other) => overlap(item, other))) break;
        }
    });
}

// Resolve any overlaps left by scatter before the first paint, so bubbles
// never start stacked (important if motion is paused right away)
function settle(field) {
    for (let pass = 0; pass < 60; pass++) {
        separate(field.items);
        field.items.forEach((item) => keepInside(item, field));
    }

    field.items.forEach((item) => {
        item.vx = 0;
        item.vy = 0;
    });
}

function stepField(field, dt) {
    const { items, pointer } = field;

    // Cheap guard (transform writes don't invalidate layout): if the field
    // width changed without a resize callback yet, e.g. a scrollbar
    // appearing, re-measure before moving anything
    if (field.list.clientWidth !== field.width) measure(field);

    items.forEach((item) => {
        if (item.hovered) {
            item.vx *= 0.8;
            item.vy *= 0.8;
            return;
        }

        // Wander: the heading drifts slowly, velocity eases toward it
        item.heading += (Math.random() - 0.5) * WANDER * dt;

        const target = BASE_SPEED * item.speed;
        item.vx += (Math.cos(item.heading) * target - item.vx) * STEER * dt;
        item.vy += (Math.sin(item.heading) * target - item.vy) * STEER * dt;

        // Move away from the mouse
        if (pointer) {
            const dx = item.x + item.w / 2 - pointer.x;
            const dy = item.y + item.h / 2 - pointer.y;
            const distance = Math.hypot(dx, dy) || 1;

            if (distance < POINTER_RADIUS) {
                const push = (1 - distance / POINTER_RADIUS) * POINTER_FORCE * dt;
                item.vx += (dx / distance) * push;
                item.vy += (dy / distance) * push;
            }
        }

        const speed = Math.hypot(item.vx, item.vy);
        const maxSpeed = BASE_SPEED * MAX_SPEED_FACTOR;

        if (speed > maxSpeed) {
            item.vx *= maxSpeed / speed;
            item.vy *= maxSpeed / speed;
        }

        item.x += item.vx * dt;
        item.y += item.vy * dt;
    });

    separate(items);
    items.forEach((item) => keepInside(item, field));
    render(field);
}

// Push overlapping bubbles apart along the axis that overlaps least,
// swapping their velocity on that axis like a soft collision
function separate(items) {
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            const a = items[i];
            const b = items[j];

            const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + GAP;
            const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + GAP;

            if (overlapX <= 0 || overlapY <= 0) continue;

            if (overlapX < overlapY) {
                const shift = ((a.x < b.x ? -1 : 1) * overlapX) / 2;
                a.x += shift;
                b.x -= shift;
                [a.vx, b.vx] = [b.vx, a.vx];
            } else {
                const shift = ((a.y < b.y ? -1 : 1) * overlapY) / 2;
                a.y += shift;
                b.y -= shift;
                [a.vy, b.vy] = [b.vy, a.vy];
            }
        }
    }
}

// Bounce off the edges and turn the heading back inside
function keepInside(item, field) {
    const maxX = Math.max(0, field.width - item.w);
    const maxY = Math.max(0, field.height - item.h);

    if (item.x < 0 || item.x > maxX) {
        item.x = Math.min(Math.max(item.x, 0), maxX);
        item.vx = -item.vx;
        item.heading = Math.PI - item.heading;
    }

    if (item.y < 0 || item.y > maxY) {
        item.y = Math.min(Math.max(item.y, 0), maxY);
        item.vy = -item.vy;
        item.heading = -item.heading;
    }
}

function render(field) {
    field.items.forEach((item) => {
        item.li.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0)`;
    });
}

function playEntrance(fields) {
    let index = 0;

    fields.forEach((field) => {
        field.items.forEach((item) => {
            item.bubble.animate(
                [
                    { opacity: 0, transform: 'scale(0.4)' },
                    { opacity: 1, transform: 'scale(1)' },
                ],
                {
                    duration: ENTRANCE_DURATION_MS,
                    delay: index * ENTRANCE_STAGGER_MS,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    fill: 'backwards',
                }
            );

            index++;
        });
    });
}

function overlap(a, b) {
    return a.x < b.x + b.w + GAP
        && a.x + a.w + GAP > b.x
        && a.y < b.y + b.h + GAP
        && a.y + a.h + GAP > b.y;
}
