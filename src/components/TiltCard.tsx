import React, { useRef, useState, useEffect } from 'react';

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
}

type OrientationSubscriber = (angles: { normX: number; normY: number }) => void;

const subscribers = new Set<OrientationSubscriber>();
let isOrientationListening = false;
let initialBeta: number | null = null;
let initialGamma: number | null = null;
let permissionRequested = false;

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return (isMobileUA || isTouch) && window.innerWidth <= 1024;
};

function handleDeviceOrientation(e: DeviceOrientationEvent) {
  let beta = e.beta;   // Pitch [-180, 180]
  let gamma = e.gamma; // Roll [-90, 90]

  if (beta === null || beta === undefined) beta = 0;
  if (gamma === null || gamma === undefined) gamma = 0;

  // Handle landscape rotation
  if (typeof window !== 'undefined' && window.matchMedia('(orientation: landscape)').matches) {
    const temp = beta;
    beta = gamma;
    gamma = -temp;
  }

  // Smooth baseline auto-calibration
  if (initialBeta === null || initialGamma === null) {
    initialBeta = beta;
    initialGamma = gamma;
  } else {
    initialBeta += (beta - initialBeta) * 0.005;
    initialGamma += (gamma - initialGamma) * 0.005;
  }

  // Clamped relative tilt range [-25, 25] degrees mapped to normalized [-1, 1]
  const diffBeta = Math.max(-25, Math.min(25, beta - initialBeta));
  const diffGamma = Math.max(-25, Math.min(25, gamma - initialGamma));

  // tiltX comes from beta (pitch), tiltY comes from gamma (roll)
  const normX = diffBeta / 25;
  const normY = diffGamma / 25;

  subscribers.forEach((callback) => callback({ normX, normY }));
}

function initDeviceOrientationListener() {
  if (typeof window === 'undefined' || isOrientationListening) return;
  isOrientationListening = true;

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    window.addEventListener('deviceorientationabsolute', handleDeviceOrientation, true);
  }

  // iOS 13+ permission handling
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof (DeviceOrientationEvent as any).requestPermission === 'function' &&
    !permissionRequested
  ) {
    const requestPermissions = () => {
      permissionRequested = true;
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((state: string) => {
          if (state === 'granted') {
            // Permission granted; orientation listener is active
          }
        })
        .catch(() => {});
    };
    window.addEventListener('touchstart', requestPermissions, { once: true });
    window.addEventListener('click', requestPermissions, { once: true });
  }
}

function removeDeviceOrientationListener() {
  if (typeof window === 'undefined' || !isOrientationListening) return;
  if (subscribers.size > 0) return;

  isOrientationListening = false;
  initialBeta = null;
  initialGamma = null;
  if (window.DeviceOrientationEvent) {
    window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
    window.removeEventListener('deviceorientationabsolute', handleDeviceOrientation, true);
  }
}

export function subscribeToDeviceOrientation(callback: OrientationSubscriber) {
  subscribers.add(callback);
  initDeviceOrientationListener();
  return () => {
    subscribers.delete(callback);
    removeDeviceOrientationListener();
  };
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

  useEffect(() => {
    if (!isMobileDevice()) return;

    const unsubscribe = subscribeToDeviceOrientation(({ normX, normY }) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tiltX = (normY * -maxTilt).toFixed(2);
      const tiltY = (normX * maxTilt).toFixed(2);

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`,
        transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
        transformStyle: 'preserve-3d'
      });
    });

    return () => {
      unsubscribe();
    };
  }, [maxTilt, perspective]);

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

