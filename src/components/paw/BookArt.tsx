// Handgezeichnete Strichillustrationen für das druckbare Erinnerungsbuch.
// Nur Linien in Markenfarbe, keine Flächen: spart beim Drucken Farbe und passt zum weißen Hintergrund.
export type ArtName = "sitting" | "sleeping" | "yarn" | "fish" | "mouse" | "leaf" | "heart" | "moon" | "letter" | "paws";

const paths: Record<ArtName, React.ReactNode> = {
  sitting: (
    <>
      <path d="M42 104C30 78 38 58 60 58s30 20 18 46z" />
      <circle cx="60" cy="40" r="17" />
      <path d="M45 31L42 13l14 10M75 31l3-18-14 10" />
      <path d="M53 40h.01M67 40h.01" strokeWidth="3" />
      <path d="M58 46l2 2 2-2M40 42l-12-2M40 47l-12 3M80 42l12-2M80 47l12 3" />
      <path d="M78 100c20 2 26-14 16-28" />
    </>
  ),
  sleeping: (
    <>
      <path d="M18 84c-2-24 28-36 54-30s34 28 8 38-60 8-62-8z" />
      <circle cx="36" cy="72" r="14" />
      <path d="M26 62l-3-14 13 7M44 58l8-10 1 14" />
      <path d="M29 74q3 3 6 0M39 74q3 3 6 0" />
      <path d="M80 92c20 6 30-12 16-22" />
      <path d="M88 30h10l-10 10h10M102 18h7l-7 7h7" />
    </>
  ),
  yarn: (
    <>
      <circle cx="56" cy="62" r="30" />
      <path d="M30 50c18 6 36 6 52-4M27 64c20 8 42 8 60-4M32 80c18 6 34 4 48-6M42 36c8 14 8 40 0 56M62 33c8 14 8 44-2 58" />
      <path d="M86 70c16 4 18 20 6 26-10 5-6 14 8 14" />
    </>
  ),
  fish: (
    <>
      <path d="M20 60c14-24 44-24 60 0-16 24-46 24-60 0z" />
      <path d="M80 60l22-16v32z" />
      <circle cx="38" cy="56" r="2" />
      <path d="M52 44c4 10 4 22 0 32M62 46c3 8 3 20 0 28" />
    </>
  ),
  mouse: (
    <>
      <path d="M26 82c-2-24 18-38 40-34s30 22 14 34-50 10-54 0z" />
      <circle cx="74" cy="46" r="9" />
      <circle cx="56" cy="46" r="9" />
      <path d="M34 78l-8-2M30 70l-8-6" />
      <path d="M28 84c-12 4-14 16-4 22" />
      <path d="M78 64h.01" strokeWidth="3" />
      <path d="M82 66l10-3M82 70l10 2" />
    </>
  ),
  leaf: (
    <>
      <path d="M60 108V40" />
      <path d="M60 86c-22-2-28-18-26-30 20 0 28 12 26 30zM60 70c20-2 26-16 24-28-18 0-26 10-24 28zM60 52c-14-4-18-16-14-26 14 2 18 12 14 26z" />
      <path d="M34 108h52" />
    </>
  ),
  heart: (
    <>
      <path d="M60 98S20 74 20 46c0-16 18-24 30-12 4 4 8 8 10 8s6-4 10-8c12-12 30-4 30 12 0 28-40 52-40 52z" />
      <path d="M36 44c2-6 8-8 12-6" />
    </>
  ),
  moon: (
    <>
      <path d="M78 24A38 38 0 1 0 98 82 32 32 0 0 1 78 24z" />
      <path d="M92 38l3 7 7 1-5 5 1 7-6-4-7 3 2-7-5-5 7-1zM104 70l2 4 4 .5-3 3 .7 4-4-2-4 2 .8-4-3-3 4-.5z" />
    </>
  ),
  letter: (
    <>
      <rect x="20" y="36" width="80" height="56" rx="4" />
      <path d="M20 40l40 30 40-30" />
      <path d="M60 86s-12-7-12-14c0-5 6-7 9-3l3 3 3-3c3-4 9-2 9 3 0 7-12 14-12 14z" transform="translate(0 -3) scale(.9) translate(7 6)" />
    </>
  ),
  paws: (
    <>
      <g transform="translate(14 64) rotate(35)">
        <ellipse cx="14" cy="22" rx="9" ry="8" />
        <ellipse cx="3" cy="10" rx="3.5" ry="5" />
        <ellipse cx="10" cy="3" rx="3.5" ry="5" />
        <ellipse cx="19" cy="3" rx="3.5" ry="5" />
        <ellipse cx="26" cy="10" rx="3.5" ry="5" />
      </g>
      <g transform="translate(62 36) rotate(35)">
        <ellipse cx="14" cy="22" rx="9" ry="8" />
        <ellipse cx="3" cy="10" rx="3.5" ry="5" />
        <ellipse cx="10" cy="3" rx="3.5" ry="5" />
        <ellipse cx="19" cy="3" rx="3.5" ry="5" />
        <ellipse cx="26" cy="10" rx="3.5" ry="5" />
      </g>
    </>
  ),
};

export default function BookArt({ name, className = "", size = 96 }: { name: ArtName; className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-olive-deep ${className}`}
    >
      {paths[name]}
    </svg>
  );
}

// Zufällig wirkende, aber feste Zuordnung: Jedes Kapitel bekommt sein Motiv.
const byUnit: Record<string, ArtName> = {
  intro: "sitting", k1: "moon", k2: "sitting", k3: "paws", k4: "mouse", k5: "yarn", k6: "heart",
  k7: "letter", k8: "paws", k9: "leaf", k10: "moon", k11: "sleeping", k12: "fish", k13: "heart", outro: "heart",
};
const monthCycle: ArtName[] = ["yarn", "sleeping", "mouse", "fish", "leaf", "sitting", "moon", "paws", "yarn", "leaf", "sleeping", "heart"];

export const artFor = (unitId: string): ArtName => {
  const m = /^m(\d+)$/.exec(unitId);
  if (m) return monthCycle[(Number(m[1]) - 1) % monthCycle.length];
  return byUnit[unitId] ?? "paws";
};

// Zierlinie aus drei kleinen Pfoten als Trenner
export function PawDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 20" width="120" height="27" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2" className={`text-sage ${className}`}>
      {[10, 45, 80].map((x) => (
        <g key={x} transform={`translate(${x} 10)`}>
          <ellipse cx="0" cy="3" rx="4" ry="3.5" />
          <circle cx="-5" cy="-2" r="1.6" />
          <circle cx="-1.7" cy="-5" r="1.6" />
          <circle cx="1.7" cy="-5" r="1.6" />
          <circle cx="5" cy="-2" r="1.6" />
        </g>
      ))}
    </svg>
  );
}
