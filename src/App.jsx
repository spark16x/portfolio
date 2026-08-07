import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import IntroScreen from './components/IntroScreen';
import './script.js';

function App() {
  useEffect(() => {
    // We can dispatch DOMContentLoaded manually or modify script.js to initialize directly
    // Let's modify script.js to expose an initialization function and run it here.
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-primary selection:text-on-primary min-h-screen">
      <CustomCursor />
      <IntroScreen />

      {/* Atmospheric Blurs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-container/30 blur-[120px] -z-10 animate-float" data-parallax-speed="-35"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-tertiary-fixed/30 blur-[100px] -z-10 animate-float" style={{ animationDelay: '-6s' }} data-parallax-speed="30"></div>

      {/* Back to Top Button */}
      <button aria-label="Back to top"
          className="fixed bottom-lg right-lg z-[60] bg-primary text-on-primary w-12 h-12 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 btn-fill btn-fill-inverse"
          id="back-to-top" onClick={() => window.scrollTo(0,0)}>
          <span className="material-symbols-outlined">arrow_upward</span>
      </button>

      {/* Mobile Motion Active Chip */}
      <div id="mobile-motion-chip"
          className="fixed bottom-lg left-lg z-[60] hidden md:hidden glass px-3 py-1.5 rounded-full shadow-lg border border-white/40 text-[11px] font-code font-semibold text-primary items-center gap-1.5 backdrop-blur-md pointer-events-none transition-all">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>3D Tilt Motion</span>
      </div>

      <Header />

      <main className="max-w-container-max mx-auto px-gutter">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
