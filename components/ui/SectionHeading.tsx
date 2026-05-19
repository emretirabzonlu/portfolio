import Reveal from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ label, title, subtitle, centered }: SectionHeadingProps) {
  return (
    <div className={`space-y-3${centered ? " text-center" : ""}`}>
      <Reveal>
        <p className="text-xs font-mono text-accent tracking-[0.2em] uppercase">
          {label} — {title}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
