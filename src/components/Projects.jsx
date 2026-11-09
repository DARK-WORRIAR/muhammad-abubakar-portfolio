import { useRef, useState } from "react";
import { Reveal, SectionHeader } from "./Reveal";
import { projects } from "../data";
import { ArrowUpRight } from "lucide-react";

function TiltCard({ project, delay }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`,
    });
  };

  const handleLeave = () => {
    setStyle({ transform: "perspective(900px) rotateY(0deg) rotateX(0deg)" });
  };

  return (
    <Reveal delay={delay}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
        className="group block h-full rounded-2xl border border-steel bg-panel p-7 transition-[border-color,transform] duration-200 ease-out hover:border-signal focus-ring"
      >
        <div className="flex items-start justify-between mb-6">
          <span className="mono-label text-paper-dim/50">{project.index}</span>
          <ArrowUpRight
            className="text-paper-dim group-hover:text-signal transition-colors"
            size={20}
          />
        </div>
        <h3 className="font-display text-xl font-semibold mb-3">
          {project.name}
        </h3>
        <p className="text-paper-dim leading-relaxed mb-4">
          {project.description}
        </p>
        <p className="text-sm text-paper-dim/70 leading-relaxed mb-6">
          {project.detail}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="mono-label px-2.5 py-1 rounded-full border border-steel-light text-circuit"
            >
              {t}
            </span>
          ))}
        </div>
      </a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 md:px-10 py-28">
      <SectionHeader eyebrow="// 04 — projects" title="Shipped, not just staged." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <TiltCard key={p.name} project={p} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
