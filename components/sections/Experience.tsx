"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Download } from "lucide-react";
import { experienceData } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";

const { heading, subtitle, items } = experienceData;

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="deneyim" ref={sectionRef} className="py-24 px-6 bg-card/20 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto max-w-4xl relative">
        <SectionHeading label="04" title={heading} subtitle={subtitle} />

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Base dim line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          {/* Animated accent line */}
          <motion.div
            className="absolute left-6 top-0 w-0.5 bg-accent origin-top"
            style={{ scaleY: lineScaleY, height: "100%" }}
          />

          {/* Experience items */}
          <div className="space-y-10">
            {items.map((item, i) => (
              <Reveal key={i} delay={i * 0.15} direction="up">
                <div className="relative pl-16">
                  {/* Timeline dot */}
                  <div className="absolute left-5.25 top-6 w-2.5 h-2.5 rounded-full bg-accent border-2 border-background shadow-[0_0_8px_rgba(59,130,246,0.6)] -translate-x-1/2" />

                  <TiltCard>
                    <div className="rounded-xl border border-border bg-card/60 p-6 hover:border-accent/30 transition-colors duration-300">
                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground leading-snug">
                            {item.company}
                          </h3>
                          <p className="text-accent font-medium mt-0.5">{item.role}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono border border-accent/20 whitespace-nowrap">
                            {item.period}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded text-xs font-mono border border-border text-muted-foreground bg-background/50 hover:border-accent/40 hover:text-accent transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CV download CTA */}
        <Reveal delay={0.3} className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Tüm deneyim ve eğitim bilgileri için CV&apos;me göz atabilirsiniz.
          </p>
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            CV İndir
          </a>
        </Reveal>
      </div>
    </section>
  );
}
