// Entry point. Loaded with type="module": deferred, strict mode, no globals.
// Each module finds its own elements via [data-js] hooks and exits
// quietly when they aren't on the page, so this file serves every page.

import { initMobileNav } from './modules/mobile-nav.js';
import { initActiveNav } from './modules/active-nav.js';
import { initCopyEmail } from './modules/copy-email.js';
import { initHeaderVisibility } from './modules/header-visibility.js';
import { initSkillBubbles } from './modules/skill-bubbles.js';

initMobileNav();
initActiveNav();
initCopyEmail();
initHeaderVisibility();
initSkillBubbles();
