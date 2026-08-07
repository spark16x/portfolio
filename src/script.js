import Lenis from 'lenis';
import anime from 'animejs';

// The original file is directly listening to DOMContentLoaded.
// Since we trigger DOMContentLoaded in App.jsx, the listener will work.
document.addEventListener('DOMContentLoaded', () => {
    // --- Lenis Smooth Scrolling Engine ---
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // --- "Spark." Loading Intro: Center to Navbar Animation ---
    const introScreen = document.getElementById('intro-screen');
    const introLogo = document.getElementById('intro-logo');
    const navLogo = document.getElementById('nav-logo');

    if (introScreen && introLogo && navLogo) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof anime === 'undefined') {
            navLogo.classList.remove('opacity-0');
            introScreen.style.display = 'none';
        } else {
            // Lock body scroll during intro
            document.body.style.overflow = 'hidden';

            // Calculate precise pixel distance from center to nav-logo
            const navRect = navLogo.getBoundingClientRect();
            const introRect = introLogo.getBoundingClientRect();

            const deltaX = (navRect.left + navRect.width / 2) - (introRect.left + introRect.width / 2);
            const deltaY = (navRect.top + navRect.height / 2) - (introRect.top + introRect.height / 2);
            const scaleTarget = navRect.height / introRect.height;

            const introTimeline = anime.timeline({
                easing: 'easeInOutExpo',
                complete: () => {
                    navLogo.classList.remove('opacity-0');
                    introScreen.style.opacity = '0';
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                        document.body.style.overflow = '';
                    }, 500);
                }
            });

            introTimeline
                .add({
                    targets: introLogo,
                    scale: [0.6, 1.1, 1],
                    opacity: [0, 1],
                    duration: 700,
                    easing: 'easeOutBack'
                })
                .add({
                    targets: introLogo,
                    translateX: deltaX,
                    translateY: deltaY,
                    scale: scaleTarget,
                    duration: 850,
                    easing: 'cubicBezier(0.77, 0, 0.175, 1)'
                }, '+=300')
                .add({
                    targets: introScreen,
                    opacity: 0,
                    duration: 500,
                    easing: 'easeOutQuad'
                }, '-=400');
        }
    }

    // --- Intersection Observer for Fade-up Animations ---
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        revealObserver.observe(el);
    });

    // Staggered children timing
    document.querySelectorAll('.reveal-stagger').forEach(parent => {
        Array.from(parent.children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // --- Magnetic Hover Effect ---
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- Dynamic Cursor-Aware Fill Button Animation ---
    const initFillButtons = () => {
        document.querySelectorAll('.btn-fill').forEach(btn => {
            let fillBg = btn.querySelector('.btn-fill-bg');
            if (!fillBg) {
                fillBg = document.createElement('span');
                fillBg.className = 'btn-fill-bg';
                btn.appendChild(fillBg);
            }

            const updatePosition = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                fillBg.style.left = `${x}px`;
                fillBg.style.top = `${y}px`;
            };

            btn.addEventListener('mouseenter', updatePosition);
            btn.addEventListener('mouseleave', updatePosition);
        });
    };
    initFillButtons();

    // --- Back to Top ---
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btt.classList.add('visible');
            } else {
                btt.classList.remove('visible');
            }
        });
        btt.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // --- Smooth Scroll Navigation with Sticky Header Offset ---
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navOffset = -75;
                    if (lenis) {
                        lenis.scrollTo(target, { offset: navOffset });
                    } else {
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY + navOffset;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                }
            }
        });
    });

    // --- Dynamic ScrollSpy: Switch Active Nav Link on Scroll ---
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
                        link.classList.remove('text-secondary');
                    } else {
                        link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
                        link.classList.add('text-secondary');
                    }
                });
            }
        });
    }

    if (lenis) {
        lenis.on('scroll', updateActiveNavLink);
    } else {
        window.addEventListener('scroll', updateActiveNavLink);
    }
    updateActiveNavLink();

    // --- Typewriter Effect ---
    const phrases = [
        'Creative Web Developer',
        'Frontend Builder',
        'Backend Explorer',
        'App Builder'
    ];
    let currentPhraseIndex = 0;
    let currentCharacterIndex = 0;
    let isDeleting = false;
    let typewriterDelay = 100;
    const typewriterElement = document.getElementById('typewriter');

    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, currentCharacterIndex - 1);
            currentCharacterIndex--;
            typewriterDelay = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, currentCharacterIndex + 1);
            currentCharacterIndex++;
            typewriterDelay = 100;
        }

        if (!isDeleting && currentCharacterIndex === currentPhrase.length) {
            isDeleting = true;
            typewriterDelay = 2000; // Pause at end
        } else if (isDeleting && currentCharacterIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typewriterDelay = 500; // Pause before new phrase
        }

        setTimeout(typeWriter, typewriterDelay);
    }

    // --- Ripple Effect (Hero section) ---
    try {
        if (typeof $ !== 'undefined' && $('#home').ripples) {
            $('#home').ripples({
                resolution: 512,
                dropRadius: 30,
                perturbance: 0.08
            });

            let lastRippleTime = 0;
            $('#home').on('mousemove', function (e) {
                const now = Date.now();
                if (now - lastRippleTime < 80) return;
                lastRippleTime = now;

                const offsetX = e.pageX - $(this).offset().left;
                const offsetY = e.pageY - $(this).offset().top;

                $('#home').ripples('drop', offsetX, offsetY, 10, 0.04);
            });
        }
    } catch (e) {
        console.warn('Ripples not supported:', e);
    }

    // --- Anime.js Scroll Animations ---
    if (typeof anime !== 'undefined') {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const innerBar = entry.target.querySelector('div');
                    if (innerBar) {
                        const targetWidth = innerBar.style.width;
                        innerBar.style.width = '0%';
                        anime({
                            targets: innerBar,
                            width: targetWidth,
                            duration: 1500,
                            easing: 'easeOutCubic'
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.bg-surface-container-high').forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Start typewriter
    if (typewriterElement) setTimeout(typeWriter, 1000);

    // --- Unified Parallax & Mobile Device Movement Engine ---
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const profileCard = document.getElementById('profile-card');
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    const tiltCards = document.querySelectorAll('#skills .bg-white, #clients .group, #about .bg-white, #contact > div');

    if (!isReducedMotion) {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        let isHoveringProfileCard = false;
        let cardTiltX = 0;
        let cardTiltY = 0;

        // Detector strictly for mobile devices (smartphones & tablets)
        const isMobileDevice = () => {
            const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
            const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            return (isMobileUA || isTouch) && window.innerWidth <= 1024;
        };

        let deviceMotionActive = false;
        let initialBeta = null;
        let initialGamma = null;

        // 1. Desktop Mouse Movement Listener (Active for desktop screens)
        window.addEventListener('mousemove', (e) => {
            if (isMobileDevice()) return; // Device movement handles mobile; ignore mousemove on mobile

            targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

            if (profileCard) {
                const rect = profileCard.getBoundingClientRect();
                if (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                ) {
                    isHoveringProfileCard = true;
                    const cardX = e.clientX - rect.left;
                    const cardY = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    cardTiltX = ((cardY - centerY) / centerY) * -22;
                    cardTiltY = ((cardX - centerX) / centerX) * 22;
                } else {
                    isHoveringProfileCard = false;
                }
            }
        });

        // 2. Mobile Device Movement Engine (Combines deviceorientation + devicemotion for Mobile Devices)
        let motionX = 0;
        let motionY = 0;

        function handleDeviceOrientation(e) {
            if (!isMobileDevice()) return;

            let beta = e.beta;   // Pitch [-180, 180] (Front to back tilt angle)
            let gamma = e.gamma; // Roll [-90, 90] (Left to right tilt angle)

            if (beta === null || beta === undefined) beta = 0;
            if (gamma === null || gamma === undefined) gamma = 0;

            deviceMotionActive = true;

            // Handle Landscape orientation angle swap
            const isLandscape = window.matchMedia("(orientation: landscape)").matches;
            if (isLandscape) {
                const temp = beta;
                beta = gamma;
                gamma = -temp;
            }

            // Auto-calibrate initial resting orientation angle smoothly
            if (initialBeta === null || initialGamma === null) {
                initialBeta = beta;
                initialGamma = gamma;
            } else {
                // Slow drift baseline calibration (re-centers smoothly if holding posture changes)
                initialBeta += (beta - initialBeta) * 0.005;
                initialGamma += (gamma - initialGamma) * 0.005;
            }

            // Relative tilt angles clamped to [-25, 25] degrees
            const diffGamma = Math.max(-25, Math.min(25, gamma - initialGamma));
            const diffBeta = Math.max(-25, Math.min(25, beta - initialBeta));

            // Map orientation tilt to targetX & targetY [-1, 1]
            targetX = diffGamma / 25;
            targetY = diffBeta / 25;

            // Show mobile motion status chip
            const motionChip = document.getElementById('mobile-motion-chip');
            if (motionChip) {
                motionChip.classList.remove('hidden');
                motionChip.classList.add('flex');
            }
        }

        // Handle physical movement acceleration & rotational dynamics via devicemotion
        let lastMotionShakeTime = 0;
        function handleDeviceMotion(e) {
            if (!isMobileDevice()) return;

            deviceMotionActive = true;

            // Extract physical acceleration & rotation rate
            const acc = e.acceleration || e.accelerationIncludingGravity;
            const rot = e.rotationRate;

            if (acc) {
                const accX = acc.x || 0;
                const accY = acc.y || 0;
                const accZ = acc.z || 0;

                // Add physical movement shift to motion vector (clamped)
                motionX += accX * 0.04;
                motionY += accY * 0.04;

                // Physical phone shake drop ripple trigger on sudden motion (> 18 m/s^2)
                const totalAcc = Math.sqrt(accX * accX + accY * accY + accZ * accZ);
                const now = Date.now();
                if (totalAcc > 18 && now - lastMotionShakeTime > 400) {
                    lastMotionShakeTime = now;
                    if (typeof $ !== 'undefined' && $('#home').ripples) {
                        try {
                            const homeWidth = $('#home').width() || 300;
                            const homeHeight = $('#home').height() || 400;
                            const randomX = Math.random() * homeWidth;
                            const randomY = Math.random() * homeHeight;
                            $('#home').ripples('drop', randomX, randomY, 15, 0.05);
                        } catch (err) { }
                    }
                }
            }

            if (rot) {
                const rotBeta = rot.beta || 0;   // deg/s around X axis
                const rotGamma = rot.gamma || 0; // deg/s around Y axis
                motionX += (rotGamma / 100) * 0.1;
                motionY += (rotBeta / 100) * 0.1;
            }
        }

        let sensorsInitialized = false;
        let permissionRequested = false;

        // Initialize Device Orientation & Motion (Mobile devices only, supports Android & iOS 13+)
        function initMobileSensors() {
            if (!isMobileDevice() || sensorsInitialized) return;
            sensorsInitialized = true;

            // Attach standard orientation and absolute orientation listeners immediately
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', handleDeviceOrientation, true);
                window.addEventListener('deviceorientationabsolute', handleDeviceOrientation, true);
            }
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', handleDeviceMotion, { passive: true, capture: true });
            }

            // iOS 13+ permission request on touch/click
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                const requestPermissions = () => {
                    if (permissionRequested) return;
                    permissionRequested = true;

                    DeviceOrientationEvent.requestPermission()
                        .then(state => {
                            if (state === 'granted') {
                                // Listeners already attached above; iOS fires existing listeners once permission is granted
                            }
                        })
                        .catch(console.error);

                    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                        DeviceMotionEvent.requestPermission()
                            .then(state => {
                                if (state === 'granted') {
                                    // Listener already attached above
                                }
                            })
                            .catch(console.error);
                    }
                };

                window.addEventListener('touchstart', requestPermissions, { once: true });
                window.addEventListener('click', requestPermissions, { once: true });
            }
        }

        initMobileSensors();

        // Re-evaluate on resize / orientation change
        window.addEventListener('resize', () => {
            if (!isMobileDevice()) {
                if (deviceMotionActive) {
                    deviceMotionActive = false;
                    window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
                    window.removeEventListener('deviceorientationabsolute', handleDeviceOrientation, true);
                    window.removeEventListener('devicemotion', handleDeviceMotion, { capture: true });
                    const motionChip = document.getElementById('mobile-motion-chip');
                    if (motionChip) {
                        motionChip.classList.add('hidden');
                        motionChip.classList.remove('flex');
                    }
                }
            } else {
                sensorsInitialized = false;
                permissionRequested = false;
                initMobileSensors();
            }
        });

        // 3. Smooth Animation Loop combining Orientation & Motion Dynamics
        function animateParallax() {
            // Decay devicemotion physical movement inertia
            motionX *= 0.85;
            motionY *= 0.85;

            // Combine device orientation tilt + devicemotion movement offset
            const combinedTargetX = isMobileDevice() ? Math.max(-1.5, Math.min(1.5, targetX + motionX)) : targetX;
            const combinedTargetY = isMobileDevice() ? Math.max(-1.5, Math.min(1.5, targetY + motionY)) : targetY;

            mouseX += (combinedTargetX - mouseX) * 0.08;
            mouseY += (combinedTargetY - mouseY) * 0.08;

            // Background floating parallax elements
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 20;
                const xOffset = (mouseX * speed).toFixed(2);
                const yOffset = (mouseY * speed).toFixed(2);
                const z = parseFloat(el.getAttribute('data-parallax-z')) || 0;

                if (el.classList.contains('animate-float')) {
                    el.style.setProperty('--px', `${xOffset}px`);
                    el.style.setProperty('--py', `${yOffset}px`);
                } else {
                    el.style.transform = `translate3d(${xOffset}px, ${yOffset}px, ${z}px)`;
                }
            });

            // 3D Parallax Profile Card
            if (profileCard) {
                let finalRotateX, finalRotateY;
                if (!isMobileDevice() && isHoveringProfileCard) {
                    finalRotateX = cardTiltX.toFixed(2);
                    finalRotateY = cardTiltY.toFixed(2);
                } else {
                    const maxRotateX = 18;
                    const maxRotateY = 18;
                    finalRotateX = (mouseY * -maxRotateX).toFixed(2);
                    finalRotateY = (mouseX * maxRotateY).toFixed(2);
                }

                profileCard.style.transform = `rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg)`;
            }

            // 3D Card Tilt for Parallax Cards on Mobile (Exclusively active on Mobile via Device Orientation & Motion)
            if (isMobileDevice()) {
                tiltCards.forEach(card => {
                    const tiltX = (mouseY * -14).toFixed(2);
                    const tiltY = (mouseX * 14).toFixed(2);
                    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;
                });
            }

            requestAnimationFrame(animateParallax);
        }

        requestAnimationFrame(animateParallax);

        // 4. Interactive Card 3D Tilt on Mouse Hover (Desktop Only)
        tiltCards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease';

            card.addEventListener('mousemove', (e) => {
                if (isMobileDevice()) return; // Skip hover tilt on mobile devices
                const rect = card.getBoundingClientRect();
                const cardX = e.clientX - rect.left;
                const cardY = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const tiltX = (((cardY - centerY) / centerY) * -10).toFixed(2);
                const tiltY = (((cardX - centerX) / centerX) * 10).toFixed(2);

                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`;
            });

            card.addEventListener('mouseleave', () => {
                if (isMobileDevice()) return; // Skip mouseleave on mobile devices
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }
});
