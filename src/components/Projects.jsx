import React from 'react';

export default function Projects() {
  return (
    <section className="py-xl reveal" id="projects">
        <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg mb-xl text-center">
            Selected <span className="text-secondary">Works</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-outline-variant/20 block cursor-pointer card-hover-effect">
                <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img alt="Project 1 preview" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    src="/assets/images/images.png" />
                <div className="absolute bottom-0 left-0 w-full p-lg bg-gradient-to-t from-surface to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-headline-md font-bold mb-xs text-on-surface">E-Commerce Platform</h3>
                    <p className="text-secondary font-body-md mb-sm">Modern shopping experience.</p>
                    <div className="flex gap-2">
                        <span className="bg-surface/80 backdrop-blur text-xs px-2 py-1 rounded-md font-code">HTML</span>
                        <span className="bg-surface/80 backdrop-blur text-xs px-2 py-1 rounded-md font-code">Tailwind</span>
                        <span className="bg-surface/80 backdrop-blur text-xs px-2 py-1 rounded-md font-code">JS</span>
                    </div>
                </div>
                <a href="#" className="absolute top-lg right-lg z-30 bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 magnetic-btn">
                    <span className="material-symbols-outlined">arrow_outward</span>
                </a>
            </div>

            <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-outline-variant/20 block cursor-pointer card-hover-effect">
                <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img alt="Project 2 preview" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    src="/assets/images/images.png" />
                <div className="absolute bottom-0 left-0 w-full p-lg bg-gradient-to-t from-surface to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-headline-md font-bold mb-xs text-on-surface">Creative Agency</h3>
                    <p className="text-secondary font-body-md mb-sm">Award-winning portfolio design.</p>
                    <div className="flex gap-2">
                        <span className="bg-surface/80 backdrop-blur text-xs px-2 py-1 rounded-md font-code">GSAP</span>
                        <span className="bg-surface/80 backdrop-blur text-xs px-2 py-1 rounded-md font-code">CSS3</span>
                    </div>
                </div>
                <a href="#" className="absolute top-lg right-lg z-30 bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 magnetic-btn">
                    <span className="material-symbols-outlined">arrow_outward</span>
                </a>
            </div>
        </div>
        <div className="text-center mt-xl">
            <a href="https://github.com/spark16x"
                className="inline-flex items-center gap-xs text-primary font-label-sm font-bold hover:underline group">
                View All Projects <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
        </div>
    </section>
  );
}
