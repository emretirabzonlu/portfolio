"use client";

import type { CSSProperties } from "react";

interface ProjectMockupProps {
  title: string;
  accent: string;
}

const accentBar = (accent: string): CSSProperties => ({
  background: `${accent}40`,
});

export default function ProjectMockup({ title, accent }: ProjectMockupProps) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border bg-card shadow-2xl">
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1A1A24] border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] shrink-0" />
        <div className="flex gap-1 ml-2">
          <div className="px-3 py-0.5 rounded-t-md bg-[#0A0A0F] text-[10px] font-mono text-muted-foreground/70 truncate max-w-22.5">
            {slug}.app
          </div>
          <div className="px-2 py-0.5 rounded-t-md text-[10px] font-mono text-muted-foreground/30">
            +
          </div>
        </div>
        <div className="flex-1" />
        <div className="h-2 w-14 rounded-full bg-white/5" />
      </div>

      {/* App chrome */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "13.5rem",
          background: `linear-gradient(135deg, ${accent}12 0%, ${accent}06 100%)`,
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          } as CSSProperties}
        />

        {/* Inner layout: sidebar + main */}
        <div className="relative z-10 flex h-full">
          {/* Left sidebar */}
          <div className="w-10 shrink-0 border-r border-white/5 py-3 flex flex-col items-center gap-2.5">
            <div className="w-5 h-5 rounded-md" style={{ background: `${accent}60` }} />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-4 h-4 rounded bg-white/10" />
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Toolbar row */}
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5 border-b border-white/5">
              <div className="flex gap-1.5">
                {[44, 28, 36].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-white/10" style={{ width: w }} />
                ))}
              </div>
              <div className="h-5 w-12 rounded" style={{ background: `${accent}50` }} />
            </div>

            {/* Hero strip */}
            <div className="px-3 py-2 flex items-center gap-2 border-b border-white/5">
              <div className="flex-1 flex flex-col gap-1">
                <div className="h-3 w-3/5 rounded-full" style={accentBar(accent)} />
                <div className="h-2 w-4/5 rounded-full bg-white/10" />
              </div>
              <div className="h-6 w-12 rounded-md shrink-0" style={{ background: `${accent}45` }} />
            </div>

            {/* Card grid */}
            <div className="flex-1 px-3 py-2 grid grid-cols-3 gap-1.5 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-md border border-white/5 p-1.5 flex flex-col gap-1"
                  style={{ background: `${accent}08` }}
                >
                  <div className="h-2.5 w-full rounded" style={accentBar(accent)} />
                  <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                  <div className="h-1.5 w-1/2 rounded-full bg-white/8" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accent glow */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-16 blur-2xl opacity-15 rounded-full pointer-events-none"
          style={{ background: accent }}
        />
      </div>
    </div>
  );
}
