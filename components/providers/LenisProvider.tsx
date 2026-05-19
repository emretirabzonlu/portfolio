"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisStore } from "@/lib/lenis-store";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    lenisStore.set(lenis);

    // ── Critical: tie Lenis ↔ GSAP ScrollTrigger ──────────────────────────────
    // ScrollTrigger recalculates on every Lenis scroll tick
    lenis.on("scroll", ScrollTrigger.update);
    // GSAP ticker drives Lenis RAF (replaces our own requestAnimationFrame)
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Intercept anchor clicks for Lenis-aware smooth navigation
    const handleAnchorClick = (e: Event) => {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;
      const target = document.querySelector(anchor.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -64 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisStore.set(null);
    };
  }, []);

  return <>{children}</>;
}
