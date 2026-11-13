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

export type PawState = {
  cats: Cat[];
  memories: Memory[];
  // Erinnerungsbuch: Antworten je Frage und Fotos je Kapitel (Schlüssel siehe src/data/paw-book.ts)
  book: Record<string, string>;
  bookPhotos: Record<string, string>;
};

const KEY = "oh-paw-space-demo-v1";
const empty: PawState = { cats: [], memories: [], book: {}, bookPhotos: {} };
let cache: PawState | null = null;
let saveFailed = false;
const listeners = new Set<() => void>();

function load(): PawState {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
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
      }),
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
        commit({ cats, memories, book: own(data.book, ids as Set<string>), bookPhotos: own(data.bookPhotos, ids as Set<string>) });
        return true;
      } catch {
        return false;
      }
    },
    exportJson: () => JSON.stringify(snapshot(), null, 2),
    clearAll: () => commit(empty),
  };
}
