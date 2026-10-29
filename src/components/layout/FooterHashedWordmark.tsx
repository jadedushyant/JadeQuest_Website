"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/lib/animations/reducedMotion";

const NUM_LINES = 44;

interface FooterHashedWordmarkProps {
  soundEnabled: boolean;
}

export function FooterHashedWordmark({ soundEnabled }: FooterHashedWordmarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSoundTime = useRef(0);
  const lastLineHovered = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  // Highlight state for each line: 0 = resting, 1 = maximum hover intensity
  const [lineIntensities, setLineIntensities] = useState<number[]>(() =>
    Array(NUM_LINES).fill(0)
  );

  const playChime = useCallback((normalizedY: number) => {
    if (!soundEnabled || typeof window === "undefined") return;
    const now = performance.now();
    if (now - lastSoundTime.current < 40) return;
    lastSoundTime.current = now;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }

      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pentatonic scale mapping: high note at top, resonant note at bottom
      const baseFreq = 340;
      const freq = baseFreq + (1 - normalizedY) * 520;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // Audio not supported or gesture restricted
    }
  }, [soundEnabled]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const relY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const targetLineIndex = Math.floor(relY * NUM_LINES);

    if (targetLineIndex !== lastLineHovered.current) {
      lastLineHovered.current = targetLineIndex;
      playChime(relY);
    }

    setLineIntensities((prev) =>
      prev.map((_, i) => {
        const dist = Math.abs(i - targetLineIndex);
        if (dist === 0) return 1;
        if (dist === 1) return 0.75;
        if (dist === 2) return 0.45;
        if (dist === 3) return 0.2;
        return 0;
      })
    );
  };

  const handlePointerLeave = () => {
    lastLineHovered.current = null;
    setLineIntensities(Array(NUM_LINES).fill(0));
  };

  // Subtle ambient wave when resting
  useEffect(() => {
    if (reducedMotion) return;
    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.03;
      if (lastLineHovered.current === null) {
        setLineIntensities((prev) =>
          prev.map((_, i) => {
            const wave = Math.sin(time + i * 0.25);
            return wave > 0.6 ? (wave - 0.6) * 0.6 : 0;
          })
        );
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  // Height and Y coordinates for lines
  const lines = Array.from({ length: NUM_LINES }, (_, i) => {
    const yPercent = (i / (NUM_LINES - 1)) * 96 + 2; // 2% to 98%
    const intensity = lineIntensities[i] || 0;
    return { id: i, y: yPercent, intensity };
  });

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full overflow-hidden select-none cursor-crosshair group pt-4 pb-2"
      aria-label="Interactive jadequest hashed wordmark"
    >
      {/* Background ambient atmospheric glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-transparent to-transparent"
      />

      <svg
        viewBox="0 0 1600 380"
        className="w-full h-auto max-h-[380px] drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="jadequest-text-mask">
            <text
              x="50%"
              y="68%"
              textAnchor="middle"
              className="font-sans font-bold"
              style={{
                fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
                fontSize: "270px",
                letterSpacing: "-0.04em",
                fontWeight: 800,
              }}
            >
              jadequest
            </text>
          </clipPath>

          <linearGradient id="jq-line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#F5F7FA" stopOpacity="1" />
            <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Faint wireframe background outline of lowercase text */}
        <text
          x="50%"
          y="68%"
          textAnchor="middle"
          className="font-sans font-bold"
          style={{
            fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
            fontSize: "270px",
            letterSpacing: "-0.04em",
            fontWeight: 800,
          }}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1.2"
        >
          jadequest
        </text>

        {/* The parallel horizontal scanlines clipped inside the lowercase letters */}
        <g clipPath="url(#jadequest-text-mask)">
          {lines.map(({ id, y, intensity }) => {
            const isLit = intensity > 0.05;
            const strokeColor = isLit
              ? "url(#jq-line-glow)"
              : "rgba(255, 255, 255, 0.28)";
            const strokeWidth = isLit ? 2.4 + intensity * 2.2 : 1.2;
            const opacity = isLit ? 0.95 : 0.45;

            return (
              <line
                key={id}
                x1="0"
                y1={`${y}%`}
                x2="1600"
                y2={`${y}%`}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeOpacity={opacity}
                className="transition-all duration-100 ease-out"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
