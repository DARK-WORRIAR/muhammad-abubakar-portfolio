import { Reveal, SectionHeader } from "./Reveal";
import { experience } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 md:px-10 py-28">
      <SectionHeader eyebrow="// 03 — experience" title="Where the work happened." />
      <div className="relative pl-8 md:pl-10">
        <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-signal via-steel-light to-transparent" />
        <div className="space-y-14">
          {experience.map((job, i) => (
            <Reveal key={job.org} delay={i * 0.12} className="relative">
              <span className="absolute -left-8 md:-left-10 top-1.5 w-3.5 h-3.5 rounded-full bg-ink border-2 border-signal" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <h3 className="font-display text-xl font-semibold">
                  {job.role}
                </h3>
                <span className="mono-label text-paper-dim/70">{job.period}</span>
              </div>
              <p className="text-circuit font-medium mb-1">{job.org}</p>
              <p className="mono-label text-paper-dim/60 mb-4">{job.location}</p>
              <ul className="space-y-2">
                {job.points.map((p, pi) => (
                  <li key={pi} className="text-paper-dim leading-relaxed flex gap-3">
                    <span className="text-signal mt-2 shrink-0">▸</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
