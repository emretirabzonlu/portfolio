"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Mail, MapPin, Clock, Laptop } from "lucide-react";
import { toast } from "sonner";
import { contactData } from "@/lib/data";
import LiquidButton from "@/components/ui/LiquidButton";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

const { label, intro, email, location, social } = contactData;

function GitHubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Word-by-word animated heading — no duplicate h2, this IS the section heading
const words = [
  { text: "Bir", accent: false },
  { text: "şeyler", accent: false },
  { text: "inşa", accent: true },
  { text: "edelim", accent: true },
  { text: "mi?", accent: false },
];

function BigHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <h2
      ref={ref}
      className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight flex flex-wrap justify-center"
      style={{ gap: "0 0.28em" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
          className={w.accent ? "text-accent" : undefined}
        >
          {w.text}
        </motion.span>
      ))}
    </h2>
  );
}

function EmailCopy() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email kopyalandı ✓", {
      duration: 2500,
      style: { background: "#12121A", border: "1px solid #1F1F2A", color: "#fff" },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      onClick={copy}
      whileHover={{ scale: 1.01 }}
      className="inline-flex items-center gap-4 border border-border hover:border-accent/60 rounded-2xl px-6 py-4 cursor-pointer transition-colors duration-200 group max-w-md"
    >
      <span className="font-mono text-base text-foreground truncate">{email}</span>
      <span className="text-muted-foreground group-hover:text-accent transition-colors shrink-0">
        {copied ? <Check className="w-5 h-5 text-accent" /> : <Copy className="w-5 h-5" />}
      </span>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section
      id="iletisim"
      className="relative min-h-screen flex items-center py-32 px-6 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-150 h-75 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl w-full text-center relative z-10">
        {/* Small section label — no duplicate h2 */}
        <Reveal>
          <p className="text-xs font-mono text-accent tracking-[0.2em] uppercase mb-4">
            {label} — İletişim
          </p>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">{intro}</p>
        </Reveal>

        {/* The one big heading */}
        <div className="mb-12">
          <BigHeading />
        </div>

        {/* Email copy */}
        <Reveal delay={0.1}>
          <div className="flex justify-center mb-8">
            <EmailCopy />
          </div>
        </Reveal>

        {/* Liquid CTA */}
        <Reveal delay={0.2}>
          <div className="flex justify-center mb-16">
            <LiquidButton href={`mailto:${email}`}>
              <Mail className="w-5 h-5" />
              Mesaj gönder
            </LiquidButton>
          </div>
        </Reveal>

        {/* Social links */}
        <Reveal delay={0.3}>
          <div className="flex justify-center gap-8 mb-16">
            {social.map((s) => (
              <MagneticButton key={s.name}>
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex items-center justify-center w-14 h-14 rounded-full border border-border text-muted-foreground hover:border-accent hover:text-accent transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  {s.icon === "github" && <GitHubIcon size={22} />}
                  {s.icon === "linkedin" && <LinkedInIcon size={22} />}
                  {s.icon === "mail" && <Mail className="w-5 h-5" />}
                </a>
              </MagneticButton>
            ))}
          </div>
        </Reveal>

        {/* Meta row */}
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Yanıt süresi ~24 saat
            </span>
            <span className="flex items-center gap-1.5">
              <Laptop className="w-3 h-3" />
              Hybrid / Remote
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
