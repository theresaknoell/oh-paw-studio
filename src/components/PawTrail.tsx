import Reveal from "./Reveal";

// Dekorative Pfotenspur: alle Pfoten zeigen in Laufrichtung (nach rechts), links und rechts versetzt wie bei einer
// Katze, die vorbeigelaufen ist. Die Abdrücke erscheinen nacheinander beim Scrollen.
function Paw() {
  return (
    <svg viewBox="0 0 64 64" width="26" height="26" aria-hidden className="text-sage" style={{ transform: "rotate(90deg)" }}>
      <g fill="currentColor">
        <ellipse cx="32" cy="42" rx="13" ry="11" />
        <ellipse cx="14" cy="28" rx="6" ry="8" transform="rotate(-20 14 28)" />
        <ellipse cx="25" cy="16" rx="6" ry="8.5" transform="rotate(-6 25 16)" />
        <ellipse cx="39" cy="16" rx="6" ry="8.5" transform="rotate(6 39 16)" />
        <ellipse cx="50" cy="28" rx="6" ry="8" transform="rotate(20 50 28)" />
      </g>
    </svg>
  );
}

export default function PawTrail() {
  const count = 12;
  return (
    <div aria-hidden className="mx-auto flex max-w-xl items-center justify-between px-2 py-3">
      {Array.from({ length: count }, (_, i) => (
        <Reveal key={i} delay={i * 110} className={`${i % 2 ? "-translate-y-2.5" : "translate-y-2.5"} ${i >= 8 ? "hidden sm:block" : ""}`}>
          <Paw />
        </Reveal>
      ))}
    </div>
  );
}
