import React, { useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import AtmosphericBlurs from './components/AtmosphericBlurs';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track scroll position to update active section in Navbar
  useLenis(({ scroll }) => {
    const sections = document.querySelectorAll('section[id]') as NodeListOf<HTMLElement>;
    const scrollPosition = scroll + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (sectionId) {
          setActiveSection(sectionId);
        }
      }
    });
  });

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, touchMultiplier: 2 }}>
      <div className="min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-primary selection:text-on-primary">
        <AtmosphericBlurs />
        <Navbar activeSection={activeSection} />
        <main className="max-w-container-max mx-auto px-gutter">
          <Hero />
          <About />
          <Skills />
          <Clients />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ReactLenis>
  );
}
