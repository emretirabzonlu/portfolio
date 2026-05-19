"use client";

import { motion } from "framer-motion";

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function LiquidButton({ children, href, onClick, className = "" }: LiquidButtonProps) {
  const inner = (
    <motion.span
      className={`relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white overflow-hidden group cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
    >
      {/* Layer 1: animated gradient base */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #3B82F6 100%)",
          backgroundSize: "300% 300%",
          animation: "liquidShift 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Layer 2: moving inner shine */}
      <span
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 55%)",
          animation: "liquidShine 4s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Layer 3: hover glow ring */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow:
            "0 0 36px rgba(59,130,246,0.65), 0 0 80px rgba(99,102,241,0.3)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.span>
  );

  if (href) {
    return <a href={href}>{inner}</a>;
  }
  return <button onClick={onClick}>{inner}</button>;
}
