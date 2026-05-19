"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const HOVERABLE = "a, button, [role='button'], input, select, textarea, label";

// Pages where the custom cursor should be suppressed
const EXCLUDED = ["/hi"];

export default function CustomCursor() {
  const pathname = usePathname();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (EXCLUDED.includes(pathname)) {
      setReady(false);
      setIsVisible(false);
      return;
    }
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setReady(true);

    // Keep mutable cursor position outside React state (no re-render per frame)
    const mouse = { x: -400, y: -400 };
    const outer = { x: -400, y: -400 };
    const inner = { x: -400, y: -400 };
    let rafId: number;
    let mouseInWindow = false;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouseInWindow) {
        mouseInWindow = true;
        setIsVisible(true);
      }
    };

    const onOver = (e: MouseEvent) => {
      const hovering = !!(e.target as Element).closest(HOVERABLE);
      outerRef.current?.setAttribute("data-hovering", String(hovering));
      innerRef.current?.setAttribute("data-hovering", String(hovering));
    };

    const onLeave = () => {
      mouseInWindow = false;
      setIsVisible(false);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.body.classList.add("no-cursor");

    const tick = () => {
      outer.x += (mouse.x - outer.x) * 0.1;
      outer.y += (mouse.y - outer.y) * 0.1;
      inner.x += (mouse.x - inner.x) * 0.5;
      inner.y += (mouse.y - inner.y) * 0.5;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(calc(${outer.x}px - 50%), calc(${outer.y}px - 50%))`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(calc(${inner.x}px - 50%), calc(${inner.y}px - 50%))`;
      }

      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("no-cursor");
      cancelAnimationFrame(rafId);
      setReady(false);
      setIsVisible(false);
    };
  }, [pathname]);

  if (!ready || prefersReduced) return null;

  return (
    // Wrapper controls overall visibility without fighting per-element transitions
    <div
      aria-hidden="true"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.15s", pointerEvents: "none" }}
    >
      {/* Outer ring */}
      <div
        ref={outerRef}
        data-hovering="false"
        className={[
          "fixed top-0 left-0 z-9999 pointer-events-none rounded-full",
          "border border-white mix-blend-difference",
          "w-8 h-8 transition-[width,height] duration-200",
          "data-[hovering=true]:w-16 data-[hovering=true]:h-16",
        ].join(" ")}
        style={{
          willChange: "transform",
          transform: "translate(calc(-400px - 50%), calc(-400px - 50%))",
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        data-hovering="false"
        className={[
          "fixed top-0 left-0 z-9999 pointer-events-none rounded-full",
          "w-1.5 h-1.5 bg-white",
          "transition-opacity duration-200 opacity-100",
          "data-[hovering=true]:opacity-0",
        ].join(" ")}
        style={{
          willChange: "transform",
          transform: "translate(calc(-400px - 50%), calc(-400px - 50%))",
        }}
      />
    </div>
  );
}
