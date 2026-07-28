import { Reveal, SectionHeader } from "./Reveal";
import { education, certifications, languages } from "../data";
import { GraduationCap, Award, Languages as LangIcon } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="max-w-6xl mx-auto px-6 md:px-10 py-28">
      <SectionHeader eyebrow="// 05 — education" title="Foundations." />
      <div className="grid md:grid-cols-3 gap-6">
        <Reveal delay={0} className="md:col-span-2">
          <div className="rounded-2xl border border-steel bg-panel p-7 h-full">
            <div className="flex items-center gap-2 mb-6 text-signal">
              <GraduationCap size={18} />
              <p className="mono-label">education</p>
            </div>
            <div className="space-y-8">
              {education.map((ed) => (
                <div key={ed.school}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-display font-semibold">{ed.school}</h3>
                    <span className="mono-label text-paper-dim/60">{ed.period}</span>
                  </div>
                  <p className="text-circuit text-sm mt-1">{ed.degree}</p>
                  <p className="mono-label text-paper-dim/50 mt-1">{ed.location}</p>
                  {ed.note && (
                    <p className="text-paper-dim text-sm mt-2 leading-relaxed">
                      {ed.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-steel bg-panel p-7">
              <div className="flex items-center gap-2 mb-5 text-circuit">
                <Award size={18} />
                <p className="mono-label">certifications</p>
              </div>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div key={c.name}>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-paper-dim/70 text-xs">{c.org}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-steel bg-panel p-7">
              <div className="flex items-center gap-2 mb-5 text-signal">
                <LangIcon size={18} />
                <p className="mono-label">languages</p>
              </div>
              <div className="space-y-3">
                {languages.map((l) => (
                  <div key={l.name} className="flex items-baseline justify-between">
                    <p className="font-medium text-sm">{l.name}</p>
                    <p className="text-paper-dim/60 text-xs">{l.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
