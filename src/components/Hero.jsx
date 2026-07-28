import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { profile } from "../data";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden border-b border-steel"
    >
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
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
