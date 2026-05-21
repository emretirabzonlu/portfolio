"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import { featuredProjects, otherProjects, projectsData, type ProjectItem } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import ProjectMockup from "@/components/ui/ProjectMockup";

const { heading, subtitle } = projectsData;

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.920.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.017 22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function FeaturedCard({ item, idx }: { item: ProjectItem; idx: number }) {
  const isReversed = idx % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Mockup */}
      <div className="w-full lg:w-[48%] shrink-0">
        <TiltCard>
          <div
            className="rounded-2xl p-0.5"
            style={{ background: `linear-gradient(135deg, ${item.accent}50, ${item.accent}10)` }}
          >
            <ProjectMockup title={item.title} accent={item.accent} />
          </div>
        </TiltCard>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <span
          className="text-xs font-mono tracking-[0.18em] uppercase"
          style={{ color: item.accent }}
        >
          {item.category}
        </span>

        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mt-2 mb-1 leading-tight">
          {item.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-5">
          <span>{item.role}</span>
          <span className="text-border">·</span>
          <span>{item.company}</span>
          <span className="text-border">·</span>
          <span className="font-mono">{item.year}</span>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-5">{item.description}</p>

        <ul className="space-y-2 mb-5">
          {item.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: item.accent }} />
              <span className="text-muted-foreground">{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
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
      </div>
    </motion.div>
  );
}

function OtherCard({ item, idx }: { item: ProjectItem; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
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
            <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">
              {item.role} · {item.company} · {item.year}
            </p>
            <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed line-clamp-3">
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
                  <a
                    href={item.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-accent"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Canlı
                  </a>
                )}
                {item.links.github && (
                  <a
                    href={item.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
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

export default function Projects() {
  return (
    <section id="projeler" className="py-24 px-6 lg:px-16 xl:px-24">
      <SectionHeading label="03" title={heading} subtitle={subtitle} />

      {/* Featured projects */}
      <div className="mt-16 space-y-20 lg:space-y-28">
        {featuredProjects.map((item, idx) => (
          <FeaturedCard key={item.id} item={item} idx={idx} />
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-20">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-mono tracking-[0.18em] uppercase text-muted-foreground shrink-0">
          Diğer Projeler
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Other projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherProjects.map((item, idx) => (
          <OtherCard key={item.id} item={item} idx={idx} />
        ))}
      </div>
    </section>
  );
}
