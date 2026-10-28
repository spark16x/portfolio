import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

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
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const isFinishedRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Web Audio Context & Gain references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const audioStartedRef = useRef<boolean>(false);

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

  // Web Audio Synth sound generator for futuristic splash soundscape
  const startAudio = useCallback(() => {
    if (audioStartedRef.current || isFinishedRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      const now = ctx.currentTime;

      // 1. Low Sub-Bass Ambient Pad (60Hz -> 40Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(60, now);
      subOsc.frequency.exponentialRampToValueAtTime(40, now + 9);
      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.35, now + 1.5);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 9.5);
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(now);
      subOsc.stop(now + 10);

      // 2. Mid Synth Drone with Low-pass Filter Sweep
      const droneOsc = ctx.createOscillator();
      const droneFilter = ctx.createBiquadFilter();
      const droneGain = ctx.createGain();
      droneOsc.type = "sawtooth";
      droneOsc.frequency.setValueAtTime(110, now); // A2
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(200, now);
      droneFilter.frequency.exponentialRampToValueAtTime(1800, now + 5);
      droneFilter.frequency.exponentialRampToValueAtTime(300, now + 9.5);
      droneGain.gain.setValueAtTime(0.001, now);
      droneGain.gain.linearRampToValueAtTime(0.12, now + 2);
      droneGain.gain.exponentialRampToValueAtTime(0.001, now + 9.5);
      droneOsc.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(masterGain);
      droneOsc.start(now);
      droneOsc.stop(now + 10);

      // 3. Arpeggiated Ambient Chords (Spark Rising Notes)
      const arpeggioNotes = [220, 277.18, 329.63, 440, 554.37, 659.25, 880, 1108.73]; // A major 7th harmonic sequence
      arpeggioNotes.forEach((freq, index) => {
        const noteTime = now + 0.3 + index * 0.8;
        if (noteTime >= now + 8.5) return;

        const arpOsc = ctx.createOscillator();
        const arpGain = ctx.createGain();
        arpOsc.type = "triangle";
        arpOsc.frequency.setValueAtTime(freq, noteTime);

        arpGain.gain.setValueAtTime(0.001, noteTime);
        arpGain.gain.linearRampToValueAtTime(0.08, noteTime + 0.1);
        arpGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.8);

        arpOsc.connect(arpGain);
        arpGain.connect(masterGain);
        arpOsc.start(noteTime);
        arpOsc.stop(noteTime + 2.0);
      });

      // 4. Sparkle / Shimmer High Frequency Rise towards climax
      const shimmerTime = now + 4.5;
      const shimmerOsc = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmerOsc.type = "sine";
      shimmerOsc.frequency.setValueAtTime(880, shimmerTime);
      shimmerOsc.frequency.exponentialRampToValueAtTime(3520, shimmerTime + 3);
      shimmerGain.gain.setValueAtTime(0.001, shimmerTime);
      shimmerGain.gain.linearRampToValueAtTime(0.05, shimmerTime + 1.5);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, shimmerTime + 3.5);
      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(masterGain);
      shimmerOsc.start(shimmerTime);
      shimmerOsc.stop(shimmerTime + 3.8);

      audioStartedRef.current = true;
    } catch (e) {
      console.warn("Failed to start splash audio:", e);
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (audioCtxRef.current && masterGainRef.current) {
      try {
        const ctx = audioCtxRef.current;
        const gain = masterGainRef.current;
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        setTimeout(() => {
          if (ctx.state !== "closed") {
            ctx.close().catch(() => {});
          }
        }, 500);
      } catch (e) {
        console.warn("Error stopping splash audio:", e);
      }
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      const next = !prev;
      if (masterGainRef.current && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime;
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
        masterGainRef.current.gain.linearRampToValueAtTime(next ? 0 : 0.18, now + 0.1);
      }
      return next;
    });
  };

  const finishSplash = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    stopAudio();
    markSessionStorage();
    setIsHiding(true);

    setTimeout(() => {
      document.body.style.overflow = "";
      setIsVisible(false);
    }, 900);
  }, [stopAudio]);

  // Keyboard skip handler
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Any user interaction enables audio context if suspended
      if (!audioStartedRef.current) {
        startAudio();
      }

      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        finishSplash();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, finishSplash, startAudio]);

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

    // Try starting audio on mount
    startAudio();

    // Interaction fallback to unlock Web Audio if autoplay was blocked
    const unlockAudio = () => {
      if (!audioStartedRef.current) {
        startAudio();
      }
    };
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

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
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      stopAudio();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isVisible, finishSplash, startAudio, stopAudio]);

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
        {/* Mute / Unmute Control Button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute splash sound" : "Mute splash sound"}
          title={isMuted ? "Unmute sound" : "Mute sound"}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white/70" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Responsive Frame Image */}
        <img
          ref={imgRef}
          id="frame"
          alt=""
          draggable="false"
          style={{ opacity: frameOpacity }}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-100 ease-linear"
        />

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
