"use client";

import { useSyncExternalStore } from "react";

// DEMO-SPEICHER: Daten liegen nur im Browser (localStorage).
// Beim Livegang wird dieser Speicher durch Supabase ersetzt (siehe docs/my-paw-space-livegang.md).

export type Cat = {
  id: string;
  name: string;
  birthday: string;
  since: string;
  notes: string;
  photo?: string;
};

export type MemoryCategory = "first" | "everyday" | "milestone";

export type Memory = {
  id: string;
  catId: string;
  date: string;
  category: MemoryCategory;
  text: string;
  photo?: string;
};

export type CareProfile = {
  chip: string;
  vetName: string;
  vetPhone: string;
  emergency: string;
  food: string;
  notes: string;
};
export type WeightEntry = { id: string; catId: string; date: string; kg: number };
export type HealthKind = "vaccination" | "checkup" | "treatment" | "other";
export type HealthEntry = { id: string; catId: string; date: string; kind: HealthKind; text: string };
export type MedEntry = { id: string; catId: string; name: string; dose: string; start: string; end: string; notes: string };
export type CareState = { profiles: Record<string, CareProfile>; weights: WeightEntry[]; health: HealthEntry[]; meds: MedEntry[] };

export type PawState = {
  cats: Cat[];
  memories: Memory[];
  // Erinnerungsbuch: Antworten je Frage und Fotos je Kapitel (Schlüssel siehe src/data/paw-book.ts)
  book: Record<string, string>;
  bookPhotos: Record<string, string>;
  care: CareState;
};

const KEY = "oh-paw-space-demo-v1";
const emptyCare: CareState = { profiles: {}, weights: [], health: [], meds: [] };
const empty: PawState = { cats: [], memories: [], book: {}, bookPhotos: {}, care: emptyCare };
let cache: PawState | null = null;
let saveFailed = false;
const listeners = new Set<() => void>();

function load(): PawState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const data = JSON.parse(raw);
    return { ...empty, ...data, care: { ...emptyCare, ...(data.care ?? {}) } };
  } catch {
    return empty;
  }
}

function snapshot(): PawState {
  if (cache === null) cache = load();
  return cache;
}

