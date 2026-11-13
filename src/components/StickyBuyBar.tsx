"use client";

import { useEffect, useState } from "react";

// Mobile Kaufleiste: erscheint, sobald der Hauptbutton aus dem Bild gescrollt ist.
export default function StickyBuyBar({
  targetId,
  price,
  label,
  href,
}: {
  targetId: string;
  price: string;
  label: string;
  href: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-sand bg-ivory px-4 py-3 shadow-[0_-6px_18px_rgba(68,60,53,0.08)] transition-transform duration-200 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <span className="font-serif text-2xl">{price}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="inline-flex min-h-11 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory"
      >
        {label}
      </a>
    </div>
  );
}
