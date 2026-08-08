import React, { useState } from 'react';
import { useLenis } from 'lenis/react';
import MagneticButton from './MagneticButton';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' }
];

export interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const target = document.querySelector(href) as HTMLElement | null;
    if (target) {
      const navOffset = -75;
      if (lenis) {
        lenis.scrollTo(target, { offset: navOffset });
      } else {
        const targetPosition = target.getBoundingClientRect().top + window.scrollY + navOffset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 glass border-b border-outline-variant/30">
      <div className="flex justify-between items-center px-gutter py-sm max-w-container-max mx-auto">
        <div id="nav-logo" className="font-headline-md text-headline-md font-bold tracking-tighter text-on-surface">
          Spark.
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-body-md text-body-md transition-all nav-link ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-sm">
          <MagneticButton
            href="https://www.fiverr.com/s/Q7Lj2de"
            target="_blank"
            rel="noopener noreferrer"
            variant="inverse"
            className="bg-primary text-on-primary px-lg py-xs rounded-full font-label-sm text-label-sm active:scale-95 shadow-sm"
          >
            <span>Hire Me</span>
          </MagneticButton>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-primary hover:bg-surface-container rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-outline-variant/20 px-gutter py-md flex flex-col gap-md animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-body-md text-body-md transition-all py-1 ${
                  isActive
                    ? 'text-primary font-bold pl-2 border-l-2 border-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
