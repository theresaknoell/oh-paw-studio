"use client";

import { useEffect, useRef } from "react";

// Fortschrittsbalken am oberen Rand, Kopfzeile, die nach dem Scrollen „einrastet“,
// und eine kleine Katze, die am unteren Rand mit dem Scrollen mitläuft.
export default function ScrollFX() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let lastY = window.scrollY;
    let stop: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.current?.style.setProperty("transform", `scaleX(${p})`);
      root.style.setProperty("--p", String(p));
      if (window.scrollY > 8) root.setAttribute("data-scrolled", "");
      else root.removeAttribute("data-scrolled");
      if (window.scrollY !== lastY) {
        root.setAttribute("data-dir", window.scrollY > lastY ? "down" : "up");
        root.setAttribute("data-walking", "");
        clearTimeout(stop);
        stop = setTimeout(() => root.removeAttribute("data-walking"), 180);
        lastY = window.scrollY;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(stop);
      ["data-scrolled", "data-walking", "data-dir"].forEach((a) => root.removeAttribute(a));
      root.style.removeProperty("--p");
    };
  }, []);

  return (
    <>
      <div ref={bar} aria-hidden className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-olive-deep/70" />
      <div aria-hidden className="cat-walker no-print">
        <svg viewBox="0 0 64 40" width="44" height="28" className="cat-body">
          <g fill="#626a54">
            <path className="cat-tail" d="M8 22c-6-2-7-10-2-13 1 4 4 6 7 7z" />
            <ellipse cx="26" cy="24" rx="16" ry="8" />
            <circle cx="46" cy="16" r="8" />
            <path d="M40 10l1-8 5 5zM48 8l5-6 1 9z" />
            <rect className="cat-leg cat-leg-a" x="14" y="28" width="4" height="10" rx="2" />
            <rect className="cat-leg cat-leg-b" x="20" y="28" width="4" height="10" rx="2" />
            <rect className="cat-leg cat-leg-b" x="32" y="28" width="4" height="10" rx="2" />
            <rect className="cat-leg cat-leg-a" x="38" y="28" width="4" height="10" rx="2" />
          </g>
          <circle cx="49" cy="15" r="1.2" fill="#f5f1e9" />
        </svg>
      </div>
    </>
  );
}
