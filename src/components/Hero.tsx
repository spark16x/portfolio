import React, { useState } from 'react';
import Typewriter from './Typewriter';
import MagneticButton from './MagneticButton';
import { Code, Bot, Github, Instagram } from 'lucide-react';

export interface CardTilt {
  rotateX: string | number;
  rotateY: string | number;
}

export default function Hero() {
  const [profileCardTilt, setProfileCardTilt] = useState<CardTilt>({ rotateX: 0, rotateY: 0 });

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (((cardY - centerY) / centerY) * -22).toFixed(2);
    const tiltY = (((cardX - centerX) / centerX) * 22).toFixed(2);

    setProfileCardTilt({ rotateX: tiltX, rotateY: tiltY });
  };

  const handleMouseLeaveCard = () => {
    setProfileCardTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section className="min-h-[819px] flex flex-col md:flex-row items-center justify-between py-xl gap-xl" id="home">
      <div className="flex-1 space-y-md">
        <p className="font-headline-md text-headline-md">
          Hi, It's <span className="font-bold">Spark</span>
        </p>
        <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl max-w-2xl leading-tight">
          I'm a <br />
          <Typewriter />
        </h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-xl">
          A student and web developer building modern, experimental, and AI-powered experiences. I enjoy experimenting, learning quickly, and shipping ideas that feel both useful and creative.
        </p>

        <div className="flex flex-wrap gap-sm pt-sm items-center">
          <MagneticButton
            href="https://www.fiverr.com/s/Q7Lj2de"
            target="_blank"
            rel="noopener noreferrer"
            variant="inverse"
            className="bg-primary text-on-primary px-xl py-md rounded-full font-label-sm text-label-sm active:scale-95 shadow-md inline-block text-center"
          >
            <span>Let's work together</span>
          </MagneticButton>

          <MagneticButton
            href="https://github.com/spark16x"
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="GitHub"
            variant="primary"
            className="bg-surface border border-outline-variant text-primary w-12 h-12 flex items-center justify-center rounded-full active:scale-95"
          >
            <Github className="w-5 h-5 text-primary" />
          </MagneticButton>

          <MagneticButton
            href="https://instagram.com/spark16.x"
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Instagram"
            variant="primary"
            className="bg-surface border border-outline-variant text-primary w-12 h-12 flex items-center justify-center rounded-full active:scale-95"
          >
            <Instagram className="w-5 h-5 text-primary" />
          </MagneticButton>
        </div>
      </div>

      <div className="flex-1 flex justify-center md:justify-end p-4" style={{ perspective: '1200px' }}>
        <div
          id="profile-card"
          onMouseMove={handleMouseMoveCard}
          onMouseLeave={handleMouseLeaveCard}
          className="relative w-72 h-72 md:w-88 md:h-88 group cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${profileCardTilt.rotateX}deg) rotateY(${profileCardTilt.rotateY}deg)`,
            transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          {/* Card Background Layer */}
          <div
            className="absolute inset-0 bg-primary-container rounded-3xl shadow-2xl transition-transform duration-500"
            style={{ transform: 'translateZ(-35px) rotate(6deg)' }}
          />

          {/* Image Layer */}
          <div
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            style={{ transform: 'translateZ(25px)' }}
          >
            <img
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              alt="Portrait of Pratham (Spark)"
              src="/assets/images/char.jpeg"
            />
          </div>

          {/* Floating Badges */}
          <div
            className="absolute -top-3 -left-3 md:-top-4 md:-left-4 glass px-4 py-2 rounded-full shadow-2xl text-xs font-bold font-code text-primary flex items-center gap-2 border border-white/60 pointer-events-none z-20"
            style={{ transform: 'translateZ(55px)' }}
          >
            <Code className="w-4 h-4 text-primary" /> Web Dev
          </div>

          <div
            className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 glass px-4 py-2 rounded-full shadow-2xl text-xs font-bold font-code text-primary flex items-center gap-2 border border-white/60 pointer-events-none z-20"
            style={{ transform: 'translateZ(65px)' }}
          >
            <Bot className="w-4 h-4 text-primary" /> AI Builder
          </div>
        </div>
      </div>
    </section>
  );
}
