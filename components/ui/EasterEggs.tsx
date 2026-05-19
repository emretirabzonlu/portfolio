"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export default function EasterEggs() {
  const seq = useRef<string[]>([]);

  useEffect(() => {
    // Styled console greeting
    console.log(
      "%c  E  T  ",
      "font-size:48px;font-weight:900;color:#3B82F6;background:#0A0A0F;padding:16px 24px;border-radius:12px;letter-spacing:16px;"
    );
    console.log(
      "%cHey, koda bakmayı seven biri misin? 👋\nGitHub'da görüşelim → github.com/emretirabzonlu",
      "color:#A8A8B3;font-size:14px;line-height:1.8;"
    );
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length);
      if (seq.current.join(",") === KONAMI.join(",")) {
        // Switch accent to matrix green
        document.documentElement.style.setProperty("--accent", "#22c55e");
        document.documentElement.style.setProperty("--ring", "#22c55e");
        document.documentElement.style.setProperty("--primary", "#22c55e");
        toast("🎉 Easter egg activated! Refresh to revert.", {
          duration: 6000,
          style: { background: "#0A0A0F", border: "1px solid #22c55e", color: "#fff" },
        });
        seq.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null;
}
