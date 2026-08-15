"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PAIRS = [
  { a: "If independence means the freedom to speak…", b: "who gets heard?" },
  { a: "If independence means equality…", b: "who is still waiting?" },
  { a: "If independence means dignity…", b: "what remains unfinished?" },
];

export default function OpenQuestions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = refs.current.filter(Boolean) as HTMLDivElement[];

    if (reduced) {
      gsap.set(els, { opacity: 1 });
      return;
    }

    gsap.set(els, { opacity: 0 });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      els.forEach((el, i) => {
        tl.to(el, { opacity: 1, duration: 3 }, i * 8)
          .to(el, { opacity: 0, duration: 2 }, i * 8 + 5);
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {PAIRS.map((p, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <p className="font-display text-2xl text-ivory-dim md:text-3xl">{p.a}</p>
          <p className="font-display text-4xl text-ivory md:text-5xl">{p.b}</p>
        </div>
      ))}
    </section>
  );
}
