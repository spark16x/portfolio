import React, { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 100;
const FPS = 10;
const FRAME_DURATION = 1000 / FPS; // 100ms per frame
const TOTAL_SEQUENCE_DURATION = TOTAL_FRAMES * FRAME_DURATION; // 10000ms = 10s
const STORAGE_KEY = "has_seen_spark_splash";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const [isHiding, setIsHiding] = useState<boolean>(false);
  const [frameOpacity, setFrameOpacity] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const isFinishedRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const getFramePath = (number: number) => {
    return `/Frames/frame_${String(number).padStart(3, "0")}.png`;
  };

  const markSessionStorage = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch (e) {
      console.warn("Unable to save splash state in sessionStorage:", e);
    }
  };

  const finishSplash = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    markSessionStorage();
    setIsHiding(true);

    setTimeout(() => {
      document.body.style.overflow = "";
      setIsVisible(false);
    }, 900);
  }, []);

  // Keyboard skip handler
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        finishSplash();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, finishSplash]);

  // Preloading & Animation lifecycle
  useEffect(() => {
    if (!isVisible) return;

    // Lock body scroll during splash display
    document.body.style.overflow = "hidden";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      finishSplash();
      return;
    }

    // Preload frames array
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index + 1);
        img.onload = () => {
          imagesRef.current[index] = img;
          resolve(img);
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    // Preload initial frames batch first, then rest
    const preloadFrames = async () => {
      const firstBatch = [];
      for (let i = 0; i < Math.min(10, TOTAL_FRAMES); i++) {
        firstBatch.push(loadFrame(i));
      }
      await Promise.all(firstBatch);

      if (imgRef.current && imagesRef.current[0]) {
        imgRef.current.src = imagesRef.current[0].src;
        setFrameOpacity(1);
      }

      for (let i = 10; i < TOTAL_FRAMES; i++) {
        if (isFinishedRef.current) break;
        loadFrame(i);
      }
    };

    preloadFrames();

    // Playback loop
    let startTime: number | null = null;
    let currentFrameIndex = 0;

    const animate = (timestamp: number) => {
      if (isFinishedRef.current) return;

      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const nextFrameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(elapsed / FRAME_DURATION)
      );

      if (nextFrameIndex !== currentFrameIndex) {
        currentFrameIndex = nextFrameIndex;
        if (imgRef.current) {
          const loadedImg = imagesRef.current[currentFrameIndex];
          imgRef.current.src = loadedImg ? loadedImg.src : getFramePath(currentFrameIndex + 1);
          setFrameOpacity(1);
        }
      }

      if (progressBarRef.current) {
        const pct = Math.min(100, (elapsed / TOTAL_SEQUENCE_DURATION) * 100);
        progressBarRef.current.style.width = `${pct}%`;
      }

      if (elapsed >= TOTAL_SEQUENCE_DURATION) {
        finishSplash();
        return;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    const fallbackTimeout = setTimeout(() => {
      if (!isFinishedRef.current) {
        finishSplash();
      }
    }, TOTAL_SEQUENCE_DURATION + 3000);

    return () => {
      clearTimeout(fallbackTimeout);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isVisible, finishSplash]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes spark-reveal {
          0% {
            opacity: 0;
            transform: scale(0.92);
            filter: blur(10px);
          }
          60% {
            opacity: 1;
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        .spark-brand-reveal {
          animation: spark-reveal 1200ms cubic-bezier(.16, 1, .3, 1) forwards;
        }
      `}</style>

      <div
        id="splash"
        onClick={finishSplash}
        role="button"
        tabIndex={0}
        aria-label="SPARK intro splash screen. Click or press Escape to skip."
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-[900ms] ease-in-out cursor-pointer select-none overflow-hidden ${
          isHiding ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible"
        }`}
      >
        {/* Responsive Frame Image */}
        <img
          ref={imgRef}
          id="frame"
          alt=""
          draggable="false"
          style={{ opacity: frameOpacity }}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-100 ease-linear"
        />

        {/* Brand Typography */}
        <h1
          id="brand"
          className="relative z-10 text-white font-extrabold tracking-[0.22em] pl-[0.22em] text-center spark-brand-reveal mix-blend-difference drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          style={{ fontSize: "clamp(42px, 12vw, 120px)" }}
        >
          SPARK
        </h1>

        {/* Progress Bar */}
        <div
          id="progress"
          className="absolute bottom-[38px] left-1/2 -translate-x-1/2 w-[100px] h-[1px] bg-[#222] overflow-hidden pointer-events-none z-10"
        >
          <div
            ref={progressBarRef}
            id="progress-bar"
            className="w-0 h-full bg-white transition-[width] duration-75 ease-linear"
          />
        </div>
      </div>
    </>
  );
}