function commit(next: PawState) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
    saveFailed = false;
  } catch {
    // Speicher voll oder nicht verfügbar: Änderungen gelten nur bis zum Neuladen.
    saveFailed = true;
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const newId = () => crypto.randomUUID();

export function usePawStore() {
  const state = useSyncExternalStore(subscribe, snapshot, () => empty);
  return {
    ...state,
    addCat: (c: Omit<Cat, "id">) =>
      commit({ ...snapshot(), cats: [...snapshot().cats, { ...c, id: newId() }] }),
    removeCat: (id: string) =>
      commit({
        cats: snapshot().cats.filter((c) => c.id !== id),
        memories: snapshot().memories.filter((m) => m.catId !== id),
        book: Object.fromEntries(Object.entries(snapshot().book).filter(([k]) => !k.startsWith(`${id}|`))),
        bookPhotos: Object.fromEntries(Object.entries(snapshot().bookPhotos).filter(([k]) => !k.startsWith(`${id}|`))),
        care: {
          profiles: Object.fromEntries(Object.entries(snapshot().care.profiles).filter(([k]) => k !== id)),
          weights: snapshot().care.weights.filter((x) => x.catId !== id),
          health: snapshot().care.health.filter((x) => x.catId !== id),
          meds: snapshot().care.meds.filter((x) => x.catId !== id),
        },
      }),
    setCareProfile: (catId: string, patch: Partial<CareProfile>) => {
      const cur = snapshot().care.profiles[catId] ?? { chip: "", vetName: "", vetPhone: "", emergency: "", food: "", notes: "" };
      commit({ ...snapshot(), care: { ...snapshot().care, profiles: { ...snapshot().care.profiles, [catId]: { ...cur, ...patch } } } });
    },
    addWeight: (w: Omit<WeightEntry, "id">) =>
      commit({ ...snapshot(), care: { ...snapshot().care, weights: [...snapshot().care.weights, { ...w, id: newId() }] } }),
    removeWeight: (id: string) =>
      commit({ ...snapshot(), care: { ...snapshot().care, weights: snapshot().care.weights.filter((x) => x.id !== id) } }),
    addHealth: (h: Omit<HealthEntry, "id">) =>
      commit({ ...snapshot(), care: { ...snapshot().care, health: [...snapshot().care.health, { ...h, id: newId() }] } }),
    removeHealth: (id: string) =>
      commit({ ...snapshot(), care: { ...snapshot().care, health: snapshot().care.health.filter((x) => x.id !== id) } }),
    addMed: (m: Omit<MedEntry, "id">) =>
      commit({ ...snapshot(), care: { ...snapshot().care, meds: [...snapshot().care.meds, { ...m, id: newId() }] } }),
    removeMed: (id: string) =>
      commit({ ...snapshot(), care: { ...snapshot().care, meds: snapshot().care.meds.filter((x) => x.id !== id) } }),
    setBookText: (key: string, text: string) => {
      const book = { ...snapshot().book };
      if (text.trim()) book[key] = text;
      else delete book[key];
      commit({ ...snapshot(), book });
    },
    setBookPhoto: (key: string, photo: string | null) => {
      const bookPhotos = { ...snapshot().bookPhotos };
      if (photo) bookPhotos[key] = photo;
      else delete bookPhotos[key];
      commit({ ...snapshot(), bookPhotos });
    },
    addMemory: (m: Omit<Memory, "id">) =>
      commit({
        ...snapshot(),
        memories: [...snapshot().memories, { ...m, id: newId() }],
      }),
    removeMemory: (id: string) =>
      commit({
        ...snapshot(),
        memories: snapshot().memories.filter((m) => m.id !== id),
      }),
    updateCat: (id: string, c: Partial<Omit<Cat, "id">>) =>
      commit({ ...snapshot(), cats: snapshot().cats.map((x) => (x.id === id ? { ...x, ...c } : x)) }),
    saveFailed,
    storageKb: Math.round(JSON.stringify(state).length / 1024),
    importJson: (raw: string): boolean => {
      try {
        const data = JSON.parse(raw);
        if (!data || !Array.isArray(data.cats) || !Array.isArray(data.memories)) return false;
        const cats = data.cats.filter((c: Cat) => c && typeof c.id === "string" && typeof c.name === "string");
        const ids = new Set(cats.map((c: Cat) => c.id));
        const memories = data.memories.filter(
          (m: Memory) => m && typeof m.id === "string" && typeof m.text === "string" && ids.has(m.catId),
        );
        const own = (o: unknown, ids: Set<string>): Record<string, string> =>
          o && typeof o === "object"
            ? Object.fromEntries(
                Object.entries(o as Record<string, unknown>).filter(
                  ([k, v]) => typeof v === "string" && ids.has(k.split("|")[0]),
                ),
              ) as Record<string, string>
            : {};
        const c = data.care ?? {};
        const mine = <T extends { catId: string }>(a: unknown): T[] =>
          Array.isArray(a) ? a.filter((x: T) => x && typeof x.catId === "string" && (ids as Set<string>).has(x.catId)) : [];
        commit({
          cats,
          memories,
          book: own(data.book, ids as Set<string>),
          bookPhotos: own(data.bookPhotos, ids as Set<string>),
          care: {
            profiles: Object.fromEntries(
              Object.entries((c.profiles ?? {}) as Record<string, CareProfile>).filter(([k]) => (ids as Set<string>).has(k)),
            ),
            weights: mine<WeightEntry>(c.weights),
            health: mine<HealthEntry>(c.health),
            meds: mine<MedEntry>(c.meds),
          },
        });
        return true;
      } catch {
        return false;
      }
    },
    exportJson: () => JSON.stringify(snapshot(), null, 2),
    clearAll: () => commit(empty),
  };
}
