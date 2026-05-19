"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("visited")) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("visited", "true");
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" as const }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
          aria-hidden="true"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" as const }}
            className="text-white"
          >
            <Logo size={120} />
          </motion.div>

          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" as const }}
            className="h-px bg-accent mt-4"
          />

          {/* Domain */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-4 text-xs font-mono text-muted-foreground tracking-[0.25em] uppercase"
          >
            emretirabzonlu.dev
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
