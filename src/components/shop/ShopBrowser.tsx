"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

export type ShopItem = {
  slug: string;
  title: string;
  world: string;
  tagline: string;
  price: string;
  image: string | null;
  phases: string[] | "all";
  href: string;
};

type Option = { id: string; label: string };

export type ShopStrings = {
  world: string;
  phase: string;
  all: string;
  one: string;
  many: string;
  none: string;
  reset: string;
  filters: string;
  results: string;
};

type Props = {
  items: ShopItem[];
  worlds: { id: string; title: string; text: string }[];
  phases: Option[];
  t: ShopStrings;
  bundleBand: ReactNode;
};

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
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

function Card({ item, worldTitle }: { item: ShopItem; worldTitle: string }) {
  return (
    <li>
      <Link href={item.href} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-[10px] bg-sand">
          {item.image && (
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          )}
        </div>
        <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{worldTitle}</p>
        <h3 className="mt-1 text-2xl group-hover:text-olive-deep">{item.title}</h3>
        <p className="mt-1 text-[15px] text-cocoa/85">{item.tagline}</p>
        <p className="mt-2 font-serif text-2xl">{item.price}</p>
      </Link>
    </li>
  );
}

function ShopView({
  world,
  phase,
  setFilter,
  resetAll,
  items,
  worlds,
  phases,
  t,
  bundleBand,
}: Props & { world: string | null; phase: string | null; setFilter: (k: "world" | "phase", v: string | null) => void; resetAll: () => void }) {
  const worldTitle = (id: string) => worlds.find((w) => w.id === id)?.title ?? "";
  const filtered = items.filter(
    (i) =>
      (!world || i.world === world) &&
      (!phase || i.phases === "all" || i.phases.includes(phase)),
  );
  const grouped = !world && !phase;
  const grid = "mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      <div role="group" aria-label={t.filters} className="space-y-4">
        <div>
          <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{t.world}</p>
          <div className="flex flex-wrap gap-2">
            <Chip active={!world} onClick={() => setFilter("world", null)}>{t.all}</Chip>
            {worlds.map((w) => (
              <Chip key={w.id} active={world === w.id} onClick={() => setFilter("world", w.id)}>{w.title}</Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{t.phase}</p>
          <div className="flex flex-wrap gap-2">
            <Chip active={!phase} onClick={() => setFilter("phase", null)}>{t.all}</Chip>
            {phases.map((p) => (
              <Chip key={p.id} active={phase === p.id} onClick={() => setFilter("phase", p.id)}>{p.label}</Chip>
            ))}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-8 text-sm text-cocoa/75">
        {filtered.length} {filtered.length === 1 ? t.one : t.many}
      </p>

      {grouped ? (
        worlds.map((w, idx) => {
          const list = items.filter((i) => i.world === w.id);
          return (
            <div key={w.id}>
              <section id={w.id} className="mt-10 scroll-mt-24">
                <h2 className="text-4xl">{w.title}</h2>
                <p className="mt-2 text-cocoa/80">{w.text}</p>
                <ul className={grid}>
                  {list.map((i) => <Card key={i.slug} item={i} worldTitle={w.title} />)}
                </ul>
              </section>
              {idx === 0 && bundleBand}
            </div>
          );
        })
      ) : filtered.length === 0 ? (
        <div className="mt-6">
          <p className="text-lg text-cocoa/85">{t.none}</p>
          <button
            type="button"
            onClick={resetAll}
            className="mt-3 text-olive-deep underline underline-offset-4 hover:text-cocoa"
          >
            {t.reset}
          </button>
        </div>
      ) : (
        <>
          <h2 className="sr-only">{t.results}</h2>
          <ul className={grid}>
            {filtered.map((i) => <Card key={i.slug} item={i} worldTitle={worldTitle(i.world)} />)}
          </ul>
          {bundleBand}
        </>
      )}
    </div>
  );
}

// Mit Filtern aus der Adresse (?world=…&phase=…)
export function ShopBrowser(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const w = sp.get("world");
  const p = sp.get("phase");
  const world = props.worlds.some((x) => x.id === w) ? w : null;
  const phase = props.phases.some((x) => x.id === p) ? p : null;

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  return (
    <ShopView
      {...props}
      world={world}
      phase={phase}
      setFilter={(key, value) => update({ [key]: value })}
      resetAll={() => update({ world: null, phase: null })}
    />
  );
}

// Statische Fassung (ohne Filter) für das vorab erzeugte HTML
export function ShopStatic(props: Props) {
  return <ShopView {...props} world={null} phase={null} setFilter={() => {}} resetAll={() => {}} />;
}
