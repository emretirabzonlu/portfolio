"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, RotateCcw, X } from "lucide-react";
import { hapticLight, hapticSuccess, playTapSound } from "../lib/hi-haptic";

const EMRE_RECORD_MS = 198;

type GameState = "idle" | "waiting" | "ready" | "tooSoon" | "finished";

export function HiReactionGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<GameState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function startGame() {
    setState("waiting");
    setReactionTime(null);
    const delay = 1500 + Math.random() * 2500;
    timeoutRef.current = setTimeout(() => {
      setState("ready");
      startTimeRef.current = performance.now();
      hapticLight();
    }, delay);
  }

  function handleClick() {
    if (state === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState("tooSoon");
      return;
    }
    if (state === "ready") {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setState("finished");
      if (elapsed < EMRE_RECORD_MS) {
        hapticSuccess();
      } else {
        hapticLight();
      }
    }
  }

  function reset() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState("idle");
    setReactionTime(null);
  }

  function close() {
    reset();
    setIsOpen(false);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => {
          hapticLight();
          playTapSound();
          setIsOpen(true);
        }}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        className="w-full flex items-center justify-center gap-2 p-3 mt-4 bg-card border border-border rounded-2xl text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-all"
      >
        <Gamepad2 size={16} />
        <span>Bir oyun oynayalım mı? 🎮</span>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md bg-card border border-border rounded-3xl p-6"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Kapat"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-4">
            <h3 className="text-xl font-bold mb-1">Tepki Süresi Testi</h3>
            <p className="text-xs text-muted-foreground/70">
              Emre&apos;nin rekoru:{" "}
              <span className="text-accent font-mono">{EMRE_RECORD_MS}ms</span>
            </p>
          </div>

          <motion.button
            onClick={handleClick}
            disabled={state === "idle" || state === "finished" || state === "tooSoon"}
            className={`
              w-full aspect-square rounded-2xl flex flex-col items-center justify-center
              text-center transition-colors
              ${state === "idle" ? "bg-accent/10 border-2 border-dashed border-accent/30" : ""}
              ${state === "waiting" ? "bg-orange-500/20 border-2 border-orange-500/50" : ""}
              ${state === "ready" ? "bg-green-500 border-2 border-green-400" : ""}
              ${state === "tooSoon" ? "bg-red-500/20 border-2 border-red-500/50" : ""}
              ${state === "finished" ? "bg-accent/20 border-2 border-accent" : ""}
            `}
          >
            {state === "idle" && (
              <>
                <div className="text-4xl mb-3">🎯</div>
                <div className="font-medium mb-1">Hazır mısın?</div>
                <div className="text-xs text-muted-foreground">
                  Aşağıdaki butona bas, kutu YEŞİL olunca dokun!
                </div>
              </>
            )}
            {state === "waiting" && (
              <>
                <div className="text-4xl mb-3 animate-pulse">⏳</div>
                <div className="font-medium">Bekle...</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Yeşil olmadan dokunma!
                </div>
              </>
            )}
            {state === "ready" && (
              <>
                <div className="text-5xl mb-2">⚡</div>
                <div className="font-bold text-lg">DOKUN!</div>
              </>
            )}
            {state === "tooSoon" && (
              <>
                <div className="text-4xl mb-3">😅</div>
                <div className="font-medium">Çok erken!</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Yeşil olmasını bekle
                </div>
              </>
            )}
            {state === "finished" && reactionTime !== null && (
              <>
                <div className="text-4xl mb-2">
                  {reactionTime < EMRE_RECORD_MS
                    ? "🏆"
                    : reactionTime < 300
                    ? "⚡"
                    : reactionTime < 400
                    ? "👏"
                    : "👍"}
                </div>
                <div className="text-3xl font-bold text-accent font-mono">
                  {reactionTime}ms
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {reactionTime < EMRE_RECORD_MS
                    ? `Vay! Emre'yi ${EMRE_RECORD_MS - reactionTime}ms geçtin 🎉`
                    : reactionTime < 250
                    ? "Çok hızlısın!"
                    : reactionTime < 350
                    ? "İyi tepki!"
                    : "Fena değil 👍"}
                </div>
              </>
            )}
          </motion.button>

          <div className="mt-4 flex gap-2">
            {state === "idle" && (
              <button
                onClick={startGame}
                className="flex-1 p-3 bg-accent text-white rounded-xl font-medium"
              >
                Başla
              </button>
            )}
            {(state === "tooSoon" || state === "finished") && (
              <button
                onClick={() => {
                  reset();
                  startGame();
                }}
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-accent text-white rounded-xl font-medium"
              >
                <RotateCcw size={16} />
                Tekrar Dene
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
