"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { hapticWelcome, playWelcomeSound } from "../lib/hi-haptic";
import { getContextualGreeting } from "../lib/hi-greeting";

type Phase = "dot" | "logo" | "ripple" | "greeting" | "done";

interface Props {
  onComplete: () => void;
}

export function HiIntroAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("dot");
  const greeting = getContextualGreeting();

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      hapticWelcome();
      playWelcomeSound();
    }, 300);

    const timings: { phase: Phase; delay: number }[] = [
      { phase: "logo", delay: 300 },
      { phase: "ripple", delay: 700 },
      { phase: "greeting", delay: 1100 },
      { phase: "done", delay: 2000 },
    ];

    const timers = timings.map((t) =>
      setTimeout(() => setPhase(t.phase), t.delay)
    );

    const completeTimer = setTimeout(onComplete, 2200);

    return () => {
      clearTimeout(initialDelay);
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">

        {/* Phase 1: dot */}
        <AnimatePresence>
          {phase === "dot" && (
            <motion.div
              className="absolute w-3 h-3 bg-accent rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Phase 2: logo */}
        <AnimatePresence>
          {(phase === "logo" || phase === "ripple" || phase === "greeting") && (
            <motion.div
              className="absolute"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Logo size={80} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: ripples */}
        <AnimatePresence>
          {(phase === "ripple" || phase === "greeting") && (
            <>
              {[0, 0.3, 0.6].map((delay, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-accent pointer-events-none"
                  initial={{ width: 80, height: 80, opacity: 0.8 }}
                  animate={{ width: 320, height: 320, opacity: 0 }}
                  transition={{ duration: 1.5, delay, ease: "easeOut" }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Phase 4: greeting below logo */}
        <AnimatePresence>
          {phase === "greeting" && (
            <motion.div
              className="absolute left-0 right-0 text-center"
              style={{ top: "calc(50% + 80px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-5xl mb-2">{greeting.emoji}</div>
              <div className="text-2xl font-bold">{greeting.message}!</div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
