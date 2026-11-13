import type { Locale } from "@/app/[lang]/dictionaries";

export type PawApp = {
  demoBanner: string;
  nav: { app: string; dashboard: string; cats: string; memories: string; products: string; settings: string };
  dashboard: { title: string; intro: string; cats: string; memories: string; start: string };
  cats: {
    title: string; empty: string; name: string; birthday: string; since: string;
    notes: string; add: string; remove: string; confirmRemove: string;
  };
  memories: {
    title: string; empty: string; needCat: string; cat: string; date: string;
    category: string; text: string; add: string; remove: string;
    categories: { first: string; everyday: string; milestone: string };
  };
  products: { title: string; intro: string; open: string };
  settings: {
    title: string; intro: string; export: string; clear: string; confirmClear: string;
    futureTitle: string; futureText: string;
  };
};

export const pawApp: Record<Locale, PawApp> = {
  de: {
    demoBanner: "Demo-Modus: Deine Einträge bleiben nur in diesem Browser gespeichert und sind nicht mit einem Konto verbunden.",
    nav: { app: "My Paw Space", dashboard: "Übersicht", cats: "Meine Katzen", memories: "Erinnerungen", products: "Meine Produkte", settings: "Einstellungen" },
    dashboard: {
      title: "Dein Paw Space",
      intro: "Schön, dass du da bist. Hier sammelst du alles rund um deine Katzen.",
      cats: "Katzen", memories: "Erinnerungen", start: "Los geht's",
    },
    cats: {
      title: "Meine Katzen", empty: "Noch keine Katze angelegt.", name: "Name",
      birthday: "Geburtstag", since: "Bei mir seit", notes: "Besonderheiten",
      add: "Katze hinzufügen", remove: "Entfernen",
      confirmRemove: "Diese Katze und alle zugehörigen Erinnerungen wirklich entfernen?",
    },
    memories: {
      title: "Erinnerungen", empty: "Noch keine Erinnerungen. Halte deinen ersten Moment fest.",
      needCat: "Lege zuerst eine Katze an.", cat: "Katze", date: "Datum",
      category: "Art", text: "Was ist passiert?", add: "Erinnerung speichern", remove: "Entfernen",
      categories: { first: "Erstes Mal", everyday: "Alltag", milestone: "Meilenstein" },
    },
    products: {
      title: "Meine Produkte",
      intro: "Im Demo-Modus siehst du hier alle Produkte. Später erscheinen hier nur die, die du gekauft hast.",
      open: "Bei Gumroad öffnen",
    },
    settings: {
      title: "Einstellungen", intro: "Deine Daten gehören dir.",
      export: "Meine Daten exportieren (JSON)", clear: "Alle Daten löschen",
      confirmClear: "Wirklich alle Daten in diesem Browser löschen?",
      futureTitle: "Bald verfügbar",
      futureText: "Anmeldung per E-Mail-Link, Fotos, PDF-Export und digital ausfüllbare Vorlagen.",
    },
  },
  en: {
    demoBanner: "Demo mode: Your entries are stored only in this browser and are not linked to an account.",
    nav: { app: "My Paw Space", dashboard: "Overview", cats: "My cats", memories: "Memories", products: "My products", settings: "Settings" },
    dashboard: {
      title: "Your Paw Space",
      intro: "Lovely to have you here. Collect everything about your cats in one place.",
      cats: "Cats", memories: "Memories", start: "Get started",
    },
    cats: {
      title: "My cats", empty: "No cat added yet.", name: "Name",
      birthday: "Birthday", since: "With me since", notes: "Quirks",
      add: "Add cat", remove: "Remove",
      confirmRemove: "Really remove this cat and all related memories?",
    },
    memories: {
      title: "Memories", empty: "No memories yet. Capture your first moment.",
      needCat: "Add a cat first.", cat: "Cat", date: "Date",
      category: "Type", text: "What happened?", add: "Save memory", remove: "Remove",
      categories: { first: "First time", everyday: "Everyday", milestone: "Milestone" },
    },
    products: {
      title: "My products",
      intro: "In demo mode you see all products here. Later, only the ones you bought will appear.",
      open: "Open on Gumroad",
    },
    settings: {
      title: "Settings", intro: "Your data belongs to you.",
      export: "Export my data (JSON)", clear: "Delete all data",
      confirmClear: "Really delete all data in this browser?",
      futureTitle: "Coming soon",
      futureText: "Sign-in via email link, photos, PDF export and templates you can fill in digitally.",
    },
  },
};
