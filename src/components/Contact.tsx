import React from 'react';
import MagneticButton from './MagneticButton';

export default function Contact() {
  return (
    <section className="py-xl" id="contact">
      <div className="max-w-3xl mx-auto bg-white p-xl rounded-3xl border border-outline-variant/30 shadow-xl text-center">
        <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg mb-md">
          Let's build something <span className="text-secondary">amazing</span>
        </h2>
        <p className="text-secondary font-body-lg mb-xl">
          Have an idea or project? I’d love to collaborate and turn it into a powerful digital experience.
        </p>

        <div className="flex flex-wrap justify-center gap-md">
          <MagneticButton
            href="mailto:spark2009971@gmail.com"
            variant="primary"
            className="px-xl py-md rounded-full border border-outline-variant text-primary font-label-sm"
          >
            <span>Email Me</span>
          </MagneticButton>

          <MagneticButton
            href="https://github.com/spark16x"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="px-xl py-md rounded-full border border-outline-variant text-primary font-label-sm"
          >
            <span>GitHub</span>
          </MagneticButton>

          <MagneticButton
            href="https://instagram.com/spark16.x"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="px-xl py-md rounded-full border border-outline-variant text-primary font-label-sm"
          >
            <span>Instagram</span>
          </MagneticButton>

          <MagneticButton
            href="https://www.fiverr.com/s/Q7Lj2de"
            target="_blank"
            rel="noopener noreferrer"
            variant="inverse"
            className="px-xl py-md rounded-full bg-primary text-on-primary active:scale-95 font-label-sm shadow-md"
          >
            <span>Hire Me</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
