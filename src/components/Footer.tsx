import React from 'react';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-md py-xl w-full max-w-container-max mx-auto px-gutter border-t border-outline-variant/20 mt-xl bg-surface">
      <div className="font-headline-md text-headline-md font-bold text-on-surface">Spark.</div>
      <div className="flex gap-lg">
        <a
          className="font-label-sm text-label-sm text-secondary hover:text-primary transition-all hover:underline nav-link"
          href="https://github.com/spark16x"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="font-label-sm text-label-sm text-secondary hover:text-primary transition-all hover:underline nav-link"
          href="https://instagram.com/spark16.x"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          className="font-label-sm text-label-sm text-secondary hover:text-primary transition-all hover:underline nav-link"
          href="mailto:spark2009971@gmail.com"
        >
          Email
        </a>
      </div>
      <div className="font-label-sm text-label-sm text-secondary opacity-70">
        © 2024 Spark (Pratham Vig). Crafted with precision.
      </div>
    </footer>
  );
}
