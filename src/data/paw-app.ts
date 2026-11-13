import type { Locale } from "@/app/[lang]/dictionaries";

export type PawApp = {
  demoBanner: string;
  nav: { app: string; dashboard: string; cats: string; memories: string; book: string; products: string; print: string; settings: string };
  dashboard: { title: string; intro: string; cats: string; memories: string; start: string };
  cats: {
    title: string; empty: string; name: string; birthday: string; since: string;
    notes: string; add: string; remove: string; confirmRemove: string;
    photo: string; edit: string; save: string; cancel: string; saveFailed: string;
  };
  memories: {
    title: string; empty: string; needCat: string; cat: string; date: string;
    category: string; text: string; add: string; remove: string;
    categories: { first: string; everyday: string; milestone: string };
    photo: string; removePhoto: string;
  };
  print: { title: string; intro: string; selectCat: string; button: string; empty: string; born: string; since: string; book: string; noCats: string; mode: string; timeline: string; guided: string; guidedEmpty: string };
  designed: { title: string; intro: string; button: string; hint: string; cover: string; chapter: string; link: string; preview: string };
  book: {
    title: string; intro: string; needCat: string; selectCat: string; progress: string; chapters: string;
    saved: string; photo: string; removePhoto: string; prev: string; next: string; hint: string;
    productTitle: string; productText: string; productCta: string; filled: string;
  };
  login: { title: string; intro: string; email: string; submit: string; note: string; demo: string; back: string };
  products: { title: string; intro: string; open: string };
  settings: {
    title: string; intro: string; export: string; clear: string; confirmClear: string;
    futureTitle: string; futureText: string;
    import: string; importOk: string; importError: string; storage: string; storageFull: string;
  };
};

