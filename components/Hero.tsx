"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePrefersReducedMotion, useIsMobile, particleBudget } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Point = { x: number; y: number };

// Archival-fragment palette: desaturated sepia / faded-ink / cream tones,
// standing in for photographs, newsprint and handwritten paper — never a
// literal (and therefore fake) documentary photo.
const PALETTE = ["#c9a24b", "#8a7256", "#f3ecdf", "#a5673f", "#6b7a63", "#9a8264"];

function sampleGlyphPoints(text: string, w: number, h: number, step: number): Point[] {
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const ctx = off.getContext("2d");
  if (!ctx) return [];
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  const fontSize = Math.min(w, h) * (text.length > 2 ? 0.34 : 0.62);
  ctx.font = `700 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2);
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: Point[] = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const alpha = data[(y * w + x) * 4 + 3];
      if (alpha > 120) pts.push({ x, y });
    }
  }
  return pts;
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eightyYearsRef = useRef<HTMLDivElement>(null);
  const ofIndRef = useRef<HTMLDivElement>(null);
  const butRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let glyphPoints: Point[] = [];
    let scatterPoints: Point[] = [];
    let particlePhase: number[] = [];
    let particleColor: string[] = [];
    let dpr = 1;

    const budget = particleBudget(2200, isMobile, reduced);

    function resize() {
      if (!canvas || !section) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = section.clientWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = Math.max(4, Math.round(Math.sqrt((w * h) / budget)));
      const sampled = sampleGlyphPoints("80", w, h, step);
      // Cap to budget by random subsample for consistent perf.
      glyphPoints = sampled.length > budget ? sampled.sort(() => Math.random() - 0.5).slice(0, budget) : sampled;
      scatterPoints = glyphPoints.map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
      }));
      particlePhase = glyphPoints.map(() => Math.random() * 0.3);
      particleColor = glyphPoints.map((_, i) => PALETTE[i % PALETTE.length]);
    }

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    function draw(explodeT: number) {
      if (!canvas) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      c.clearRect(0, 0, w, h);
      for (let i = 0; i < glyphPoints.length; i++) {
        const phase = particlePhase[i];
        let t = (explodeT - phase) / (1 - phase);
        t = Math.min(1, Math.max(0, t));
        const eased = t * t * (3 - 2 * t); // smoothstep
        const gp = glyphPoints[i];
        const sp = scatterPoints[i];
        const x = gp.x + (sp.x - gp.x) * eased;
        const y = gp.y + (sp.y - gp.y) * eased;
        const isFragment = i % 17 === 0;
        c.globalAlpha = 0.55 + 0.45 * (1 - eased);
        c.fillStyle = particleColor[i];
        if (isFragment) {
          c.save();
          c.translate(x, y);
          c.rotate((i % 7) - 3);
          c.fillRect(-3, -4, 6, 8);
          c.restore();
        } else {
          c.beginPath();
          c.arc(x, y, 1.6, 0, Math.PI * 2);
          c.fill();
        }
      }
      c.globalAlpha = 1;
    }

    // explode -> flicker -> reconstruct, driven by one scrubbed value
    const state = { p: 0 };
    draw(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: reduced ? "+=100" : "+=420%",
        scrub: reduced ? false : 1,
        pin: !reduced,
        anticipatePin: 1,
      },
    });

    if (reduced) {
      // Reduced motion: skip straight to the resting states, no particle churn.
      gsap.set(canvas, { opacity: 0 });
      draw(0);
      tl.to(eightyYearsRef.current, { opacity: 1, duration: 0.01 })
        .to(eightyYearsRef.current, { opacity: 0, duration: 0.01 }, "+=0.2")
        .to(ofIndRef.current, { opacity: 1, duration: 0.01 })
        .to(ofIndRef.current, { opacity: 0, duration: 0.01 }, "+=0.2")
        .to(butRef.current, { opacity: 1, duration: 0.01 })
        .to(butRef.current, { opacity: 0, duration: 0.01 }, "+=0.2")
        .to(questionRef.current, { opacity: 1, duration: 0.01 });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        window.removeEventListener("resize", onResize);
      };
    }

    tl.to(state, {
        p: 1,
        duration: 20,
        ease: "none",
        onUpdate: () => draw(state.p),
      }, 4)
      .to(canvas, { opacity: 0, duration: 4 }, 24)
      .to(eightyYearsRef.current, { opacity: 1, duration: 4 }, 22)
      .to(eightyYearsRef.current, { opacity: 0, duration: 3 }, 30)
      .to(ofIndRef.current, { opacity: 1, duration: 4 }, 31)
      .to(ofIndRef.current, { opacity: 0, duration: 3 }, 40)
      .to(butRef.current, { opacity: 1, duration: 4 }, 46)
      .to(butRef.current, { opacity: 0, duration: 3 }, 54)
      .to(questionRef.current, { opacity: 1, duration: 5 }, 58)
      .to(questionRef.current, { opacity: 1, duration: 10 }, 70);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, isMobile]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-midnight">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        ref={eightyYearsRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
      >
        <h2 className="font-display text-[clamp(3.5rem,16vw,13rem)] leading-none tracking-tightest text-ivory">
          80 years
        </h2>
      </div>

      <div ref={ofIndRef} className="absolute inset-0 flex items-center justify-center opacity-0">
        <h2 className="font-display text-[clamp(2rem,9vw,7.5rem)] leading-none tracking-tightest text-ivory-dim">
          of independence
        </h2>
      </div>

      <div ref={butRef} className="absolute inset-0 flex items-center justify-center opacity-0">
        <h2 className="font-display text-[clamp(2.5rem,12vw,9.5rem)] italic leading-none text-saffron">but&hellip;</h2>
      </div>

      <div
        ref={questionRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center opacity-0"
      >
        <Image
          src="/images/hero/freedom-today.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />
        <h2 className="font-display relative text-[clamp(2.2rem,8vw,4.5rem)] leading-[1.05] text-ivory md:text-[clamp(2.8rem,6vw,5.5rem)]">
          What does freedom
        </h2>
        <h2 className="font-display relative text-[clamp(2.2rem,8vw,4.5rem)] leading-[1.05] text-ivory md:text-[clamp(2.8rem,6vw,5.5rem)]">
          look like today?
        </h2>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="caption opacity-50">Scroll</span>
      </div>
    </section>
  );
}
