import React from 'react';

export default function Header() {
  return (
    <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-gutter py-sm max-w-container-max mx-auto glass border-b border-outline-variant/30">
        <div id="nav-logo" className="font-headline-md text-headline-md font-bold tracking-tighter text-on-surface">
            Spark.
        </div>
        <div className="hidden md:flex items-center gap-lg">
            <a className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md transition-all nav-link" href="#home">Home</a>
            <a className="text-secondary hover:text-primary transition-colors font-body-md text-body-md nav-link" href="#about">About</a>
            <a className="text-secondary hover:text-primary transition-colors font-body-md text-body-md nav-link" href="#skills">Skills</a>
            <a className="text-secondary hover:text-primary transition-colors font-body-md text-body-md nav-link" href="#clients">Clients</a>
            <a className="text-secondary hover:text-primary transition-colors font-body-md text-body-md nav-link" href="#contact">Contact</a>
        </div>
        <a className="bg-primary text-on-primary px-lg py-xs rounded-full font-label-sm text-label-sm active:scale-95 magnetic-btn btn-fill btn-fill-inverse shadow-sm"
            href="https://www.fiverr.com/s/Q7Lj2de">
            <span>Hire Me</span>
        </a>
    </nav>
  );
}
