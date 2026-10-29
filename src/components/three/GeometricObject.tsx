"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface GeometricObjectProps {
  pointerRef: React.RefObject<{ x: number; y: number; active: boolean }>;
  lite?: boolean;
}

export function GeometricObject({ pointerRef, lite = false }: GeometricObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerIcosaRef = useRef<THREE.Mesh>(null);
  const innerOctaRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;

    // Base continuous orbital rotation
    if (outerIcosaRef.current) {
      outerIcosaRef.current.rotation.x = time * 0.15;
      outerIcosaRef.current.rotation.y = time * 0.2;
    }
    if (innerOctaRef.current) {
      innerOctaRef.current.rotation.x = -time * 0.25;
      innerOctaRef.current.rotation.z = time * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.12;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.2) * 0.1;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 2.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Pointer responsiveness: smoothly tilt group toward pointer
    const ptr = pointerRef.current;
    if (ptr && ptr.active && !lite) {
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, ptr.x * 0.6, 0.05);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -ptr.y * 0.4, 0.05);
    } else {
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, 0, 0.02);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0, 0.02);
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      {/* Outer crystalline wireframe icosahedron */}
      <mesh ref={outerIcosaRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          wireframe
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={0.3}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Inner octahedron in purple */}
      <mesh ref={innerOctaRef}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          wireframe
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital data ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Dense luminous inner core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial
          color="#F5F7FA"
          emissive="#22D3EE"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}
