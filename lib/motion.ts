"use client";

import { useSyncExternalStore } from "react";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMedia("(prefers-reduced-motion: reduce)"),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function useIsMobile(breakpoint = 768): boolean {
  const subscribe = (onChange: () => void) => {
    window.addEventListener("resize", onChange);
    return () => window.removeEventListener("resize", onChange);
  };
  return useSyncExternalStore(
    subscribe,
    () => window.innerWidth < breakpoint,
    () => false
  );
}

/** Particle budget: fewer particles on mobile, near-zero motion for reduced-motion users. */
export function particleBudget(base: number, isMobile: boolean, reduced: boolean): number {
  if (reduced) return Math.round(base * 0.15);
  if (isMobile) return Math.round(base * 0.35);
  return base;
}
