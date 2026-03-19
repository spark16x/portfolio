/* ---------------- ELEMENTS ---------------- */

const menuBtn = document.querySelector('#menu-b');
const menu = document.querySelector('#menu');
const menuLinks = document.querySelectorAll('#menu a');
const menuVector = document.querySelector('#Vector');
const hoverTargets = document.querySelectorAll('.hT');
const loadingScreen = document.querySelector('#loading');
const customCursor = document.querySelector('#cursor');

const menuItems = ['Home', 'About', 'Skills', 'Contact'];

const mobileQuery = window.matchMedia('(max-width: 639px)');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

let menuOpen = false;
let mobileBound = false;
let cursorBound = false;

/* ---------------- GSAP SETUP ---------------- */

if (typeof gsap !== 'undefined') {
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrambleTextPlugin !== 'undefined') gsap.registerPlugin(ScrambleTextPlugin);
  if (typeof MorphSVGPlugin !== 'undefined') gsap.registerPlugin(MorphSVGPlugin);
}

/* ---------------- MENU ---------------- */

function openMenu() {
  if (!menuVector || !menu) return;

  gsap.to(menuVector, {
    duration: 0.35,
    morphSVG: 'M20 20L4 4.00003M20 4L4.00002 20'
  });

  gsap.to(menu, {
    duration: 0.4,
    x: '0%',
    ease: 'power4.out'
  });

  menuOpen = true;
}

function closeMenu() {
  if (!menuVector || !menu) return;

  gsap.to(menuVector, {
    duration: 0.35,
    morphSVG: 'M5 15H19M5 9H19'
  });

  gsap.to(menu, {
    duration: 0.35,
    x: '100%',
    ease: 'power4.out'
  });

  menuOpen = false;
}

function onMenuButtonClick() {
  if (!mobileQuery.matches) return;
  menuOpen ? closeMenu() : openMenu();
}

function onMenuLinkClick() {
  if (mobileQuery.matches) closeMenu();
}

function bindMobileMenu() {
  if (mobileBound || !menuBtn) return;

  menuBtn.addEventListener('click', onMenuButtonClick);
  menuLinks.forEach(link =>
    link.addEventListener('click', onMenuLinkClick)
  );

  mobileBound = true;
}

function unbindMobileMenu() {
  if (!mobileBound || !menuBtn) return;

  menuBtn.removeEventListener('click', onMenuButtonClick);
  menuLinks.forEach(link =>
    link.removeEventListener('click', onMenuLinkClick)
  );

  mobileBound = false;
}

function resetDesktopMenu() {
  if (!menu || !menuVector) return;

  gsap.set(menu, { clearProps: 'x' });
  gsap.set(menuVector, { attr: { d: 'M5 15H19M5 9H19' } });

  menuOpen = false;
}

function handleViewportChange() {
  if (mobileQuery.matches) {
    bindMobileMenu();
    closeMenu();
  } else {
    unbindMobileMenu();
    resetDesktopMenu();
  }
}

/* ---------------- CUSTOM CURSOR ---------------- */

function onMouseMove(e) {
  if (!customCursor) return;

  gsap.set(customCursor, { display: 'block' });

  gsap.to(customCursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.08,
    ease: 'power2.out'
  });
}

function onHoverEnter() {
  if (!customCursor) return;
  gsap.to(customCursor, { scale: 2, duration: 0.2 });
}

function onHoverLeave() {
  if (!customCursor) return;
  gsap.to(customCursor, { scale: 1, duration: 0.2 });
}

function bindCustomCursor() {
  if (cursorBound || !customCursor) return;

  window.addEventListener('mousemove', onMouseMove);

  hoverTargets.forEach(el => {
    el.addEventListener('pointerenter', onHoverEnter);
    el.addEventListener('pointerleave', onHoverLeave);
  });

  cursorBound = true;
}

function unbindCustomCursor() {
  if (!cursorBound || !customCursor) return;

  window.removeEventListener('mousemove', onMouseMove);

  hoverTargets.forEach(el => {
    el.removeEventListener('pointerenter', onHoverEnter);
    el.removeEventListener('pointerleave', onHoverLeave);
  });

  gsap.set(customCursor, { display: 'none', scale: 1 });

  cursorBound = false;
}

function handlePointerMode() {
  if (finePointerQuery.matches) {
    bindCustomCursor();
  } else {
    unbindCustomCursor();
  }
}

/* ---------------- RIPPLE ---------------- */

$(document).ready(function () {
  try {
    $('#home').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04
    });

    $(document).on('mousemove', function (e) {
      $('#home').ripples('drop', e.clientX, e.clientY, 10, 0.04);
    });

  } catch (e) {
    console.warn('Ripples not supported');
  }
});

/* ---------------- SCROLL ANIMATIONS ---------------- */

function initFullPageScrollAnimations() {
  if (reducedMotionQuery.matches || typeof ScrollTrigger === 'undefined') return;

  const revealTargets = gsap.utils.toArray(
    'section, section article, section h2, section p, section .hT'
  );

  revealTargets.forEach((el, i) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 42 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: Math.min(i * 0.02, 0.18),
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      }
    );
  });
}

/* ---------------- LOADING ---------------- */

window.addEventListener('load', () => {
  if (!loadingScreen) return;

  gsap.to(loadingScreen, {
    opacity: 0,
    scale: 1.5,
    duration: 1,
    delay: 1.5,
    onComplete: () => loadingScreen.classList.add('hidden')
  });
});

/* ---------------- TEXT EFFECT ---------------- */

menuLinks.forEach((link, i) => {
  link.addEventListener('pointerenter', () => {
    if (typeof ScrambleTextPlugin === 'undefined') return;

    gsap.to(link, {
      duration: 0.8,
      scrambleText: {
        text: menuItems[i]
      }
    });
  });
});

/* ---------------- TYPING ---------------- */

if (typeof Typify !== 'undefined') {
  Typify('.typing', {
    text: [
      'Creative Web Developer',
      'Frontend Builder',
      'Backend Explorer',
      'App Builder'
    ],
    delay: 90,
    loop: true,
    cursor: true,
    stringDelay: 1000
  });
}

/* ---------------- SKILL BAR ---------------- */

if (typeof ScrollTrigger !== 'undefined') {
  gsap.to('.skill-bar', {
    scrollTrigger: {
      trigger: '#skills',
      start: 'top center',
      end: '+=500',
      scrub: 0.5
    },
    scaleX: 1,
    duration: 1.2
  });
}

/* ---------------- INIT ---------------- */

handleViewportChange();
handlePointerMode();
initFullPageScrollAnimations();

mobileQuery.addEventListener('change', handleViewportChange);
finePointerQuery.addEventListener('change', handlePointerMode);