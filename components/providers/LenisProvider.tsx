"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisStore } from "@/lib/lenis-store";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isDesktop =
      window.innerWidth >= 1024 &&
      window.matchMedia("(hover: hover)").matches;

    if (!isDesktop) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    lenisStore.set(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

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
