import { motion } from "framer-motion";
import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { profile } from "../data";

const HeroScene = lazy(() => import("./HeroScene"));

function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Ambient glowing radial lights matching theme */}
      <div className="absolute -top-20 right-1/4 w-[480px] h-[480px] rounded-full bg-signal/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 -right-16 w-[420px] h-[420px] rounded-full bg-circuit/15 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-16 left-12 w-[340px] h-[340px] rounded-full bg-signal/10 blur-[100px] pointer-events-none" />

      {/* Futuristic cybernetic grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3fe0c5 1px, transparent 1px), linear-gradient(to bottom, #3fe0c5 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 65% 45%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 65% 45%, #000 30%, transparent 80%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [load3D, setLoad3D] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Defer loading heavy 3D assets until after initial paint & idle
    let timerId;
    const triggerLoad = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setLoad3D(true), { timeout: 1200 });
      } else {
        timerId = setTimeout(() => setLoad3D(true), 400);
      }
    };

    if (document.readyState === "complete") {
      triggerLoad();
    } else {
      window.addEventListener("load", triggerLoad, { once: true });
      return () => {
        window.removeEventListener("load", triggerLoad);
        if (timerId) clearTimeout(timerId);
      };
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden border-b border-steel"
    >
      <div className="absolute inset-0">
        <HeroBackdrop />

        {load3D && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 transition-opacity duration-1000 ease-out opacity-100">
              <HeroScene active={isInView} />
            </div>
          </Suspense>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mono-label text-circuit mb-5"
        >
          // {profile.role.toLowerCase()} — {profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.03] max-w-3xl"
        >
          Building software that ships,{" "}
          <span className="text-gradient">not just demos.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 text-paper-dim text-lg max-w-xl leading-relaxed"
        >
          {profile.name} — a cross-platform developer who owns the full
          project lifecycle, from a client's first requirement to a live URL.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="bg-signal text-ink font-medium px-6 py-3 rounded-full hover:bg-circuit transition-colors focus-ring"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="border border-steel-light px-6 py-3 rounded-full text-paper hover:border-circuit hover:text-circuit transition-colors focus-ring"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 mono-label text-paper-dim/70 flex flex-col items-center gap-2 animate-bounce">
        <span>scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-paper-dim to-transparent" />
      </div>
    </section>
  );
}
