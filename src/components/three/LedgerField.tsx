"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { buildLedger } from "./ledgerLayout";
import { linesFragment, linesVertex, pointsFragment, pointsVertex } from "./ledgerShaders";
import type { LedgerUniforms } from "./ledgerUniforms";

type LedgerFieldProps = {
  uniforms: LedgerUniforms;
  /** Element whose bounds define pointer coordinates (the hero) */
  trackRef: RefObject<HTMLElement | null>;
  /** Render loop runs only while the hero is on screen */
  active: boolean;
  /** Fewer particles for touch devices / small screens */
  lite?: boolean;
};

const CAMERA_Z = 10;

function Field({ uniforms, trackRef, lite }: Omit<LedgerFieldProps, "active">) {
  const viewport = useThree((s) => s.viewport);
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const pointer = useRef({ x: 0, y: 0, inside: false });

  // Rebuild only when the visible area changes noticeably.
  const w = Math.round(viewport.width * 4) / 4;
  const h = Math.round(viewport.height * 4) / 4;

  const { pointsGeo, linesGeo } = useMemo(() => {
    const layout = buildLedger({
      width: w * 1.08,
      height: h * 1.08,
      cols: lite ? 4 : 9,
      rows: lite ? 6 : 5,
      perBlock: lite ? 44 : 72,
      dust: lite ? 500 : 1400,
    });
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(layout.points, 3));
    pointsGeo.setAttribute("aTarget", new THREE.BufferAttribute(layout.pointTargets, 3));
    pointsGeo.setAttribute("aRandom", new THREE.BufferAttribute(layout.pointRandom, 1));
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(layout.lines, 3));
    linesGeo.setAttribute("aTarget", new THREE.BufferAttribute(layout.lineTargets, 3));
    linesGeo.setAttribute("aRandom", new THREE.BufferAttribute(layout.lineRandom, 1));
    return { pointsGeo, linesGeo };
  }, [w, h, lite]);

  useEffect(() => () => {
    pointsGeo.dispose();
    linesGeo.dispose();
  }, [pointsGeo, linesGeo]);

  const materials = useMemo(() => {
    const common = {
      uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
      transparent: true,
      depthWrite: false,
    };
    return {
      points: new THREE.ShaderMaterial({ ...common, vertexShader: pointsVertex, fragmentShader: pointsFragment }),
      lines: new THREE.ShaderMaterial({ ...common, vertexShader: linesVertex, fragmentShader: linesFragment }),
    };
  }, [uniforms]);

  useEffect(() => () => {
    materials.points.dispose();
    materials.lines.dispose();
  }, [materials]);

  useEffect(() => {
    uniforms.uPixelRatio.value = gl.getPixelRatio();
  }, [gl, uniforms]);

  // Track the pointer over the hero (the canvas itself sits under the text).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      pointer.current.inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    };
    const onLeave = () => (pointer.current.inside = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [trackRef]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 20);
    uniforms.uTime.value += dt;

    const p = pointer.current;
    const mouse = uniforms.uMouse.value;
    const tx = (p.x * w) / 2;
    const ty = (p.y * h) / 2;
    const ease = 1 - Math.exp(-dt * 6);
    mouse[0] += (tx - mouse[0]) * ease;
    mouse[1] += (ty - mouse[1]) * ease;
    uniforms.uMouseStrength.value += ((p.inside ? 1 : 0) - uniforms.uMouseStrength.value) * ease;

    // Slight camera lean toward the pointer, and a dolly as the hero scrolls out.
    camera.position.x += (p.x * 0.25 - camera.position.x) * ease;
    camera.position.y += (p.y * 0.15 - camera.position.y) * ease;
    camera.position.z = CAMERA_Z - uniforms.uScroll.value * 3;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <lineSegments geometry={linesGeo} material={materials.lines} frustumCulled={false} />
      <points geometry={pointsGeo} material={materials.points} frustumCulled={false} />
    </>
  );
}

/** The hero's WebGL layer. Loaded with next/dynamic (no SSR). */
export default function LedgerField({ uniforms, trackRef, active, lite }: LedgerFieldProps) {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, CAMERA_Z], fov: 45, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Field uniforms={uniforms} trackRef={trackRef} lite={lite} />
    </Canvas>
  );
}
