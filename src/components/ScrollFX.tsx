"use client";

import { useEffect, useRef } from "react";

// Fortschrittsbalken am oberen Rand und Kopfzeile, die nach dem Scrollen leicht „einrastet“.
export default function ScrollFX() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.current?.style.setProperty("transform", `scaleX(${p})`);
      if (window.scrollY > 8) root.setAttribute("data-scrolled", "");
      else root.removeAttribute("data-scrolled");
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
      root.removeAttribute("data-scrolled");
    };
  }, []);

  return <div ref={bar} aria-hidden className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-olive-deep/70" />;
}
