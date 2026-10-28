
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Volume2, VolumeX } from "lucide-react";

const TOTAL_FRAMES = 100;
const FPS = 10;
const FRAME_DURATION = 1000 / FPS;
const TOTAL_SEQUENCE_DURATION = TOTAL_FRAMES * FRAME_DURATION;
const STORAGE_KEY = "has_seen_spark_splash";

const AUDIO_PATH = "/audio/spark.mp3";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });

  const [isHiding, setIsHiding] = useState(false);
  const [frameOpacity, setFrameOpacity] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isFinishedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const getFramePath = (number: number) =>
    `/Frames/frame_${String(number).padStart(3, "0")}.png`;

  const markSessionStorage = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Session storage may be unavailable.
    }
  }, []);

  // Start the external MP3 file.
  const startAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || isFinishedRef.current) return;

    audio.muted = isMuted;

    if (audio.paused) {
      void audio.play().catch((error: unknown) => {
        // Browsers may block playback until user interaction.
        console.warn("SPARK audio playback was blocked:", error);
      });
    }
  }, [isMuted]);

  // Fade out audio before stopping playback.
  const stopAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();

    try {
      audio.currentTime = 0;
    } catch {
      // Ignore media seeking errors.
    }
  }, []);

  const toggleMute = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      setIsMuted((previous) => {
        const next = !previous;

        if (audioRef.current) {
          audioRef.current.muted = next;
        }

        return next;
      });
    },
    []
  );

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

    window.setTimeout(() => {
      document.body.style.overflow = "";
      setIsVisible(false);
    }, 900);
  }, [markSessionStorage, stopAudio]);

  // Keyboard controls.
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        finishSplash();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, finishSplash]);

  // Frame preloading and playback.
  useEffect(() => {
    if (!isVisible) return;

    isFinishedRef.current = false;
    startTimeRef.current = null;
    document.body.style.overflow = "hidden";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      finishSplash();
      return () => {
        document.body.style.overflow = "";
      };
    }

    const images = new Array<HTMLImageElement | null>(
      TOTAL_FRAMES
    ).fill(null);

    imagesRef.current = images;

    let cancelled = false;
    let currentFrameIndex = -1;

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const image = new Image();

        image.onload = () => {
          if (!cancelled) {
            images[index] = image;

            // Display the first frame as soon as it loads.
            if (index === 0 && imgRef.current) {
              imgRef.current.src = image.src;
              setFrameOpacity(1);
            }
          }

          resolve();
        };

        image.onerror = () => {
          console.warn(`Unable to load ${getFramePath(index + 1)}`);
          resolve();
        };

        image.src = getFramePath(index + 1);
      });
    };

    // Load the first 10 frames before loading the rest.
    const preloadFrames = async () => {
      await Promise.all(
        Array.from(
          { length: Math.min(10, TOTAL_FRAMES) },
          (_, index) => loadFrame(index)
        )
      );

      if (cancelled || isFinishedRef.current) return;

      // Continue loading the remaining frames in the background.
      for (let i = 10; i < TOTAL_FRAMES; i++) {
        if (cancelled || isFinishedRef.current) break;
        void loadFrame(i);
      }
    };

    void preloadFrames();

    // Animation loop: 100 frames at 10 FPS = 10 seconds.
    const animate = (timestamp: number) => {
      if (cancelled || isFinishedRef.current) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(elapsed / FRAME_DURATION)
      );

      if (frameIndex !== currentFrameIndex) {
        currentFrameIndex = frameIndex;

        const loadedImage = images[frameIndex];

        if (imgRef.current) {
          imgRef.current.src =
            loadedImage?.src || getFramePath(frameIndex + 1);

          setFrameOpacity(1);
        }
      }

      if (progressBarRef.current) {
        const progress = Math.min(
          100,
          (elapsed / TOTAL_SEQUENCE_DURATION) * 100
        );

        progressBarRef.current.style.width = `${progress}%`;
      }

      if (elapsed >= TOTAL_SEQUENCE_DURATION) {
        finishSplash();
        return;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // Safety timeout if the animation loop stalls.
    const fallbackTimeout = window.setTimeout(() => {
      finishSplash();
    }, TOTAL_SEQUENCE_DURATION + 3000);

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimeout);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      stopAudio();
      document.body.style.overflow = "";
    };
  }, [isVisible, finishSplash, stopAudio]);

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
          animation: spark-reveal 1200ms
            cubic-bezier(.16, 1, .3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .spark-brand-reveal {
            animation: none;
          }
        }
      `}</style>

      {/* Custom MP3 soundtrack */}
      <audio
        ref={audioRef}
        src={AUDIO_PATH}
        preload="auto"
        loop={false}
        muted={isMuted}
      />

      <div
        id="splash"
        onClick={finishSplash}
        role="button"
        tabIndex={0}
        aria-label="SPARK intro splash screen. Click or press Escape to skip."
        className={`
          fixed inset-0 z-[9999]
          flex items-center justify-center
          bg-black cursor-pointer select-none
          overflow-hidden
          transition-opacity duration-[900ms] ease-in-out
          ${
            isHiding
              ? "opacity-0 pointer-events-none invisible"
              : "opacity-100 visible"
          }
        `}
      >
        {/* Sound control */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute splash sound" : "Mute splash sound"}
          title={isMuted ? "Unmute sound" : "Mute sound"}
          className="
            absolute top-6 right-6 z-20
            p-2.5 rounded-full
            bg-white/10 hover:bg-white/20
            border border-white/20
            text-white backdrop-blur-md
            transition-colors duration-200
            focus:outline-none focus:ring-2
            focus:ring-white/50
          "
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white/70" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Animation frames */}
        <img
          ref={imgRef}
          id="frame"
          alt=""
          draggable={false}
          style={{ opacity: frameOpacity }}
          className="
            absolute inset-0
            w-full h-full
            object-contain
            pointer-events-none select-none
            transition-opacity duration-100 ease-linear
          "
        />

        {/* Progress indicator */}
        <div
          id="progress"
          className="
            absolute bottom-[38px]
            left-1/2 -translate-x-1/2
            w-[100px] h-[1px]
            bg-[#222] overflow-hidden
            pointer-events-none z-10
          "
        >
          <div
            ref={progressBarRef}
            id="progress-bar"
            className="w-0 h-full bg-white"
          />
        </div>
      </div>
    </>
  );
}
