const menuBtn = document.querySelector('#menu-b');
const menu = document.querySelector('#menu');
const menuLinks = document.querySelectorAll('#menu a');
const menuVector = document.querySelector('#Vector');
const menuItems = ['Home', 'About', 'Skills', 'Contact'];
const hoverTargets = document.querySelectorAll('.hT');
const loadingScreen = document.querySelector('#loading');
const customCursor = document.querySelector('#cursor');

const mobileQuery = window.matchMedia('(max-width: 639px)');
const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

let menuOpen = false;
let mobileBound = false;
let cursorBound = false;

function openMenu() {
  if (!menuVector || !menu) return;
  gsap.to(menuVector, { duration: 0.35, morphSVG: 'M20 20L4 4.00003M20 4L4.00002 20' });
  gsap.to(menu, { duration: 0.4, x: '-100%', ease: 'power4.out' });
  menuOpen = true;
}

function closeMenu() {
  if (!menuVector || !menu) return;
  gsap.to(menuVector, { duration: 0.35, morphSVG: 'M5 15H19M5 9H19' });
  gsap.to(menu, { duration: 0.35, x: '100%', ease: 'power4.out' });
  menuOpen = false;
}

function onMenuButtonClick() {
  if (!mobileQuery.matches) return;
  if (menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function onMenuLinkClick() {
  if (mobileQuery.matches) {
    closeMenu();
  }
}

function bindMobileMenu() {
  if (mobileBound || !menuBtn) return;
  menuBtn.addEventListener('click', onMenuButtonClick);
  menuLinks.forEach((link) => link.addEventListener('click', onMenuLinkClick));
  mobileBound = true;
}

function unbindMobileMenu() {
  if (!mobileBound || !menuBtn) return;
  menuBtn.removeEventListener('click', onMenuButtonClick);
  menuLinks.forEach((link) => link.removeEventListener('click', onMenuLinkClick));
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

function onMouseMove(event) {
  if (!customCursor) return;
  gsap.set(customCursor, { display: 'block' });
  gsap.to(customCursor, {
    x: event.clientX,
    y: event.clientY,
    duration: 0.08,
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
  hoverTargets.forEach((el) => {
    el.addEventListener('pointerenter', onHoverEnter);
    el.addEventListener('pointerleave', onHoverLeave);
  });
  cursorBound = true;
}

function unbindCustomCursor() {
  if (!cursorBound || !customCursor) return;
  window.removeEventListener('mousemove', onMouseMove);
  hoverTargets.forEach((el) => {
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

window.addEventListener('load', () => {
  if (!loadingScreen) return;
  gsap.to(loadingScreen, {
    opacity: 0,
    scale: 1.1,
    duration: 0.6,
    delay: 0.25,
    onComplete: () => {
      loadingScreen.classList.add('hidden');
    },
  });

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 2500);
});

menuLinks.forEach((link, i) => {
  link.addEventListener('pointerenter', () => {
    gsap.to(link, {
      duration: 1.1,
      scrambleText: {
        text: menuItems[i],
      },
    });
  });
});

Typify('.typing', {
  text: ['Creative Web Developer', 'Frontend Builder', 'Backend Explorer'],
  delay: 90,
  loop: true,
  cursor: true,
  stringDelay: 1000,
});

handleViewportChange();
handlePointerMode();

mobileQuery.addEventListener('change', handleViewportChange);
finePointerQuery.addEventListener('change', handlePointerMode);
