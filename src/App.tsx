import React, { useState, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import AtmosphericBlurs from "./components/AtmosphericBlurs";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TextLoop from "./components/TextLoop";
import Skills from "./components/Skills";
import Clients from "./components/Clients";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ClickSpark from "./components/ClickSpark";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check if the html or body element has a dark class, or respect system preference
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkNow =
            document.documentElement.classList.contains("dark") ||
            document.body.classList.contains("dark");
          setTheme(isDarkNow ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Track scroll position to update active section in Navbar
  useLenis(({ scroll }) => {
    const sections = document.querySelectorAll(
      "section[id]",
    ) as NodeListOf<HTMLElement>;
    const scrollPosition = scroll + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        if (sectionId) {
          setActiveSection(sectionId);
        }
      }
    });
  });

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 2,
      }}
    >
      <ClickSpark
        sparkColor={theme === "dark" ? "#fff" : "#000"}
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-primary selection:text-on-primary">
          <AtmosphericBlurs />
          <Navbar activeSection={activeSection} />
          <main className="max-w-container-max mx-auto px-gutter">
            <Hero />
            <div className="py-12">
              <TextLoop
                text="spark"
                shape="line"
                speed={90}
                direction="forward"
                separator="✦"
                curviness={90}
                fontSize={46}
                fontWeight={800}
                letterSpacing={2}
                uppercase
                color={theme === 'dark' ? '#ffffff' : '#000000'}
                ribbon
                ribbonColor={theme === 'dark' ? '#5227FF' : '#E8E2FF'}
                ribbonWidth={86}
                pauseOnHover
              />
            </div>
            <About />
            <Skills />
            <Clients />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </ClickSpark>
    </ReactLenis>
  );
}
