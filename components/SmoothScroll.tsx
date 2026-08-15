"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers resize the viewport as their address bar shows/hides on
// scroll. GSAP treats that as a real resize by default and recalculates
// every pinned section's start/end against the new height mid-scroll,
// which is what produces the gaps between sections on phones — the pin
// spacer for a section gets sized against one viewport height, then the
// address bar collapses and the actual scrollable distance no longer
// matches it. This is GSAP's own documented fix.
ScrollTrigger.config({ ignoreMobileResize: true });

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch devices already get smooth, native momentum scrolling — Lenis's
    // wheel-smoothing layer is a desktop nicety that, combined with GSAP's
    // pinned sections, is the other half of the mobile gap/jank issue.
    // Skip it on touch and let native scroll drive ScrollTrigger directly.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (reduced || isTouch) {
      ScrollTrigger.refresh();
      window.addEventListener("load", () => ScrollTrigger.refresh());
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Images loading in after ScrollTrigger's first pass change page
    // layout; without a refresh once everything has actually loaded,
    // those stale measurements are the other source of the gaps.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return <>{children}</>;
}
