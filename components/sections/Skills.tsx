"use client";

import dynamic from "next/dynamic";
import { Server, Code2, Database, Wrench } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";
import HeroSceneFallback from "@/components/three/HeroSceneFallback";
import { skillsData } from "@/lib/data";
import type { SkillCategory } from "@/lib/data";

const SkillsOrbit = dynamic(() => import("@/components/three/SkillsOrbit"), {
  ssr: false,
  loading: () => <HeroSceneFallback />,
});

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<SkillCategory["icon"], React.ReactNode> = {
  server:   <Server   size={28} className="text-accent" />,
  code:     <Code2    size={28} className="text-accent" />,
  database: <Database size={28} className="text-accent" />,
  wrench:   <Wrench   size={28} className="text-accent" />,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Skills() {
  return (
    <section id="yetenekler" className="min-h-screen py-32 bg-card/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          label="02"
          title="Yetenekler"
          subtitle={skillsData.subtitle}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left: 3D Orbit (desktop only) ── */}
          <div className="hidden lg:flex items-center justify-center lg:sticky lg:top-24 self-start">
            <div className="w-75 h-75">
              <SkillsOrbit />
            </div>
          </div>

          {/* ── Right: Category cards ── */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.15}>
                <TiltCard className="h-full">
                  <div className="flex flex-col bg-card border border-border rounded-2xl p-6 h-full transition-colors duration-300 hover:border-accent/40">

                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-5">
                      {iconMap[cat.icon]}
                      <h3 className="text-lg font-semibold">{cat.title}</h3>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm text-accent transition-all duration-200 hover:scale-105 hover:bg-accent/20 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
