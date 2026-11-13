"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Sanftes Einblenden beim Scrollen. Ohne JavaScript oder bei „Bewegung reduzieren“ bleibt alles sofort sichtbar.
// Elemente im sichtbaren Bereich werden nie versteckt, es gibt also kein Flackern beim Laden.
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: "div" | "li" | "section";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.classList.add("reveal-pre");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";
  return (
    <Component ref={ref as React.RefObject<HTMLDivElement>} className={className} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Component>
  );
}
