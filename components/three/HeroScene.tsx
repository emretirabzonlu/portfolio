"use client";

import { Canvas } from "@react-three/fiber";
import ParticleSphere from "./ParticleSphere";
import FloatingCodeSymbols from "./FloatingCodeSymbols";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <ParticleSphere />
      <FloatingCodeSymbols />
    </Canvas>
  );
}
