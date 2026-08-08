import React, { useEffect, useState } from 'react';

export default function AtmosphericBlurs() {
  const [mobileMotionActive, setMobileMotionActive] = useState<boolean>(false);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null || e.gamma !== null) {
        setMobileMotionActive(true);
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent && ('ontouchstart' in window)) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  return (
    <>
      {/* Atmospheric Blurs */}
      <div
        className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-container/30 blur-[120px] -z-10 animate-float"
        data-parallax-speed="-35"
      />
      <div
        className="fixed bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-tertiary-fixed/30 blur-[100px] -z-10 animate-float"
        style={{ animationDelay: '-6s' }}
        data-parallax-speed="30"
      />

      {/* Mobile Motion Active Chip */}
      {mobileMotionActive && (
        <div
          id="mobile-motion-chip"
          className="fixed bottom-lg left-lg z-[60] md:hidden glass px-3 py-1.5 rounded-full shadow-lg border border-white/40 text-[11px] font-code font-semibold text-primary flex items-center gap-1.5 backdrop-blur-md pointer-events-none transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>3D Tilt Motion</span>
        </div>
      )}
    </>
  );
}
