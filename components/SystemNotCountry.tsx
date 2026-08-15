"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SystemNotCountry() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const ctx = gsap.context(() => {
      // Slow drift on the blurred backdrop only — the sharp photo in front
      // stays fully framed the whole time, never cropped.
      gsap.fromTo(
        bgRef.current,
        { scale: 1.15 },
        {
          scale: 1.3,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
      gsap.fromTo(
        fgRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: section, start: "top 55%" } }
      );
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="/images/protests/hate-the-system-not-the-country.jpg"
          alt=""
          fill
          aria-hidden
          className="scale-110 object-cover opacity-70 blur-3xl brightness-[0.4]"
          sizes="100vw"
        />
      </div>

      <div
        ref={fgRef}
        className={`relative h-[78vh] w-full max-w-3xl px-6 ${reduced ? "" : "opacity-0"}`}
      >
        <Image
          src="/images/protests/hate-the-system-not-the-country.jpg"
          alt="A protester holds a sign reading: Hate the system, not the country"
          fill
          className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          sizes="(min-width: 768px) 768px, 100vw"
          priority
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />

      <div
        ref={captionRef}
        className={`absolute bottom-14 left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 text-center ${
          reduced ? "" : "opacity-0"
        }`}
      >
        <h2 className="font-display text-4xl leading-tight text-ivory md:text-5xl">
          Hate the system, not the country.
        </h2>
      </div>
    </section>
  );
}
