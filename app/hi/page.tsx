"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { HiIntroAnimation } from "./components/HiIntroAnimation";
import { HiSmartActions } from "./components/HiSmartActions";
import { HiReactionGame } from "./components/HiReactionGame";
import { getContextualGreeting } from "./lib/hi-greeting";

export default function HiPage() {
  const [introComplete, setIntroComplete] = useState(false);
  const greeting = getContextualGreeting();

  return (
    <main className="relative min-h-svh bg-background text-foreground">
      {/* Decorative background logo */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <Logo size={600} className="text-white opacity-[0.02]" />
      </div>

      {/* Intro */}
      <AnimatePresence>
        {!introComplete && (
          <HiIntroAnimation onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-md mx-auto px-6 py-12 flex flex-col items-center min-h-svh justify-center"
          >
            {/* Greeting header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">{greeting.emoji}</div>
              <h1 className="text-3xl font-bold mb-2">{greeting.message}!</h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {greeting.subtitle}
              </p>
            </div>

            {/* Identity card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full bg-card border border-border rounded-3xl p-6 mb-6 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-background border-2 border-accent flex items-center justify-center mb-4">
                <Logo size={44} className="text-white" />
              </div>
              <div className="text-xl font-bold">Emre Tırabzonlu</div>
              <div className="text-accent font-medium text-sm mt-1">
                Full Stack Developer
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                📍 Kocaeli, Türkiye
              </div>
            </motion.div>

            {/* Smart Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="w-full"
            >
              <HiSmartActions />
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-6 mt-6 text-muted-foreground"
            >
              <a
                href="https://linkedin.com/in/emretirabzonlu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors text-sm"
              >
                LinkedIn
              </a>
              <span className="text-border">·</span>
              <a
                href="https://github.com/emretirabzonlu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors text-sm"
              >
                GitHub
              </a>
            </motion.div>

            {/* Mini game */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-full"
            >
              <HiReactionGame />
            </motion.div>

            {/* Portfolio link */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              href="/"
              className="mt-8 text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
            >
              <ChevronDown size={14} />
              Tüm portfolyomu gör
            </motion.a>

            <div className="mt-12 text-xs text-muted-foreground/50">
              © 2026 Emre Tırabzonlu
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
