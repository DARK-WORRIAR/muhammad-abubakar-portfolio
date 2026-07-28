import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-steel" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <a
          href="#top"
          className="font-display font-semibold text-paper tracking-tight focus-ring rounded"
        >
          M<span className="text-signal">.</span>Abubakar
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono-label text-paper-dim hover:text-circuit transition-colors focus-ring rounded"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="mono-label border border-steel-light px-4 py-2 rounded-full text-paper hover:border-signal hover:text-signal transition-colors focus-ring"
        >
          Hire me
        </a>
      </div>
    </nav>
  );
}
