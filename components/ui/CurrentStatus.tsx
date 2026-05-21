"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function CurrentStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5, ease: "easeOut" as const }}
      className="inline-flex flex-col gap-2.5 p-3 lg:p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl max-w-md"
    >
      <div className="flex items-start gap-3">
        <div className="relative mt-1.5 shrink-0">
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
          <span className="relative block w-2 h-2 rounded-full bg-green-500" />
        </div>
        <p className="text-sm leading-snug">
          <span className="text-foreground font-medium">Şu an </span>
          <span className="text-accent font-semibold">Propex ERP</span>
          <span className="text-foreground"> üzerinde çalışıyorum</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground/70 pl-5">
        <MapPin size={11} />
        <span>Kocaeli, Türkiye · Hybrid</span>
      </div>
    </motion.div>
  );
}
