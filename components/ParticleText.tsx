"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion, useIsMobile, particleBudget } from "@/lib/motion";
import { sampleCanvasAlpha, type Point } from "@/lib/particles";

gsap.registerPlugin(ScrollTrigger);

export default function ParticleText({
  introLine,
  word,
  palette,
  baseBudget = 2000,
  bg = "bg-midnight",
}: {
  introLine?: string;
  word: string;
  palette: string[];
  baseBudget?: number;
  bg?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

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
    const budget = particleBudget(baseBudget, isMobile, reduced);

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

      const step = Math.max(3, Math.round(Math.sqrt((w * h) / budget)));
      const sampled = sampleCanvasAlpha(w, h, step, (c, cw, ch) => {
        const fontSize = Math.min(cw, ch) * 0.32;
        c.fillStyle = "#fff";
        c.font = `700 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(word, cw / 2, ch / 2);
      });
      target = sampled.length > budget ? sampled.sort(() => Math.random() - 0.5).slice(0, budget) : sampled;
      scatter = target.map(() => ({ x: Math.random() * w, y: Math.random() * h }));
      phase = target.map(() => Math.random() * 0.4);
      colors = target.map((_, i) => palette[i % palette.length]);
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
        c.arc(x, y, 1.8, 0, Math.PI * 2);
        c.fill();
      }
      c.globalAlpha = 1;
    }

    draw(0);
    const state = { p: 0 };

    if (reduced) {
      draw(1);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "+=100", pin: false },
      });
      tl.to(introRef.current, { opacity: 0, duration: 0.01 });
      return () => {
        tl.scrollTrigger?.kill();
        window.removeEventListener("resize", onResize);
      };
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=260%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(introRef.current, { opacity: 1, duration: 4 }, 0)
      .to(introRef.current, { opacity: 0, duration: 3 }, 6)
      .to(state, { p: 1, duration: 14, ease: "none", onUpdate: () => draw(state.p) }, 6)
      .to({}, { duration: 6 }, 20);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, isMobile, word, baseBudget, palette]);

  return (
    <section ref={sectionRef} className={`relative h-screen w-full overflow-hidden ${bg}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {introLine && (
        <div ref={introRef} className="absolute inset-0 flex items-center justify-center px-6 opacity-0">
          <h2 className="font-display text-center text-[clamp(2rem,9vw,5.5rem)] leading-tight text-ivory md:text-[clamp(2.5rem,5vw,4.5rem)]">
            {introLine}
          </h2>
        </div>
      )}
    </section>
  );
}
