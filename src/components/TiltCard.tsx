import React, { useRef, useState } from 'react';

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  perspective = 1000
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
    transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
    transformStyle: 'preserve-3d'
  });

  const isMobileDevice = (): boolean => {
    if (typeof window === 'undefined') return false;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return (isMobileUA || isTouch) && window.innerWidth <= 1024;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobileDevice()) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (((cardY - centerY) / centerY) * -maxTilt).toFixed(2);
    const tiltY = (((cardX - centerX) / centerX) * maxTilt).toFixed(2);

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`,
      transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
      transformStyle: 'preserve-3d'
    });
  };

  const handleMouseLeave = () => {
    if (isMobileDevice()) return;
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
      transition: 'transform 0.5s ease',
      transformStyle: 'preserve-3d'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
