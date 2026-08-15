"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion, useIsMobile, particleBudget } from "@/lib/motion";
import { sampleCanvasAlpha, type Point } from "@/lib/particles";
import IndianFlag from "./IndianFlag";

gsap.registerPlugin(ScrollTrigger);

const PALETTE = ["#ff7722", "#f3ecdf", "#16874a", "#c9a24b", "#8a7256"];

export default function FinalTransformation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flagRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const dreamRef = useRef<HTMLDivElement>(null);

  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let target: Point[] = [];
    let scatter: Point[] = [];
    let phase: number[] = [];
    let colors: string[] = [];
    let dpr = 1;
    const budget = particleBudget(2000, isMobile, reduced);

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
      const sampled = sampleCanvasAlpha(w, h, step, (c, cw, ch) => {
        const fontSize = Math.min(cw, ch) * 0.6;
        c.fillStyle = "#fff";
        c.font = `700 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText("80", cw / 2, ch / 2);
      });
      target = sampled.length > budget ? sampled.sort(() => Math.random() - 0.5).slice(0, budget) : sampled;
      scatter = target.map(() => ({ x: Math.random() * w, y: Math.random() * h }));
      phase = target.map(() => Math.random() * 0.35);
      colors = target.map((_, i) => PALETTE[i % PALETTE.length]);
    }
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    function draw(t: number) {
      if (!canvas) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      c.clearRect(0, 0, w, h);
      for (let i = 0; i < target.length; i++) {
        let lt = (t - phase[i]) / (1 - phase[i]);
        lt = Math.min(1, Math.max(0, lt));
        const eased = lt * lt * (3 - 2 * lt);
        const s = scatter[i];
        const tg = target[i];
        const x = s.x + (tg.x - s.x) * eased;
        const y = s.y + (tg.y - s.y) * eased;
        c.globalAlpha = 0.4 + 0.6 * eased;
        c.fillStyle = colors[i];
        c.beginPath();
        c.arc(x, y, 1.7, 0, Math.PI * 2);
        c.fill();
      }
      c.globalAlpha = 1;
    }

    draw(0);
    const state = { p: 0 };

    if (reduced) {
      draw(1);
      gsap.set(canvas, { opacity: 0 });
      gsap.set(flagRef.current, { opacity: 1 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: "+=100" } });
      tl.to(flagRef.current, { opacity: 0, duration: 0.01 }, "+=0.3").to(messageRef.current, { opacity: 1, duration: 0.01 });
      return () => {
        tl.scrollTrigger?.kill();
        window.removeEventListener("resize", onResize);
      };
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=380%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(state, { p: 1, duration: 16, ease: "none", onUpdate: () => draw(state.p) }, 0)
      .to({}, { duration: 4 }, 16)
      .to(canvas, { opacity: 0, duration: 4 }, 20)
      .fromTo(flagRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 5 }, 21)
      .to({}, { duration: 5 }, 26)
      .to(flagRef.current, { opacity: 0, duration: 4 }, 31)
      .to(messageRef.current, { opacity: 1, duration: 5 }, 33)
      .to({}, { duration: 6 }, 38)
      .to(messageRef.current, { opacity: 0, duration: 3 }, 44)
      .to(dreamRef.current, { opacity: 1, duration: 4 }, 46)
      .to({}, { duration: 8 }, 50);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, isMobile]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-midnight">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div ref={flagRef} className="absolute inset-0 flex items-center justify-center px-10 opacity-0">
        <IndianFlag className="w-full max-w-xl" />
      </div>

      <div ref={messageRef} className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center opacity-0">
        <h2 className="font-display text-[clamp(2.2rem,10vw,6rem)] leading-none text-ivory md:text-[clamp(2.8rem,6vw,5rem)]">
          Happy 80th Independence Day
        </h2>
        <p className="caption text-ivory-dim">15 August 2026</p>
        <p className="font-display mx-auto mt-6 max-w-xl text-xl italic text-ivory-dim md:text-2xl">
          Freedom was never meant to be a finished story. It is something every generation inherits,
          questions, protects and reimagines.
        </p>
      </div>

      <div ref={dreamRef} className="absolute inset-0 flex items-center justify-center px-6 text-center opacity-0">
        <h2 className="font-display text-[clamp(2rem,9vw,5.5rem)] leading-none tracking-tightest text-saffron md:text-[clamp(2.5rem,5vw,4.5rem)]">
          India, keep dreaming.
        </h2>
      </div>
    </section>
  );
}
