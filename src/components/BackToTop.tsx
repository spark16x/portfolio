import React, { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { ArrowUp } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function BackToTop() {
  const [visible, setVisible] = useState<boolean>(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed bottom-lg right-lg z-[60] transition-all duration-400 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24 pointer-events-none'
      }`}
    >
      <MagneticButton
        as="button"
        onClick={scrollToTop}
        ariaLabel="Back to top"
        variant="inverse"
        className="bg-primary text-on-primary w-12 h-12 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90"
      >
        <ArrowUp className="w-5 h-5 text-on-primary transition-colors" />
      </MagneticButton>
    </div>
  );
}
