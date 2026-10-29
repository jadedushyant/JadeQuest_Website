"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  lite?: boolean;
}

export function ParticleField({ count = 600, lite = false }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const actualCount = lite ? Math.min(count, 150) : count;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const col = new Float32Array(actualCount * 3);

    const cyan = new THREE.Color("#22D3EE");
    const purple = new THREE.Color("#8B5CF6");
    const white = new THREE.Color("#F5F7FA");

    for (let i = 0; i < actualCount; i++) {
      // Spread in a cylindrical / spherical volume around center
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 8;
      const y = (Math.random() - 0.5) * 10;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius - 2;

      // Color distribution: 50% cyan, 35% purple, 15% white
      const r = Math.random();
      const chosenColor = r < 0.5 ? cyan : r < 0.85 ? purple : white;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

    }

    return [pos, col];
  }, [actualCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.04;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={lite ? 0.05 : 0.07}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
