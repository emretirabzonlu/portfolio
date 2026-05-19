"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  AdditiveBlending,
  Group,
  Points,
} from "three";

// ─── Shaders ──────────────────────────────────────────────────────────────────

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  varying vec3 vColor;

  void main() {
    float t = normalize(position).y * 0.5 + 0.5;
    vColor = mix(
      vec3(0.231, 0.510, 0.965),
      vec3(1.000, 1.000, 1.000),
      t
    );

    float breathe = sin(uTime * 0.8 + position.x * 2.0 + position.y * 3.0 + position.z * 1.5) * 0.05;
    vec3 pos = normalize(position) * (length(position) + breathe);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 3.0;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist);
    float glow  = (1.0 - dist * 2.0) * 0.35;

    gl_FragColor = vec4(vColor + glow, alpha);
  }
`;

// ─── Fibonacci sphere ─────────────────────────────────────────────────────────

const COUNT  = 2000;
const RADIUS = 1.5;

function buildGeometry() {
  const positions = new Float32Array(COUNT * 3);
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;

    positions[i * 3]     = Math.cos(theta) * r * RADIUS;
    positions[i * 3 + 1] = y * RADIUS;
    positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
  }

  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(positions, 3));
  return geo;
}

// ─── Component ────────────────────────────────────────────────────────────────

let frameCount = 0;

export default function ParticleSphere() {
  const groupRef  = useRef<Group>(null);
  const pointsRef = useRef<Points>(null);

  const { geometry, material } = useMemo(() => {
    const geo = buildGeometry();
    const mat = new ShaderMaterial({
      vertexShader:   VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite:  false,
      blending:    AdditiveBlending,
    });
    return { geometry: geo, material: mat };
  }, []);

  useFrame((state, delta) => {
    frameCount++;
    if (frameCount % 2 !== 0) return;

    if (!pointsRef.current || !groupRef.current) return;

    (pointsRef.current.material as ShaderMaterial).uniforms.uTime.value += delta;

    pointsRef.current.rotation.y += 0.05 * delta;
    pointsRef.current.rotation.x += 0.02 * delta;

    groupRef.current.rotation.y +=
      (state.pointer.x * 0.5 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (-state.pointer.y * 0.3 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  );
}
