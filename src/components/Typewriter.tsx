import React, { useState, useEffect } from 'react';

const phrases: string[] = [
  'Creative Web Developer',
  'Frontend Builder',
  'Backend Explorer',
  'App Builder'
];

export interface TypewriterProps {
  className?: string;
}

export default function Typewriter({ className = '' }: TypewriterProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (text.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (text.length > 0) {
        timeoutId = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeoutId = setTimeout(() => {}, 500);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, currentPhraseIndex]);

  return (
    <span className={`bg-primary text-on-primary px-2 inline-block typing cursor-blink ${className}`}>
      {text || '\u00A0'}
    </span>
  );
}
