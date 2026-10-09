import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

interface TechTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TechText({ text, className = '', delay = 0 }: TechTextProps) {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === " " || char === "\n") return char;
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        // Make the animation finish in a reasonable time (e.g. max 1.5 seconds)
        // 1500ms / 30ms = 50 steps.
        const step = Math.max(1 / 3, text.length / 50);
        iteration += step;
      }, 30);
    };

    const timeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, isInView, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i !== displayText.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
      {!displayText && <span className="opacity-0">{text.split('\n')[0]}</span>}
    </span>
  );
}
