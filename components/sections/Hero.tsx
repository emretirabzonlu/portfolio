"use client";

import { motion, type Variants } from "framer-motion";
import { Download, ChevronDown, Mail } from "lucide-react";
import { heroData } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import HeroSceneFallback from "@/components/three/HeroSceneFallback";
import LazyHeroScene from "@/components/three/LazyHeroScene";

// ─── Inline brand icons (lucide-react has no brand icons) ─────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialIconMap = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  mail: <Mail size={20} />,
};

// ─── Framer Motion variants ───────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const nameContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const instantVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const Scene = prefersReduced ? HeroSceneFallback : LazyHeroScene;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Mobile: 3D as absolute background ── */}
      <div
        className="absolute inset-0 lg:hidden opacity-40 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      >
        <Scene />
      </div>

      {/* ── Main grid ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: content ── */}
          <motion.div
            variants={prefersReduced ? instantVariants : containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Status badge */}
            <motion.div variants={prefersReduced ? instantVariants : fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Yeni projelere açık
              </span>
            </motion.div>

            {/* Name — words are wrapped in whitespace-nowrap to prevent mid-word breaks */}
            {prefersReduced ? (
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
                <span className="inline-block whitespace-nowrap">Emre</span>{" "}
                <span className="inline-block whitespace-nowrap">Tırabzonlu</span>
              </h1>
            ) : (
              <motion.h1
                variants={nameContainerVariants}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none"
                aria-label={heroData.name}
              >
                {heroData.name.split(" ").map((word, wi, words) => (
                  <span key={wi} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, ci) => (
                      <motion.span
                        key={`${wi}-${ci}`}
                        variants={charVariants}
                        className="inline-block"
                        aria-hidden="true"
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wi < words.length - 1 && (
                      <motion.span
                        key={`sp-${wi}`}
                        variants={charVariants}
                        className="inline-block"
                        aria-hidden="true"
                      >
                        {" "}
                      </motion.span>
                    )}
                  </span>
                ))}
              </motion.h1>
            )}

            {/* Role */}
            <motion.p
              variants={prefersReduced ? instantVariants : fadeUp}
              className="text-2xl lg:text-3xl font-medium text-muted-foreground"
            >
              Full{" "}
              <span className="text-accent">Stack</span>
              {" "}Developer
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={prefersReduced ? instantVariants : fadeUp}
              className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              {heroData.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={prefersReduced ? instantVariants : fadeUp}
              className="flex flex-wrap gap-4"
            >
              <a
                href={heroData.cta.primary.href}
                className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent/90 hover:scale-105 active:scale-95"
              >
                {heroData.cta.primary.label}
              </a>
              <a
                href={heroData.cta.secondary.href}
                download={heroData.cta.secondary.download}
                className="inline-flex items-center gap-2 justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent hover:text-accent hover:scale-105 active:scale-95"
              >
                <Download size={16} />
                {heroData.cta.secondary.label}
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={prefersReduced ? instantVariants : fadeUp}
              className="flex items-center gap-4"
            >
              {heroData.social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  {socialIconMap[s.icon]}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: 3D scene (desktop only) ── */}
          <div
            className="hidden lg:block relative aspect-square max-h-150 w-full"
            style={{
              maskImage: "radial-gradient(ellipse at center, black 55%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 55%, transparent 100%)",
            }}
          >
            <Scene />
          </div>

        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
        animate={prefersReduced ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-mono tracking-widest opacity-60">KEŞFET</span>
        <ChevronDown size={16} className="opacity-60" />
      </motion.div>

    </section>
  );
}
