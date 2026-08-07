import React from 'react';

export default function Skills() {
  return (
    <section className="py-xl reveal" id="skills">
        <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg mb-xl text-center">
            My <span className="text-secondary">Arsenal</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            <div
                className="bg-surface-container-low p-lg rounded-3xl border border-outline-variant/30 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 group glass card-hover-effect">
                <div
                    className="w-14 h-14 bg-primary text-on-primary rounded-xl flex items-center justify-center mb-md group-hover:rotate-12 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">code</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-sm font-bold">Frontend Dev</h3>
                <p className="text-secondary font-body-md mb-md">Crafting semantic, accessible, and high-performance user interfaces.</p>
                <div className="space-y-sm font-label-sm font-medium">
                    <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-2 rounded-full w-[95%]"></div>
                    </div>
                    <div className="flex justify-between mb-1"><span>HTML5 / CSS3</span> <span>95%</span></div>
                    <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-2 rounded-full w-[90%]"></div>
                    </div>
                    <div className="flex justify-between mb-1"><span>Tailwind CSS</span> <span>90%</span></div>
                    <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-2 rounded-full w-[85%]"></div>
                    </div>
                    <div className="flex justify-between mb-1"><span>JavaScript (ES6+)</span> <span>85%</span></div>
                </div>
            </div>

            <div
                className="bg-surface-container-low p-lg rounded-3xl border border-outline-variant/30 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 group glass card-hover-effect">
                <div
                    className="w-14 h-14 bg-primary text-on-primary rounded-xl flex items-center justify-center mb-md group-hover:-rotate-12 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">animation</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-sm font-bold">Motion & UI</h3>
                <p className="text-secondary font-body-md mb-md">Bringing interfaces to life with fluid animations and modern design principles.</p>
                <div className="flex flex-wrap gap-xs">
                    <span
                        className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">GSAP</span>
                    <span
                        className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">Anime.js</span>
                    <span
                        className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">Lenis
                        Scroll</span>
                    <span
                        className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">Figma</span>
                </div>
            </div>

            <div
                className="bg-surface-container-low p-lg rounded-3xl border border-outline-variant/30 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 group glass card-hover-effect">
                <div
                    className="w-14 h-14 bg-primary text-on-primary rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">speed</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-sm font-bold">Performance</h3>
                <p className="text-secondary font-body-md">Optimizing for speed, accessibility, and SEO to deliver the best user experience.</p>
                <ul className="mt-md space-y-xs text-secondary font-body-md">
                    <li className="flex items-center gap-xs"><span
                            className="material-symbols-outlined text-green-500 text-sm">check</span> Lighthouse 100
                    </li>
                    <li className="flex items-center gap-xs"><span
                            className="material-symbols-outlined text-green-500 text-sm">check</span> Semantic HTML
                    </li>
                    <li className="flex items-center gap-xs"><span
                            className="material-symbols-outlined text-green-500 text-sm">check</span> Responsive Design
                    </li>
                </ul>
            </div>
        </div>
    </section>
  );
}
