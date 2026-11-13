import Reveal from "./Reveal";

// Dekorative Pfotenspur, die sich beim Scrollen Schritt für Schritt zeigt.
function Paw({ rotate }: { rotate: number }) {
  return (
    <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden className="text-sage" style={{ transform: `rotate(${rotate}deg)` }}>
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
  const steps = [
    { r: 12, up: false },
    { r: -8, up: true },
    { r: 12, up: false },
    { r: -8, up: true },
    { r: 12, up: false },
  ];
  return (
    <div aria-hidden className="mx-auto flex max-w-xs items-center justify-between py-2">
      {steps.map((s, i) => (
        <Reveal key={i} delay={i * 140} className={s.up ? "-translate-y-3" : "translate-y-1"}>
          <Paw rotate={s.r} />
        </Reveal>
      ))}
    </div>
  );
}
