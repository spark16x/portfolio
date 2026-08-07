import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-[819px] flex flex-col md:flex-row items-center justify-between py-xl gap-xl" id="home">
        <div className="flex-1 space-y-md reveal" data-parallax-speed="10">
            <p className="font-headline-md text-headline-md">Hi, It's <span className="font-bold">Spark</span></p>
            <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl max-w-2xl leading-tight">
                I'm a <br /><span className="bg-primary text-on-primary px-2 inline-block typing cursor-blink"
                    id="typewriter">Creative Web Developer</span>
            </h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-xl">A student and web developer building
                digital experiences using pure HTML, CSS, JavaScript, and GSAP. 🚀</p>
            <div className="flex items-center gap-md pt-sm">
                <a className="px-lg py-sm bg-primary text-on-primary rounded-full hover:shadow-lg active:scale-95 magnetic-btn font-label-sm btn-fill btn-fill-inverse"
                    href="#contact"><span>Let's Talk</span></a>
                <a className="px-lg py-sm border border-outline-variant text-primary rounded-full hover:bg-surface-container active:scale-95 magnetic-btn font-label-sm btn-fill btn-fill-primary"
                    href="https://github.com/spark16x"><span>View Work</span></a>
            </div>
            <div className="flex gap-md pt-xl opacity-70">
                <a className="text-secondary hover:text-primary transition-all hover:-translate-y-1"
                    href="https://github.com/spark16x"><i className="fab fa-github text-2xl"></i></a>
                <a className="text-secondary hover:text-primary transition-all hover:-translate-y-1"
                    href="https://instagram.com/spark16.x"><i className="fab fa-instagram text-2xl"></i></a>
                <a className="text-secondary hover:text-primary transition-all hover:-translate-y-1"
                    href="mailto:spark2009971@gmail.com"><i className="far fa-envelope text-2xl"></i></a>
            </div>
        </div>

        <div className="flex-1 relative w-full max-w-[500px] reveal-right">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <img alt="Abstract digital art representing creativity"
                className="w-full h-auto object-cover rounded-3xl shadow-2xl tilt-image filter contrast-125"
                height="600" src="/assets/images/char.jpeg" width="500" />
            <div
                className="absolute -bottom-6 -right-6 bg-surface p-md rounded-2xl shadow-xl border border-outline-variant/30 glass hover:scale-105 transition-transform duration-300">
                <p className="font-bold text-headline-md text-primary">1+</p>
                <p className="text-secondary font-label-sm">Years Experience</p>
            </div>
            <div
                className="absolute -top-6 -left-6 bg-surface p-sm rounded-xl shadow-lg border border-outline-variant/30 glass flex items-center gap-xs hover:-translate-y-1 transition-transform duration-300">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
                <span className="font-label-sm font-bold">Available for Work</span>
            </div>
        </div>
    </section>
  );
}
