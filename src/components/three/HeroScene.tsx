"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GeometricObject } from "./GeometricObject";
import { ParticleField } from "./ParticleField";
import { StaticHeroFallback } from "./StaticHeroFallback";
import { useReducedMotion } from "@/lib/animations/reducedMotion";

function checkWebGLSupport() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("webgl2"))
    );
  } catch {
    return false;
  }
}

interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const [canRender3D, setCanRender3D] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setCanRender3D(!reducedMotion && checkWebGLSupport());
  }, [reducedMotion]);

  // Pause rendering when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track pointer coordinates normalized -1 to 1
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      pointerRef.current = {
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
        active: true,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  if (!canRender3D) {
    return <StaticHeroFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none ${className || ""}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={isVisible ? "always" : "never"}
      >
        <ambientLight intensity={0.4} />
        {/* Electric cyan fill */}
        <pointLight position={[-4, 3, 3]} color="#22D3EE" intensity={18} />
        {/* Electric purple rim */}
        <pointLight position={[5, -3, 2]} color="#8B5CF6" intensity={25} />
        {/* Subtle white center light */}
        <pointLight position={[2, 0, 4]} color="#F5F7FA" intensity={5} />

        <ParticleField count={450} />
        <GeometricObject pointerRef={pointerRef} />
      </Canvas>
    </div>
  );
}

export default HeroScene;

