import React, { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 100;
const FPS = 10;
const FRAME_DURATION = 1000 / FPS; // 100ms
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

  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [wordmarkVisible, setWordmarkVisible] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDismissedRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);

  const getFramePath = (index: number) => {
    const frameNum = String(index + 1).padStart(3, "0");
    return `/Frames/frame_${frameNum}.png`;
  };

  const markSessionStorage = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch (e) {
      console.warn("Unable to save splash state in sessionStorage:", e);
    }
  };

  const dismissSplash = useCallback(() => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    markSessionStorage();
    setIsFadingOut(true);

    setTimeout(() => {
      document.body.style.overflow = "";
      setIsVisible(false);
    }, 700);
  }, []);

  // Keyboard skip listener
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dismissSplash();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, dismissSplash]);

  // Preloading & Animation Lifecycle
  useEffect(() => {
    if (!isVisible) return;

    // Lock body scroll while splash is active
    document.body.style.overflow = "hidden";

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setWordmarkVisible(true);
      const timer = setTimeout(() => {
        dismissSplash();
      }, 1200);
      return () => clearTimeout(timer);
    }

    // Wordmark reveal animation trigger
    const wordmarkTimer = setTimeout(() => {
      setWordmarkVisible(true);
    }, 100);

    // Initialize image cache array
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    // Progressive image preloader
    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[index]) {
          return resolve(imagesRef.current[index]!);
        }
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          imagesRef.current[index] = img;
          resolve(img);
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index + 1}`);
          reject(new Error(`Failed to load frame ${index + 1}`));
        };
      });
    };

    // Preload first batch (first 10 frames), then load rest in background
    const initialBatchSize = 10;
    const preloadFirstBatch = async () => {
      const promises = [];
      for (let i = 0; i < Math.min(initialBatchSize, TOTAL_FRAMES); i++) {
        promises.push(loadFrame(i).catch(() => null));
      }
      await Promise.all(promises);

      // Load rest progressively in background
      for (let i = initialBatchSize; i < TOTAL_FRAMES; i++) {
        if (isDismissedRef.current) break;
        loadFrame(i).catch(() => null);
      }
    };

    preloadFirstBatch();

    // Canvas drawing helper
    const drawFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Find best available frame image (current or last available)
      let img = imagesRef.current[frameIndex];
      if (!img) {
        for (let i = frameIndex - 1; i >= 0; i--) {
          if (imagesRef.current[i]) {
            img = imagesRef.current[i];
            break;
          }
        }
      }

      if (img && img.complete) {
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
          canvas.width = img.naturalWidth || 800;
          canvas.height = img.naturalHeight || 450;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastDrawnFrameRef.current = frameIndex;
      }
    };

    // Animation Loop using requestAnimationFrame & elapsed time
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (isDismissedRef.current) return;

      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const calculatedFrameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(elapsed / FRAME_DURATION)
      );

      const calculatedProgress = Math.min(
        100,
        Math.floor((elapsed / TOTAL_SEQUENCE_DURATION) * 100)
      );

      setProgress(calculatedProgress);

      if (calculatedFrameIndex !== lastDrawnFrameRef.current) {
        drawFrame(calculatedFrameIndex);
      }

      if (elapsed >= TOTAL_SEQUENCE_DURATION) {
        dismissSplash();
      } else {
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };

    // Start loop
    rafIdRef.current = requestAnimationFrame(animate);

    // Safety fallback timeout (13 seconds max)
    const fallbackTimer = setTimeout(() => {
      if (!isDismissedRef.current) {
        dismissSplash();
      }
    }, TOTAL_SEQUENCE_DURATION + 3000);

    return () => {
      clearTimeout(wordmarkTimer);
      clearTimeout(fallbackTimer);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isVisible, dismissSplash]);

  if (!isVisible) return null;

  return (
    <div
      onClick={dismissSplash}
      role="button"
      tabIndex={0}
      aria-label="SPARK intro splash screen. Click or press Escape to skip."
      className={`fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-4 w-full h-full">
        {/* SPARK Wordmark Reveal */}
        <div
          className={`transition-all duration-1000 ease-out mb-6 text-center ${
            wordmarkVisible
              ? "opacity-100 scale-100 blur-0"
              : "opacity-0 scale-90 blur-md"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
            SPARK.
          </h1>
        </div>

        {/* Animation Canvas */}
        <div className="relative w-full max-w-2xl aspect-[16/9] flex items-center justify-center overflow-hidden my-4 rounded-xl shadow-2xl border border-white/10 bg-neutral-950/50 backdrop-blur-sm">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain pointer-events-none"
            width={800}
            height={450}
          />
        </div>

        {/* Progress Indicator & Skip Prompt */}
        <div className="w-full max-w-md mt-6 flex flex-col items-center gap-3">
          <div className="w-full bg-neutral-800/80 h-1.5 rounded-full overflow-hidden p-[1px] border border-white/10">
            <div
              className="bg-white h-full rounded-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-xs font-mono text-neutral-400">
            <span>{progress}%</span>
            <span className="text-neutral-500 hover:text-white transition-colors">
              Click anywhere to skip ✕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
