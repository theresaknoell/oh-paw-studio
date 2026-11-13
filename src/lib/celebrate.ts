// Kleine Pfoten-Konfetti-Animation (ohne Zusatzpaket). Bei „Bewegung reduzieren“ passiert nichts.
const PAW =
  '<svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="currentColor"><ellipse cx="32" cy="42" rx="13" ry="11"/><ellipse cx="14" cy="28" rx="6" ry="8" transform="rotate(-20 14 28)"/><ellipse cx="25" cy="16" rx="6" ry="8.5" transform="rotate(-6 25 16)"/><ellipse cx="39" cy="16" rx="6" ry="8.5" transform="rotate(6 39 16)"/><ellipse cx="50" cy="28" rx="6" ry="8" transform="rotate(20 50 28)"/></g></svg>';
const HEART =
  '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 2.9 5 6.2 5c2 0 3.2 1 3.8 2 .6-1 1.8-2 3.8-2 3.3 0 5.3 3.3 3.8 6.8C19.500 16.400 12 21 12 21z"/></svg>';
const COLORS = ["#a7ad98", "#626a54", "#b7a99a", "#747b67"];

export function celebrate() {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.className = "celebrate-layer";
  const n = 16;
  for (let i = 0; i < n; i++) {
    const el = document.createElement("span");
    el.className = "celebrate-bit";
    el.innerHTML = i % 4 === 0 ? HEART : PAW;
    const angle = (-90 + (Math.random() - 0.5) * 140) * (Math.PI / 180);
    const dist = 140 + Math.random() * 180;
    el.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--y", `${Math.sin(angle) * dist}px`);
    el.style.setProperty("--r", `${(Math.random() - 0.5) * 120}deg`);
    el.style.setProperty("--s", `${14 + Math.random() * 14}px`);
    el.style.setProperty("--d", `${Math.random() * 120}ms`);
    el.style.color = COLORS[i % COLORS.length];
    layer.appendChild(el);
  }
  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 1800);
}
