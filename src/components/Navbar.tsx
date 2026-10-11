import React, { useState } from "react";
import { useLenis } from "lenis/react";
import MagneticButton from "./MagneticButton";
import StaggeredMenu from "./StaggeredMenu";

export interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const lenis = useLenis();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    const target = document.querySelector(href) as HTMLElement | null;
    if (target) {
      const navOffset = -75;
      if (lenis) {
        lenis.scrollTo(target, { offset: navOffset });
      } else {
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY + navOffset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 glass border-b border-outline-variant/30">
      <div className="flex justify-between items-center px-gutter py-sm max-w-container-max mx-auto">
        <div
          id="nav-logo"
          className="font-headline-md text-headline-md font-bold tracking-tighter text-on-surface"
        >
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
                    ? "text-primary font-bold border-b-2 border-primary pb-1"
                    : "text-secondary hover:text-primary"
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

          {/* Mobile Menu (StaggeredMenu) */}
          <div className="md:hidden w-16 h-8 flex items-center justify-end">
            <StaggeredMenu
              position="right"
              logoUrl=""
              items={navItems.map(item => ({
                label: item.label,
                link: item.href,
                onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item.href)
              }))}
              socialItems={[
                { label: 'Twitter', link: 'https://twitter.com' },
                { label: 'GitHub', link: 'https://github.com' },
                { label: 'LinkedIn', link: 'https://linkedin.com' }
              ]}
              menuButtonColor="currentColor"
              openMenuButtonColor="#1a1a1a"
              accentColor="#5227FF"
              colors={['#B497CF', '#5227FF']}
            />
          </div>
        </div>
      </div>


    </nav>
  );
}
