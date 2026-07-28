import { Reveal, SectionHeader } from "./Reveal";
import { stack } from "../data";

const labels = {
  languages: "languages",
  frameworks: "frameworks & platforms",
  tools: "tools",
  concepts: "core concepts",
};

export default function Stack() {
  return (
    <section id="stack" className="max-w-6xl mx-auto px-6 md:px-10 py-28">
      <SectionHeader eyebrow="// 02 — stack" title="stack.manifest" />
      <div className="rounded-2xl border border-steel bg-panel overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-steel bg-panel-raised">
          <span className="w-3 h-3 rounded-full bg-signal-dim" />
          <span className="w-3 h-3 rounded-full bg-steel-light" />
          <span className="w-3 h-3 rounded-full bg-circuit/50" />
          <span className="mono-label text-paper-dim/70 ml-3">stack.json</span>
        </div>
        <div className="p-6 md:p-10 grid sm:grid-cols-2 gap-x-10 gap-y-10 font-mono text-sm">
          {stack.map((group, gi) => (
            <Reveal key={group.key} delay={gi * 0.1}>
              <p className="text-circuit mb-3">"{labels[group.key]}": [</p>
              <div className="pl-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block px-3 py-1.5 rounded-md border border-steel-light bg-ink/60 text-paper hover:border-signal hover:text-signal transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-circuit mt-3">]</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
