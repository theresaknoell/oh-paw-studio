"use client";

import type { ReactNode } from "react";

export default function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-10 rounded-full px-4 text-sm transition-colors ${
        active ? "bg-olive-deep text-ivory" : "bg-sand text-cocoa hover:bg-taupe/50"
      }`}
    >
      {children}
    </button>
  );
}
