"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";
import { futureEras } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function FutureChapter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const ctx = gsap.context(() => {
      section.querySelectorAll<HTMLElement>(".era-block").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050608] px-6 py-28 md:px-12"
      style={{
        backgroundImage:
          "linear-gradient(rgba(243,236,223,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(243,236,223,0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div className="mx-auto mb-16 max-w-2xl">
        <span className="caption text-ivory-dim">The next 80</span>
        <h2 className="font-display mt-3 text-4xl leading-tight text-ivory md:text-5xl">
          What should India become?
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ivory-dim md:text-xl">
          Not just bigger.
          <br />
          Not just richer.
          <br />
          <span className="text-ivory">Better to live in.</span>
        </p>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col divide-y divide-line">
        {futureEras.map((era) => (
          <div key={era.decade} className={`era-block flex flex-col gap-4 py-12 md:flex-row md:gap-14 ${reduced ? "" : "opacity-0"}`}>
            <span className="font-display w-28 shrink-0 text-4xl text-gold md:text-5xl">{era.decade}</span>
            <div className="flex-1">
              <h3 className="font-display text-2xl text-ivory md:text-3xl">{era.headline}</h3>
              <ul className="mt-5 space-y-1.5">
                {era.items.map((item) => (
                  <li key={item} className="text-ivory-dim md:text-lg">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-display mt-6 max-w-xl text-lg italic text-ivory-dim md:text-xl">{era.prompt}</p>
            </div>
          </div>
        ))}

        <div className={`era-block flex flex-col items-center gap-4 py-20 text-center ${reduced ? "" : "opacity-0"}`}>
          <span className="font-display text-5xl text-saffron md:text-6xl">2100+</span>
          <h3 className="font-display tracking-tightest text-4xl text-ivory md:text-5xl">UNWRITTEN.</h3>
          <p className="mt-2 text-lg leading-relaxed text-ivory-dim md:text-xl">
            Because the India of 2100
            <br />
            hasn&rsquo;t been decided yet.
          </p>
          <p className="font-display mt-4 text-xl italic text-ivory md:text-2xl">
            Maybe you&rsquo;re the one who writes it. 🇮🇳
          </p>
        </div>
      </div>
    </section>
  );
}
