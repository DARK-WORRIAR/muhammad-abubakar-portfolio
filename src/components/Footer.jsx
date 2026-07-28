import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-steel">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="mono-label text-paper-dim/50">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="mono-label text-paper-dim/50">
          built with react · tailwind · three.js · flask
        </p>
      </div>
    </footer>
  );
}
