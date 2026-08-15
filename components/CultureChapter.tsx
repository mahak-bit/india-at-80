"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PATTERNS = [
  {
    name: "Block-print geometry",
    note: "Repeat-stamped motifs, in the spirit of Ajrakh block printing",
    render: (id: string) => (
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="none" />
        <circle cx="8" cy="8" r="2.4" fill="currentColor" />
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </pattern>
    ),
  },
  {
    name: "Lattice / jali",
    note: "Pierced-stone screen geometry, common to jharokha architecture",
    render: (id: string) => (
      <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      </pattern>
    ),
  },
  {
    name: "Stepped tiers",
    note: "Rhythmic tiering, echoing South Indian temple gopuram profiles",
    render: (id: string) => (
      <pattern id={id} width="24" height="12" patternUnits="userSpaceOnUse">
        <path d="M0 12 L6 6 L12 12 L18 6 L24 12" fill="none" stroke="currentColor" strokeWidth="1" />
      </pattern>
    ),
  },
  {
    name: "Field & furrow",
    note: "Linework tracing agrarian field patterns across the plains",
    render: (id: string) => (
      <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="18" y2="18" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="0" x2="0" y2="18" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      </pattern>
    ),
  },
  {
    name: "Woven grid",
    note: "Warp-and-weft structure, the logic beneath every handloom textile",
    render: (id: string) => (
      <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="5" height="5" fill="currentColor" opacity="0.5" />
        <rect x="5" y="5" width="5" height="5" fill="currentColor" opacity="0.5" />
      </pattern>
    ),
  },
  {
    name: "Manuscript rule",
    note: "Border rules and margins, drawn from illuminated manuscript pages",
    render: (id: string) => (
      <pattern id={id} width="22" height="6" patternUnits="userSpaceOnUse">
        <line x1="0" y1="3" x2="22" y2="3" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="3" cy="3" r="1.2" fill="currentColor" />
      </pattern>
    ),
  },
];

const TONES = ["text-saffron", "text-gold", "text-indian-green", "text-ivory", "text-sepia", "text-saffron"];

export default function CultureChapter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const ctx = gsap.context(() => {
      const panels = section.querySelectorAll<HTMLElement>(".pattern-panel");
      gsap.fromTo(
        panels,
        { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#1a0f05] via-near-black to-midnight px-6 py-28 md:px-12"
    >
      <div className="mb-14 max-w-2xl">
        <span className="caption text-saffron">Maximalism, made contemporary</span>
        <h2 className="font-display mt-3 text-4xl leading-tight text-ivory md:text-5xl">
          India in colour is not one style. It&rsquo;s hundreds, layered.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PATTERNS.map((p, i) => {
          const id = `pat-${i}`;
          return (
            <div
              key={p.name}
              className={`pattern-panel relative flex aspect-square flex-col justify-end overflow-hidden rounded-sm border border-line p-5 ${
                reduced ? "" : "opacity-0"
              } ${TONES[i]}`}
            >
              <svg className="absolute inset-0 h-full w-full" aria-hidden>
                {p.render(id)}
                <rect width="100%" height="100%" fill={`url(#${id})`} />
              </svg>
              <div className="relative z-10 bg-midnight/70 p-3 backdrop-blur-sm">
                <h3 className="font-display text-lg text-ivory">{p.name}</h3>
                <p className="caption mt-1 normal-case tracking-normal text-ivory-dim">{p.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
