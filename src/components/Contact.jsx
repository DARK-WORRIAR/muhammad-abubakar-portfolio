import { useState } from "react";
import { Reveal, SectionHeader } from "./Reveal";
import { profile } from "../data";
import { Mail, Phone, Globe, Send } from "lucide-react";

function GithubMark({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.9 5.34.9 11.6c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.17.7-3.84-1.35-3.84-1.35-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.94.1-.73.4-1.24.72-1.52-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.11 11.11 0 0 0 23.1 11.6C23.1 5.34 18.27.5 12 .5Z" />
    </svg>
  );
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Couldn't send that. Try again in a moment.");
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 md:px-10 py-28">
      <SectionHeader eyebrow="// 06 — contact" title="Let's build something." />
      <div className="grid md:grid-cols-5 gap-12">
        <Reveal className="md:col-span-2">
          <p className="text-paper-dim leading-relaxed mb-8">
            Open to remote roles, freelance contracts, and collaborations.
            The fastest way to reach me is the form, or drop a message
            directly below.
          </p>
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-paper hover:text-signal transition-colors focus-ring rounded"
            >
              <Mail size={18} className="text-signal" /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 text-paper hover:text-signal transition-colors focus-ring rounded"
            >
              <Phone size={18} className="text-signal" /> {profile.phone}
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-paper hover:text-signal transition-colors focus-ring rounded"
            >
              <GithubMark size={18} className="text-signal" /> {profile.github}
            </a>
            <a
              href={profile.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-paper hover:text-signal transition-colors focus-ring rounded"
            >
              <Globe size={18} className="text-signal" /> {profile.portfolio}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-steel bg-panel p-7 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="mono-label text-paper-dim/70 block mb-2">
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-ink border border-steel-light rounded-lg px-4 py-3 text-paper focus-ring focus:border-circuit outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mono-label text-paper-dim/70 block mb-2">
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-ink border border-steel-light rounded-lg px-4 py-3 text-paper focus-ring focus:border-circuit outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mono-label text-paper-dim/70 block mb-2">
                message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-ink border border-steel-light rounded-lg px-4 py-3 text-paper focus-ring focus:border-circuit outline-none transition-colors resize-none"
                placeholder="What are we building?"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-signal text-ink font-medium px-6 py-3 rounded-full hover:bg-circuit transition-colors focus-ring disabled:opacity-60"
            >
              <Send size={16} />
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && (
              <p className="text-circuit text-sm">
                Message sent — thanks, I'll reply soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-signal text-sm">{errorMsg}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
