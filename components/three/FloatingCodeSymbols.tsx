"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group } from "three";

const SYMBOLS = ["</>", "{ }", "()", "=>", "[]", "++", "?:", "#", "fn", "::"];

interface SymbolDatum {
  symbol: string;
  pos: [number, number, number];
  speed: number;
  rot: number;
}

export default function FloatingCodeSymbols() {
  const groupRef = useRef<Group>(null);

  const data = useMemo<SymbolDatum[]>(
    () =>
      SYMBOLS.map((symbol, i) => ({
        symbol,
        pos: [
          (((i * 137.5) % 10) - 5) * 0.5,
          (((i * 73.1) % 8) - 4) * 0.45,
          (((i * 41.7) % 4) - 2) * 0.6,
        ],
        speed: 0.12 + (i % 5) * 0.05,
        rot: (i / SYMBOLS.length) * Math.PI,
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const d = data[i];
      child.position.y =
        d.pos[1] + Math.sin(state.clock.elapsedTime * d.speed + i * 0.8) * 0.28;
      child.rotation.z = d.rot + state.clock.elapsedTime * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {data.map((d, i) => (
        <Text
          key={i}
          position={d.pos}
          fontSize={0.13}
          color="#3B82F6"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.35}
          outlineWidth={0}
        >
          {d.symbol}
        </Text>
      ))}
    </group>
  );
}
