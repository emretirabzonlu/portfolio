"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// ─── Shared geometry (created once per module load) ───────────────────────────
const ORBIT_SPHERE_GEO = new THREE.SphereGeometry(0.04, 8, 8);
const CENTER_SPHERE_GEO = new THREE.SphereGeometry(0.12, 16, 16);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeCirclePoints(radius: number, segments = 80): [number, number, number][] {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const a = (i / segments) * Math.PI * 2;
    return [Math.cos(a) * radius, Math.sin(a) * radius, 0] as [number, number, number];
  });
}

// ─── Single orbit ring ────────────────────────────────────────────────────────

interface OrbitProps {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  count: number;
  color: string;
}

function OrbitRing({ radius, speed, tilt, count, color }: OrbitProps) {
  const spinRef = useRef<THREE.Group>(null);
  const circlePoints = useMemo(() => makeCirclePoints(radius), [radius]);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
      }),
    [color]
  );

  const spherePositions = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        return [Math.cos(a) * radius, Math.sin(a) * radius, 0];
      }),
    [count, radius]
  );

  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.z += speed * delta;
  });

  return (
    <group rotation={tilt}>
      {/* Visible orbit path */}
      <Line points={circlePoints} color="white" opacity={0.12} transparent lineWidth={0.8} />
      {/* Orbiting spheres */}
      <group ref={spinRef}>
        {spherePositions.map((pos, i) => (
          <mesh key={i} position={pos} geometry={ORBIT_SPHERE_GEO} material={mat} />
        ))}
      </group>
    </group>
  );
}

// ─── Scene inner (inside Canvas) ─────────────────────────────────────────────

function Scene() {
  const rootRef = useRef<THREE.Group>(null);

  const centerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        emissive: "#ffffff",
        emissiveIntensity: 1.2,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!rootRef.current) return;
    // Slow auto-rotation
    rootRef.current.rotation.y += 0.3 * delta;
    // Mouse parallax
    rootRef.current.rotation.x +=
      (-state.pointer.y * 0.4 - rootRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={rootRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#3B82F6" distance={4} />

      {/* Central glowing core */}
      <mesh geometry={CENTER_SPHERE_GEO} material={centerMat} />

      {/* Three orbits at different planes */}
      <OrbitRing radius={0.55} speed={0.8}  tilt={[0, 0, 0]}             count={3} color="#3B82F6" />
      <OrbitRing radius={0.85} speed={-0.5} tilt={[Math.PI / 4, 0, 0]}   count={4} color="#60A5FA" />
      <OrbitRing radius={1.15} speed={0.35} tilt={[0, Math.PI / 5, 0]}   count={5} color="#93C5FD" />
    </group>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export default function SkillsOrbit() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
