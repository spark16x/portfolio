import React, { useRef, useState } from 'react';

export interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  variant?: 'primary' | 'inverse';
  as?: 'a' | 'button';
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  as = 'a',
  ariaLabel,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const bgRef = useRef<HTMLSpanElement | null>(null);
  const [transform, setTransform] = useState<string>('translate(0px, 0px)');

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!btnRef.current) return;

    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate(${x * 0.3}px, ${y * 0.3}px)`);

    if (bgRef.current) {
      const fillX = e.clientX - rect.left;
      const fillY = e.clientY - rect.top;
      bgRef.current.style.left = `${fillX}px`;
      bgRef.current.style.top = `${fillY}px`;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!btnRef.current || !bgRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const fillX = e.clientX - rect.left;
    const fillY = e.clientY - rect.top;
    bgRef.current.style.left = `${fillX}px`;
    bgRef.current.style.top = `${fillY}px`;
  };

  const handleMouseLeave = () => {
    setTransform('translate(0px, 0px)');
  };

  const variantClass = variant === 'inverse' ? 'btn-fill-inverse' : 'btn-fill-primary';
  const combinedClassName = `magnetic-btn btn-fill ${variantClass} ${className}`;

  if (as === 'button' || !href) {
    return (
      <button
        ref={btnRef as React.RefObject<HTMLButtonElement>}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={combinedClassName}
        style={{ transform }}
        aria-label={ariaLabel}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <span className="btn-fill-bg" ref={bgRef}></span>
        {children}
      </button>
    );
  }

  return (
    <a
      ref={btnRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={combinedClassName}
      style={{ transform }}
      aria-label={ariaLabel}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      <span className="btn-fill-bg" ref={bgRef}></span>
      {children}
    </a>
  );
}
