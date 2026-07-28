import { Reveal, SectionHeader } from "./Reveal";
import { profile } from "../data";

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 md:px-10 py-28">
      <SectionHeader eyebrow="// 01 — about" title="Who's building this." />
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <Reveal delay={0.1} className="md:col-span-2">
          <div className="relative rounded-2xl overflow-hidden border border-steel bg-panel aspect-[4/5]">
            <img
              src="/profile.jpg"
              alt={profile.name}
              className="w-full h-full object-cover grayscale contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-display text-xl font-semibold">{profile.name}</p>
              <p className="mono-label text-circuit mt-1">{profile.role}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-3">
          <p className="text-lg leading-relaxed text-paper-dim">
            {profile.summary}
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "based in", value: "Punjab, PK" },
              { label: "available for", value: "Remote work" },
              { label: "experience", value: "1+ year" },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-steel rounded-xl px-4 py-3 bg-panel/60"
              >
                <p className="mono-label text-paper-dim/70">{item.label}</p>
                <p className="font-display text-sm mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