export const pawApp: Record<Locale, PawApp> = {
  de: {
    demoBanner: "Demo-Modus: Deine Einträge bleiben nur in diesem Browser gespeichert und sind nicht mit einem Konto verbunden.",
    nav: { app: "My Paw Space", dashboard: "Übersicht", cats: "Meine Katzen", memories: "Erinnerungen", book: "Erinnerungsbuch", products: "Meine Produkte", print: "Drucken", settings: "Einstellungen" },
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
      photo: "Foto", edit: "Bearbeiten", save: "Speichern", cancel: "Abbrechen",
      saveFailed: "Konnte nicht gespeichert werden, der Speicher ist voll. Exportiere deine Daten in den Einstellungen und entferne Fotos.",
    },
    memories: {
      title: "Erinnerungen", empty: "Noch keine Erinnerungen. Halte deinen ersten Moment fest.",
      needCat: "Lege zuerst eine Katze an.", cat: "Katze", date: "Datum",
      category: "Art", text: "Was ist passiert?", add: "Erinnerung speichern", remove: "Entfernen",
      categories: { first: "Erstes Mal", everyday: "Alltag", milestone: "Meilenstein" },
      photo: "Foto (optional)", removePhoto: "Foto entfernen",
    },
    products: {
      title: "Meine Produkte",
      intro: "Im Demo-Modus siehst du hier alle Produkte. Später erscheinen hier nur die, die du gekauft hast.",
      open: "Bei Gumroad öffnen",
    },
    print: {
      title: "Erinnerungsbuch drucken", intro: "Wähle eine Katze und speichere ihre Erinnerungen als PDF oder drucke sie aus.",
      selectCat: "Katze", button: "Drucken / als PDF speichern", empty: "Für diese Katze gibt es noch keine Erinnerungen.",
      born: "Geboren am", since: "Bei mir seit", book: "Unser gemeinsames Erinnerungsbuch", noCats: "Lege zuerst eine Katze an.",
      mode: "Inhalt", timeline: "Zeitachse", guided: "Erinnerungsbuch", guidedEmpty: "Im Erinnerungsbuch gibt es für diese Katze noch keine Einträge.",
    },
    designed: {
      title: "Gestaltetes Erinnerungsbuch", intro: "Vorschau: Dein Erinnerungsbuch im Design von Oh Paw Studio, mit Titelblatt, Kapitelseiten und Fotos.",
      button: "Als PDF speichern", hint: "Wähle im Druckdialog „Als PDF speichern“, Format A4 und aktiviere „Hintergrundgrafiken“, damit Farben und Titelblatt erscheinen.",
      cover: "Unser Erinnerungsbuch", chapter: "Kapitel", link: "Gestaltetes PDF ansehen (Vorschau)", preview: "Vorschau",
    },
    book: {
      title: "Erinnerungsbuch", intro: "Halte das erste Jahr Kapitel für Kapitel fest. Die Fragen sind nur Anregungen, schreibe, was dir wichtig ist.",
      needCat: "Lege zuerst eine Katze an.", selectCat: "Katze", progress: "Kapitel begonnen", chapters: "Kapitel",
      saved: "Wird automatisch gespeichert.", photo: "Foto zum Kapitel", removePhoto: "Foto entfernen", prev: "Vorheriges Kapitel", next: "Nächstes Kapitel",
      hint: "Du musst nicht alles ausfüllen. Überspringe, was nicht passt.", filled: "begonnen",
      productTitle: "Zum Ausdrucken und Verschenken", productText: "Das Erinnerungsbuch „Mein erstes Jahr mit dir“ gibt es als schön gestaltetes PDF zum Selbstausdrucken.", productCta: "Zum Erinnerungsbuch",
    },
    login: {
      title: "Anmelden", intro: "Bald meldest du dich hier mit einem Link per E-Mail an, ganz ohne Passwort. So bleiben deine Erinnerungen auf allen Geräten verfügbar.",
      email: "E-Mail-Adresse", submit: "Anmelde-Link senden", note: "Noch nicht verfügbar", demo: "Demo ausprobieren", back: "Zurück zu My Paw Space",
    },
    settings: {
      title: "Einstellungen", intro: "Deine Daten gehören dir.",
      import: "Daten importieren (JSON)", importOk: "Daten wurden importiert.", importError: "Die Datei konnte nicht gelesen werden.",
      storage: "Belegter Speicher in diesem Browser", storageFull: "Der Speicher ist fast voll. Exportiere deine Daten und entferne Fotos.",
      export: "Meine Daten exportieren (JSON)", clear: "Alle Daten löschen",
      confirmClear: "Wirklich alle Daten in diesem Browser löschen?",
      futureTitle: "Bald verfügbar",
      futureText: "Anmeldung per E-Mail-Link, Fotos, PDF-Export und digital ausfüllbare Vorlagen.",
    },
  },
  en: {
    demoBanner: "Demo mode: Your entries are stored only in this browser and are not linked to an account.",
    nav: { app: "My Paw Space", dashboard: "Overview", cats: "My cats", memories: "Memories", book: "Memory book", products: "My products", print: "Print", settings: "Settings" },
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
      photo: "Photo", edit: "Edit", save: "Save", cancel: "Cancel",
      saveFailed: "Could not be saved because storage is full. Export your data in Settings and remove photos.",
    },
    memories: {
      title: "Memories", empty: "No memories yet. Capture your first moment.",
      needCat: "Add a cat first.", cat: "Cat", date: "Date",
      category: "Type", text: "What happened?", add: "Save memory", remove: "Remove",
      categories: { first: "First time", everyday: "Everyday", milestone: "Milestone" },
      photo: "Photo (optional)", removePhoto: "Remove photo",
    },
    products: {
      title: "My products",
      intro: "In demo mode you see all products here. Later, only the ones you bought will appear.",
      open: "Open on Gumroad",
    },
    print: {
      title: "Print memory book", intro: "Choose a cat and save its memories as a PDF or print them.",
      selectCat: "Cat", button: "Print / save as PDF", empty: "There are no memories for this cat yet.",
      born: "Born", since: "With me since", book: "Our memory book together", noCats: "Add a cat first.",
      mode: "Content", timeline: "Timeline", guided: "Memory book", guidedEmpty: "The memory book has no entries for this cat yet.",
    },
    designed: {
      title: "Designed memory book", intro: "Preview: your memory book in the Oh Paw Studio design, with cover, chapter pages and photos.",
      button: "Save as PDF", hint: "In the print dialog choose “Save as PDF”, A4 size, and enable “Background graphics” so colours and the cover appear.",
      cover: "Our memory book", chapter: "Chapter", link: "View designed PDF (preview)", preview: "Preview",
    },
    book: {
      title: "Memory book", intro: "Capture the first year chapter by chapter. The questions are only prompts, write what matters to you.",
      needCat: "Add a cat first.", selectCat: "Cat", progress: "chapters started", chapters: "Chapters",
      saved: "Saved automatically.", photo: "Photo for this chapter", removePhoto: "Remove photo", prev: "Previous chapter", next: "Next chapter",
      hint: "You don't have to fill in everything. Skip what doesn't fit.", filled: "started",
      productTitle: "To print and give as a gift", productText: "The memory book “My First Year with You” is available as a beautifully designed PDF to print yourself.", productCta: "View the memory book",
    },
    login: {
      title: "Sign in", intro: "Soon you will sign in here with a link sent by email, no password needed. That keeps your memories available on all your devices.",
      email: "Email address", submit: "Send sign-in link", note: "Not available yet", demo: "Try the demo", back: "Back to My Paw Space",
    },
    settings: {
      title: "Settings", intro: "Your data belongs to you.",
      import: "Import data (JSON)", importOk: "Data imported.", importError: "The file could not be read.",
      storage: "Storage used in this browser", storageFull: "Storage is almost full. Export your data and remove photos.",
      export: "Export my data (JSON)", clear: "Delete all data",
      confirmClear: "Really delete all data in this browser?",
      futureTitle: "Coming soon",
      futureText: "Sign-in via email link, photos, PDF export and templates you can fill in digitally.",
    },
  },
};
