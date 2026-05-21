"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const techs = [
  ".NET", "React", "TypeScript", "Azure", "Next.js",
  "React Native", "MS SQL", "Tailwind", "Node.js",
  "GSAP", "Entity Framework", "REST API", "Git",
];

export default function TechTicker() {
  const prefersReduced = useReducedMotion();
  const doubled = [...techs, ...techs];

  if (prefersReduced) {
    return (
      <div className="flex flex-wrap gap-3 py-4" aria-hidden="true">
        {techs.map((tech) => (
          <span key={tech} className="text-sm font-mono text-muted-foreground/60">
            {tech}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-4 w-full" aria-hidden="true">
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0A0A0F, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0A0A0F, transparent)" }}
      />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { duration: 30, ease: "linear", repeat: Infinity } }}
      >
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-sm text-muted-foreground font-mono opacity-50 hover:opacity-100 transition-opacity"
          >
            {tech}
            <span className="text-accent ml-3"> ·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
