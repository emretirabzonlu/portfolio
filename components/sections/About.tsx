import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { aboutData } from "@/lib/data";

export default function About() {
  return (
    <section
      id="hakkimda"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative large number */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -left-8 top-1/2 -translate-y-1/2 font-bold leading-none text-white opacity-[0.025]"
        style={{ fontSize: "clamp(8rem, 20vw, 16rem)" }}
      >
        01
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading label="01" title="Hakkımda" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Paragraphs ── */}
          <div className="lg:col-span-7 space-y-6">
            {aboutData.paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* ── Stat cards ── */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {aboutData.stats.map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <TiltCard className="h-full">
                    <div className="flex flex-col justify-between bg-card border border-border rounded-xl p-6 h-full transition-colors duration-300 hover:border-accent/50">
                      <p className="text-4xl lg:text-5xl font-bold text-accent">
                        <CountUp value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-sm text-muted-foreground mt-3">
                        {stat.label}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
