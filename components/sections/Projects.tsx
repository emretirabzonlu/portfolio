"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, ExternalLink } from "lucide-react";
import { projectsData, type ProjectItem } from "@/lib/data";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { lenisStore } from "@/lib/lenis-store";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import ProjectMockup from "@/components/ui/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

const { heading, subtitle, items } = projectsData;
const ALL = "Tümü";
const CATEGORIES = [ALL, ...Array.from(new Set(items.map((p) => p.category)))];

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.920.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.017 22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ─── Desktop card (no pt-44 — heading is now outside the pin area) ───────────

function DesktopCard({ item, isActive }: { item: ProjectItem; isActive: boolean }) {
  return (
    <div className="project-card w-screen h-full shrink-0 flex items-center">
      <div className="w-full h-full flex items-center px-16 xl:px-24 py-8 gap-12 xl:gap-20">
        {/* Left: mockup */}
        <div className="w-[42%] shrink-0">
          <TiltCard>
            <div
              className="rounded-2xl p-0.75"
              style={{ background: `linear-gradient(135deg, ${item.accent}40, ${item.accent}10)` }}
            >
              <ProjectMockup title={item.title} accent={item.accent} />
            </div>
          </TiltCard>
        </div>

        {/* Right: details */}
        <motion.div
          className="flex-1 min-w-0"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0.35, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
        >
          <span
            className="text-xs font-mono tracking-[0.18em] uppercase"
            style={{ color: item.accent }}
          >
            {item.category}
          </span>

          <h3 className="text-3xl xl:text-4xl font-bold text-foreground mt-2 mb-1 leading-tight">
            {item.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-6">
            <span>{item.role}</span>
            <span className="text-border">·</span>
            <span>{item.company}</span>
            <span className="text-border">·</span>
            <span className="font-mono">{item.year}</span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">{item.description}</p>

          <ul className="space-y-2 mb-6">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: item.accent }} />
                <span className="text-muted-foreground">{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-7">
            {item.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-xs font-mono border border-border text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {(item.links.live || item.links.github) && (
            <div className="flex gap-4">
              {item.links.live && (
                <a
                  href={item.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/70 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Canlı Görüntüle
                </a>
              )}
              {item.links.github && (
                <a
                  href={item.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GitHubIcon /> GitHub
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────

function MobileCard({ item, index }: { item: ProjectItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" as const }}
    >
      <TiltCard className="h-full">
        <div className="rounded-xl overflow-hidden border border-border bg-card hover:border-accent/30 transition-colors duration-300 h-full flex flex-col">
          <div style={{ background: `${item.accent}10` }} className="p-1">
            <ProjectMockup title={item.title} accent={item.accent} />
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <span
              className="text-[11px] font-mono tracking-[0.18em] uppercase mb-1"
              style={{ color: item.accent }}
            >
              {item.category}
            </span>
            <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">
              {item.role} · {item.company} · {item.year}
            </p>
            <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono border border-border text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            {(item.links.live || item.links.github) && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                {item.links.live && (
                  <a href={item.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-accent">
                    <ExternalLink className="w-3.5 h-3.5" /> Canlı
                  </a>
                )}
                {item.links.github && (
                  <a href={item.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground">
                    <GitHubIcon /> GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Filter tabs (shared logic) ───────────────────────────────────────────────

function FilterTabs({
  categories,
  activeCategory,
  activeCardCategory,
  isDesktop,
  onClick,
}: {
  categories: string[];
  activeCategory: string;
  activeCardCategory: string;
  isDesktop: boolean;
  onClick: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const active = isDesktop
          ? cat !== ALL && activeCardCategory === cat
          : activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onClick(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              active
                ? "border-accent text-accent bg-accent/10"
                : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Projects() {
  const gsapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(ALL);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const filteredItems =
    activeCategory === ALL ? items : items.filter((p) => p.category === activeCategory);

  // ── GSAP horizontal scroll (desktop only) ──────────────────────────────────
  useEffect(() => {
    if (!isDesktop || !gsapRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const n = items.length;
    const moveX = (n - 1) * window.innerWidth;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, { x: -moveX, ease: "none" });

      const st = ScrollTrigger.create({
        id: "projects-st",
        animation: tween,
        trigger: gsapRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        snap: {
          snapTo: 1 / (n - 1),
          duration: { min: 0.2, max: 0.4 },
          ease: "power1.inOut",
        },
        end: () => `+=${moveX}`,
        onUpdate(self) {
          stRef.current = self;
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
          setActiveIndex(Math.min(Math.round(self.progress * (n - 1)), n - 1));
        },
      });

      stRef.current = st;
    }, gsapRef);

    return () => ctx.revert();
  }, [isDesktop]); // eslint-disable-line react-hooks/exhaustive-deps

  const jumpToCard = (idx: number) => {
    const st = stRef.current;
    if (!st) return;
    const scrollPos = st.start + (idx / (items.length - 1)) * (st.end - st.start);
    lenisStore.get()?.scrollTo(scrollPos, { duration: 0.8 });
  };

  const handleFilterClick = (cat: string) => {
    if (isDesktop) {
      const idx = cat === ALL ? 0 : items.findIndex((p) => p.category === cat);
      if (idx >= 0) jumpToCard(idx);
    } else {
      setActiveCategory(cat);
    }
  };

  return (
    <section id="projeler" className="relative">

      {/* ── Desktop: heading + filters scroll normally (outside pin) ────── */}
      <div className="hidden lg:flex items-end justify-between gap-8 px-16 xl:px-24 pt-24 pb-10 bg-background">
        <SectionHeading label="03" title={heading} subtitle={subtitle} />
        <div className="pb-1 shrink-0">
          <FilterTabs
            categories={CATEGORIES}
            activeCategory={activeCategory}
            activeCardCategory={items[activeIndex]?.category ?? ""}
            isDesktop={isDesktop}
            onClick={handleFilterClick}
          />
        </div>
      </div>

      {/* ── Desktop: GSAP pin — only the horizontal gallery ─────────────── */}
      <div
        ref={gsapRef}
        className="hidden lg:block relative overflow-hidden bg-background"
        style={{ height: "100vh" }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-border/40 z-30">
          <div
            ref={progressBarRef}
            className="h-full bg-accent origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Card counter */}
        <div className="absolute top-6 right-16 xl:right-24 z-20 font-mono text-sm text-muted-foreground select-none">
          <span className="text-foreground font-semibold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-border mx-1">/</span>
          {String(items.length).padStart(2, "0")}
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${items.length * 100}vw` }}
        >
          {items.map((item, i) => (
            <DesktopCard key={item.id} item={item} isActive={i === activeIndex} />
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpToCard(i)}
              aria-label={`Proje ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-2 bg-accent"
                  : "w-2 h-2 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical grid ──────────────────────────────────────── */}
      <div className="block lg:hidden py-24 px-6">
        <SectionHeading label="03" title={heading} subtitle={subtitle} />

        <div className="mt-8 mb-10">
          <FilterTabs
            categories={CATEGORIES}
            activeCategory={activeCategory}
            activeCardCategory=""
            isDesktop={false}
            onClick={handleFilterClick}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredItems.map((item, i) => (
              <MobileCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
