"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const DOMAINS = [
  "Space exploration", "Digital infrastructure", "Metro rail", "Highways",
  "Renewable energy", "Startups", "Education access", "Manufacturing",
  "Sports", "Creative industries", "Science & medicine", "Financial inclusion",
];

const LINE_PATH =
  "M 20 260 C 120 260 140 180 240 180 S 360 60 460 60 S 620 140 760 40 S 960 20 1080 20";

export default function ProgressChapter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: reduced ? 0 : len });
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
      gsap.fromTo(
        section.querySelectorAll(".domain-chip"),
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
        }
      );
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="bg-midnight px-6 py-28 md:px-12">
      <span className="caption text-indian-green">Look how far we came</span>
      <h2 className="font-display mt-3 max-w-3xl text-4xl leading-tight text-ivory md:text-5xl">
        A statistic is just a road that hasn&rsquo;t been drawn yet.
      </h2>

      <svg viewBox="0 0 1100 280" className="mt-16 w-full text-indian-green" aria-hidden>
        <path
          ref={pathRef}
          d={LINE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <div className="mt-14 flex flex-wrap gap-3">
        {DOMAINS.map((d) => (
          <span
            key={d}
            className={`domain-chip rounded-full border border-line px-4 py-2 text-sm text-ivory-dim ${
              reduced ? "" : "opacity-0"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </section>
  );
}
