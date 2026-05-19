import type Lenis from "lenis";

// Module-level singleton — allows Projects to access Lenis for jumpToCard without Context
let instance: Lenis | null = null;

export const lenisStore = {
  set: (lenis: Lenis | null) => { instance = lenis; },
  get: () => instance,
};
