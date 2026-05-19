"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeroSceneFallback from "./HeroSceneFallback";

const SkillsOrbit = dynamic(() => import("./SkillsOrbit"), {
  ssr: false,
  loading: () => <HeroSceneFallback />,
});

export default function LazySkillsOrbit() {
  const [isCapable, setIsCapable] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const isDesktop =
      window.innerWidth >= 1024 &&
      window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const conn = (navigator as { connection?: { effectiveType?: string } })
      .connection;
    const goodConnection =
      !conn || !["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "");

    if (!isDesktop || reducedMotion || !goodConnection) return;

    setIsCapable(true);

    const idle =
      (window as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void })
        .requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));

    idle(() => setShouldLoad(true), { timeout: 2000 });
  }, []);

  if (!isCapable || !shouldLoad) return <HeroSceneFallback />;
  return <SkillsOrbit />;
}
