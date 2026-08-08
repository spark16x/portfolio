import React from 'react';
import TiltCard from './TiltCard';
import { ArrowRight, Share2 } from 'lucide-react';

export default function Clients() {
  return (
    <section className="py-xl" id="clients">
      <div className="text-center mb-xl">
        <h2 className="font-headline-lg text-headline-lg">Clients & Products</h2>
        <p className="text-secondary font-body-md">SaaS products I've launched and brands I've helped grow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md max-w-4xl mx-auto">
        {/* AYD Sports Academy */}
        <TiltCard className="bg-white p-lg rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-12 h-12 rounded-full bg-[#ff6b00]/10 flex items-center justify-center text-[#ff6b00] group-hover:scale-110 transition-transform duration-300">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#ff6b00]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19.93C8.44 19.43 5 15.65 5 11C5 8.94 5.76 7.06 6.99 5.62C8.38 8.15 10.96 10.22 14.12 11.23C13.84 12.35 13.92 13.56 14.38 14.73C14.71 15.54 15.24 16.27 15.91 16.89C15.01 18.25 14.05 19.26 13 19.93ZM15.91 16.89C16.94 15.91 17.65 14.61 17.9 13.15C18.15 11.69 17.93 10.15 17.29 8.81C16.71 7.6 15.82 6.6 14.72 5.92C15.57 5.34 16.59 5 17.66 5C18.42 5 19.14 5.16 19.8 5.46C20.57 6.8 21 8.35 21 10C21 13.63 18.84 16.76 15.91 16.89Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md leading-none text-primary">AYD Sports Academy</h3>
                  <span className="text-xs text-[#ff6b00] font-medium tracking-wider uppercase font-code">
                    Sports & Fitness
                  </span>
                </div>
              </div>
              <span className="bg-[#ff6b00]/10 text-[#ff6b00] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Client Work
              </span>
            </div>
            <p className="font-body-md text-body-md text-secondary mb-md">
              Designed and developed a premium, responsive landing page featuring class registration, membership management, and interactive program schedules.
            </p>
            <div className="flex flex-wrap gap-xs mb-lg">
              <span className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">
                Next.js
              </span>
              <span className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">
                Tailwind CSS
              </span>
              <span className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">
                UI/UX
              </span>
            </div>
          </div>
          <a
            href="https://aydsportsacademy.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-xs text-primary font-bold hover:gap-sm transition-all duration-200 group-hover:text-primary-container"
          >
            Visit Live Site <ArrowRight className="w-4 h-4" />
          </a>
        </TiltCard>

        {/* Arcfuse */}
        <TiltCard className="bg-white p-lg rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-12 h-12 rounded-full bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] group-hover:scale-110 transition-transform duration-300">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md leading-none text-primary">Arcfuse</h3>
                  <span className="text-xs text-[#6366f1] font-medium tracking-wider uppercase font-code">
                    AI & Social Media
                  </span>
                </div>
              </div>
              <span className="bg-[#6366f1]/10 text-[#6366f1] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                SaaS Product
              </span>
            </div>
            <p className="font-body-md text-body-md text-secondary mb-md">
              Built and launched Arcfuse, an open-source standard for multi-platform social media that integrates post scheduling, unified messaging, and analytics.
            </p>
            <div className="flex flex-wrap gap-xs mb-lg">
              <span className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">
                Next.js
              </span>
              <span className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">
                Open Source
              </span>
              <span className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm">
                Tailwind CSS
              </span>
            </div>
          </div>
          <a
            href="https://arcfuse.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-xs text-primary font-bold hover:gap-sm transition-all duration-200 group-hover:text-primary-container"
          >
            Visit Live Site <ArrowRight className="w-4 h-4" />
          </a>
        </TiltCard>
      </div>
    </section>
  );
}
