// Einfaches Liniendiagramm ohne Zusatzbibliothek.
export default function WeightChart({ points, label }: { points: { date: string; kg: number }[]; label: string }) {
  if (points.length < 2) return null;
  const w = 600;
  const h = 200;
  const pad = { l: 44, r: 16, t: 16, b: 28 };
  const kgs = points.map((p) => p.kg);
  const min = Math.min(...kgs);
  const max = Math.max(...kgs);
  const span = max - min || 1;
  const lo = min - span * 0.15;
  const hi = max + span * 0.15;
  const x = (i: number) => pad.l + (i * (w - pad.l - pad.r)) / (points.length - 1);
  const y = (kg: number) => pad.t + ((hi - kg) / (hi - lo)) * (h - pad.t - pad.b);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.kg).toFixed(1)}`).join(" ");
  const summary = `${label}: ${points[0].date} ${points[0].kg} kg → ${points[points.length - 1].date} ${points[points.length - 1].kg} kg`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={summary} className="w-full">
      <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#b7a99a" strokeWidth="1" />
      <text x={pad.l - 8} y={y(max) + 4} textAnchor="end" fontSize="12" fill="#443c35">{max}</text>
      <text x={pad.l - 8} y={y(min) + 4} textAnchor="end" fontSize="12" fill="#443c35">{min}</text>
      <path d={path} fill="none" stroke="#626a54" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={`${p.date}-${i}`} cx={x(i)} cy={y(p.kg)} r="4" fill="#f5f1e9" stroke="#626a54" strokeWidth="2" />
      ))}
      <text x={pad.l} y={h - 8} fontSize="12" fill="#443c35">{points[0].date}</text>
      <text x={w - pad.r} y={h - 8} textAnchor="end" fontSize="12" fill="#443c35">{points[points.length - 1].date}</text>
    </svg>
  );
}
