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

    // --- 3D Parallax Profile Card ---
    const profileCard = document.getElementById('profile-card');
    if (profileCard) {
        // Desktop mouse movement
        profileCard.parentElement.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const rect = profileCard.parentElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg rotation
            const rotateY = ((x - centerX) / centerX) * 15;

            profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        profileCard.parentElement.addEventListener('mouseleave', () => {
            profileCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
            profileCard.style.transition = 'transform 0.5s ease-out';
            setTimeout(() => {
                profileCard.style.transition = 'transform 0.1s ease-out';
            }, 500);
        });

        // Mobile device orientation
        if (window.DeviceOrientationEvent) {
            let initialBeta = null;
            let initialGamma = null;

            window.addEventListener('deviceorientation', (e) => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

                // Allow user to interact first to request permission on iOS if needed later,
                // but just listening for standard orientation here.

                let beta = e.beta;   // In degree in the range [-180,180) - x axis
                let gamma = e.gamma; // In degree in the range [-90,90) - y axis

                if (beta === null || gamma === null) return;

                if (initialBeta === null) initialBeta = beta;
                if (initialGamma === null) initialGamma = gamma;

                // Relative movement
                let diffBeta = beta - initialBeta;
                let diffGamma = gamma - initialGamma;

                // Limit the rotation
                diffBeta = Math.max(-20, Math.min(20, diffBeta));
                diffGamma = Math.max(-20, Math.min(20, diffGamma));

                const rotateX = diffBeta * -1; // Adjust multiplier as needed
                const rotateY = diffGamma;

                profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        }
    }

});
