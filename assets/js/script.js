document.addEventListener('DOMContentLoaded', () => {
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Smooth Scroll Navigation ---
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

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
            $('#home').on('mousemove', function(e) {
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

    // --- GSAP Scroll Animations ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Add skill bar animation using GSAP like original
        gsap.utils.toArray('.bg-surface-container-high').forEach(bar => {
            const innerBar = bar.querySelector('div');
            if (innerBar) {
                const width = innerBar.style.width;
                innerBar.style.width = '0%';
                gsap.to(innerBar, {
                    width: width,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 90%",
                    }
                });
            }
        });
    }

    // Start typewriter
    if (typewriterElement) setTimeout(typeWriter, 1000);

    // --- Desktop Mouse Parallax Engine ---
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const profileCard = document.getElementById('profile-card');
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    const tiltCards = document.querySelectorAll('#skills .bg-white, #clients .group, #about .bg-white');

    if (!isReducedMotion) {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let isHoveringProfileCard = false;
        let cardTiltX = 0;
        let cardTiltY = 0;

        // Desktop window mouse movement listener
        window.addEventListener('mousemove', (e) => {
            // Normalized X and Y from -1 to 1 relative to window center
            targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

            // Direct local tilt if hovering over profile card
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

                    // Direct interactive 3D rotation up to 25 deg
                    cardTiltX = ((cardY - centerY) / centerY) * -22;
                    cardTiltY = ((cardX - centerX) / centerX) * 22;
                } else {
                    isHoveringProfileCard = false;
                }
            }
        });

        // Smooth Lerp Animation Loop using requestAnimationFrame
        function animateParallax() {
            // Linear interpolation for silky smooth springy movement
            mouseX += (targetX - mouseX) * 0.08;
            mouseY += (targetY - mouseY) * 0.08;

            // 1. Parallax background elements & atmospheric blurs
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 20;
                const xOffset = (mouseX * speed).toFixed(2);
                const yOffset = (mouseY * speed).toFixed(2);

                const z = parseFloat(el.getAttribute('data-parallax-z')) || 0;
                if (el.classList.contains('animate-float')) {
                    // Set CSS variables for float animation keyframes
                    el.style.setProperty('--px', `${xOffset}px`);
                    el.style.setProperty('--py', `${yOffset}px`);
                } else {
                    el.style.transform = `translate3d(${xOffset}px, ${yOffset}px, ${z}px)`;
                }
            });

            // 2. 3D Parallax Profile Card (Global mouse move + local hover)
            if (profileCard) {
                let finalRotateX, finalRotateY;
                if (isHoveringProfileCard) {
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

            requestAnimationFrame(animateParallax);
        }

        requestAnimationFrame(animateParallax);

        // 3. Interactive Card 3D Tilt on Hover (Skills, About & Client Cards)
        tiltCards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease';

            card.addEventListener('mousemove', (e) => {
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
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Mobile Device Orientation for Parallax
    if (window.DeviceOrientationEvent && profileCard) {
        let initialBeta = null;
        let initialGamma = null;

        window.addEventListener('deviceorientation', (e) => {
            if (isReducedMotion || window.innerWidth >= 768) return;

            let beta = e.beta;   // In degree [-180,180)
            let gamma = e.gamma; // In degree [-90,90)

            if (beta === null || gamma === null) return;

            if (initialBeta === null) initialBeta = beta;
            if (initialGamma === null) initialGamma = gamma;

            let diffBeta = Math.max(-20, Math.min(20, beta - initialBeta));
            let diffGamma = Math.max(-20, Math.min(20, gamma - initialGamma));

            const rotateX = (diffBeta * -1).toFixed(2);
            const rotateY = diffGamma.toFixed(2);

            profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

});
