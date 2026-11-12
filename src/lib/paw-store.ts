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
};

export type MemoryCategory = "first" | "everyday" | "milestone";

export type Memory = {
  id: string;
  catId: string;
  date: string;
  category: MemoryCategory;
  text: string;
};

export type PawState = { cats: Cat[]; memories: Memory[] };

const KEY = "oh-paw-space-demo-v1";
const empty: PawState = { cats: [], memories: [] };
let cache: PawState | null = null;
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
  } catch {
    // Speicher nicht verfügbar: Änderungen gelten nur bis zum Neuladen.
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
      }),
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
    exportJson: () => JSON.stringify(snapshot(), null, 2),
    clearAll: () => commit(empty),
  };
}
