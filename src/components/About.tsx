import React from 'react';
import TiltCard from './TiltCard';
import { Rocket } from 'lucide-react';

export default function About() {
  return (
    <section className="py-xl" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
        <div className="space-y-sm">
          <h2 className="font-headline-lg text-headline-lg">
            About <span className="text-secondary">me</span>
          </h2>
          <h3 className="font-headline-md text-headline-md text-secondary">Full-stack developer</h3>
          <p className="font-body-md text-body-md text-secondary mt-4">
            Hey, I’m Pratham 👋 — a Class 12 (Commerce) student and a passionate developer. I love creating futuristic web experiences and currently I’m building my own JARVIS-inspired AI assistant.
            <br />
            <br />
            I enjoy experimenting, learning quickly, and shipping ideas that feel both useful and creative. I believe that great software is not just about the code, but about solving real-world problems through thoughtful design and engineering excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-md">
          <TiltCard className="bg-white p-lg rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-display-xl-mobile font-display-xl-mobile text-primary">12th</div>
            <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Class</div>
          </TiltCard>

          <TiltCard className="bg-white p-lg rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-display-xl-mobile font-display-xl-mobile text-primary">AI</div>
            <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">JARVIS Builder</div>
          </TiltCard>

          <TiltCard className="bg-white p-lg rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-display-xl-mobile font-display-xl-mobile text-primary">Web</div>
            <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Experiences</div>
          </TiltCard>

          <TiltCard className="bg-primary p-lg rounded-xl shadow-xl flex flex-col justify-center">
            <Rocket className="text-on-primary w-9 h-9 mb-sm" />
            <div className="text-on-primary font-headline-md text-headline-md">Shipping Ideas</div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
