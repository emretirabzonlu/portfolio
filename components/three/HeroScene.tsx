"use client";

import { Canvas } from "@react-three/fiber";
import ParticleSphere from "./ParticleSphere";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <ParticleSphere />
    </Canvas>
  );
}
