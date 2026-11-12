// Kurzbeschreibung und Inhalte aus dem Gumroad-Shop (Stand November 2026).
export type ProductDetail = { tagline: string; inside: string[]; pages: number | null };

export const productDetails: Record<string, ProductDetail> = {
  "erstes-jahr-mit-dir": {
    "tagline": "Ein liebevolles Erinnerungsbuch für das erste Jahr mit deiner Katze",
    "inside": [
      "Erinnerungsseiten für die Ankunft und das erste Kennenlernen",
      "12 Monatskapitel, um eure gemeinsame Entwicklung festzuhalten",
      "Fragen zu Persönlichkeit, Lieblingsmomenten und kleinen Eigenheiten",
      "Platz für Fotos, Gedanken und besondere Erinnerungen",
      "Seiten für wichtige Meilensteine und gemeinsame Erlebnisse",
      "Erinnerungsseiten zum Abschluss eures ersten Jahres"
    ],
    "pages": 73
  },
  "first-year-with-you": {
    "tagline": "A little book for the memories you never want to forget",
    "inside": [
      "12 monthly chapters to document your journey together",
      "Prompts for everyday moments, milestones, and little quirks",
      "Pages to remember your cat’s arrival and early days",
      "Space for photos, notes, and personal stories",
      "Additional pages for growth, memories, and important moments"
    ],
    "pages": 73
  },
  "the-cat-care-journal-de": {
    "tagline": "Ein liebevoller Begleiter für den Alltag mit deiner Katze",
    "inside": [
      "Katzenprofil, wichtige Kontakte und Unterlagen auf einen Blick",
      "Tages-, Wochen- und Monatschecklisten für die Pflege",
      "Tracker für Futter, Wasser und Gewicht",
      "Seiten für Pflege, Hygiene und das Katzenklo",
      "Gesundheitsprofil, Medikamente, Impfungen und Tierarztbesuche",
      "Notfallinformationen und Übersicht für Betreuungspersonen",
      "Rückblicke und Erinnerungsseiten"
    ],
    "pages": 53
  },
  "the-cat-care-journal-en": {
    "tagline": "A thoughtful companion for everyday cat care",
    "inside": [
      "Cat profile, important contacts and documents at a glance",
      "Daily, weekly and monthly care checklists",
      "Food, water and weight trackers",
      "Pages for grooming, hygiene and the litter box",
      "Health profile, medications, vaccinations and vet visits",
      "Emergency information and an overview for pet sitters",
      "Reviews and memory pages"
    ],
    "pages": 52
  },
  "the-cat-enrichment-collection-de": {
    "tagline": "Kreative Beschäftigungsideen für ein abwechslungsreiches Katzenleben",
    "inside": [
      "Grundlagen: warum Beschäftigung so wichtig ist und wie deine Katze tickt",
      "Ideen für Spiel, Jagd und Bewegung",
      "Kopfarbeit, Futterspiele und Schnüffelauf gaben",
      "Einfache DIY-Projekte mit Dingen aus dem Haushalt, inklusive Sicherheitscheck",
      "Beschäftigung für Kitten, erwachsene Katzen, Seniorinnen, Wohnungskatzen und schüchterne Katzen",
      "Wochenplan, Tagestracker , 7- Tage-Challenge und eine Bibliothek mit 30 Ideen"
    ],
    "pages": 56
  },
  "the-cat-enrichment-collection-en": {
    "tagline": "Creative ways to make every day more interesting",
    "inside": [
      "The basics: why enrichment matters and how your cat thinks",
      "Ideas for play , hunting and movement",
      "Brain games, food puzzles and sniffing activities",
      "Easy DIY projects with household items, including a safety checklist",
      "Enrichment for kittens, adult cats, seniors, indoor cats and shy cats",
      "Weekly planner , daily tracker, a 7-day challenge and a library of 30 ideas"
    ],
    "pages": 57
  },
  "the-cat-home-collection-de": {
    "tagline": "Ein Zuhause, in dem ihr euch beide wohlfühlt",
    "inside": [
      "Grundlagen für ein Zuhause, das zu euch beiden passt",
      "Raum-für-Raum-Checklisten für die ganze Wohnung",
      "Ideen für Ruhe-, Spiel-, Futter- und Aussichtsplätze",
      "Sicherheitschecks für Fenster, Balkon, Pflanzen und Haushalt",
      "Interior- und Designideen für Katzenzubehör",
      "Organisation, Reinigung und Vorrat",
      "Hilfe bei Umzug, kleinen Wohnungen und Veränderungen",
      "Seiten für eure Geschichte und euer gemeinsames Zuhause"
    ],
    "pages": 77
  },
  "the-cat-home-colletion-en": {
    "tagline": "A home where you both feel at ease",
    "inside": [
      "The basics of a home that suits you both",
      "Room-by-room checklists for your entire home",
      "Ideas for resting, play, feeding and lookout spots",
      "Safety checks for windows, balconies, plants and household items",
      "Interior and design ideas for cat essentials",
      "Organization, cleaning and supplies",
      "Support for moving, small spaces and life changes",
      "Pages for your story and your home together"
    ],
    "pages": 72
  },
  "the-kitten-care-edition-de": {
    "tagline": "Fürsorge und Begleitung im ersten Lebensjahr",
    "inside": [
      "Einzugs-Checkliste mit Ausstattung, Sicherheit und Unterlagen",
      "Protokoll für die ersten sieben Tage",
      "Wachstumstracker Woche für Woche und Entwicklung Monat für Monat",
      "Übersicht für neue Erfahrungen und die spielerische Gewöhnung an die Pflege",
      "Impfungen, Parasitenvorsorge, Mikrochip und Kastration im Blick",
      "Futter im ersten Jahr und Tierarztbesuche",
      "Erinnerungsseiten für eure ersten Male"
    ],
    "pages": 22
  },
  "the-kitten-care-edition-en": {
    "tagline": "Care and guidance for the very first year",
    "inside": [
      "Move-in checklist for supplies, safety and paperwork",
      "A log for the first seven days",
      "Weekly growth tracker and month-by-month development",
      "New experiences and gentle handling practice for grooming",
      "Vaccinations, parasite prevention, microchip and spay/neuter at a glance",
      "Feeding in the first year and vet visits",
      "Memory pages for your first times together"
    ],
    "pages": 22
  },
  "the-multi-cat-household-pack-de": {
    "tagline": "Ein Überblick für alle Katzen unter einem Dach",
    "inside": [
      "Vier Katzenprofile (beliebig oft druckbar)",
      "Ressourcen-Check: genug Klos, Futterplätze und Rückzugsorte für alle",
      "Futterübersicht „Wer frisst was?“ und Wochenplan für Aufgaben",
      "Gesundheitsübersicht für alle Katzen, Impfungen, Termine und Kosten",
      "Beobachtungsseite zum Ausfüllen",
      "Begleitseite für die Zusammenführung einer neuen Katze",
      "Übersicht für Betreuungspersonen und Notfallinformationen"
    ],
    "pages": 18
  },
  "the-multi-cat-household-pack-en": {
    "tagline": "One overview for every cat under one roof",
    "inside": [
      "Four cat profiles (print as often as you need)",
      "Resource check: enough litter boxes, feeding spots and retreats for everyone",
      "“Who Eats What?” feeding overview and a weekly task plan",
      "Health overview for all cats, vaccinations, appointments and expenses",
      "An observation page on living together",
      "A guide page for introducing a new cat",
      "Pet sitter overview and emergency information"
    ],
    "pages": 18
  },
  "the-new-cat-parent-bundle-de": {
    "tagline": "Dein Begleiter für die ersten Wochen mit deiner Katze",
    "inside": [
      "Checklisten und Einkaufslisten für die Zeit vor dem Einzug",
      "Hilfe für die ersten Tage und Wochen der Eingewöhnung",
      "Vorlagen für Fütterung, Pflege und den gemeinsamen Alltag",
      "Übersichten für Gesundheit, Impfungen und Tierarzttermine",
      "Seiten, um Wachstum und Entwicklung festzuhalten",
      "Erinnerungsseiten für eure ersten gemeinsamen Momente"
    ],
    "pages": 53
  },
  "the-new-cat-parent-bundle-en": {
    "tagline": "Your companion for the first weeks with your new cat",
    "inside": [
      "Checklists and shopping lists for the time before move-in day",
      "Support for the first days and weeks of settling in",
      "Templates for feeding, grooming and everyday life",
      "Overviews for health, vaccinations and vet appointments",
      "Pages to record growth and development",
      "Memory pages for your first moments together"
    ],
    "pages": 53
  },
  "the-senior-cat-care-edtion-en": {
    "tagline": "Gentle care for the later years",
    "inside": [
      "Monthly senior check with 15 observation points",
      "“Keeping Track of Good Days”: a gentle weekly review",
      "Record weight, behavior and changes",
      "Checkups, medications and vet visits",
      "Checklist for a home that ages with your cat",
      "Gentle enrichment and grooming ideas",
      "Memory pages: What I love about you"
    ],
    "pages": 23
  },
  "the-senior-cat-edition-de": {
    "tagline": "Liebevolle Fürsorge für die späteren Jahre",
    "inside": [
      "Monatlicher Senioren-Check mit 15 Beobachtungspunkten",
      "„Gute Tage im Blick“: ein sanfter Wochenrückblick",
      "Gewicht, Verhalten und Veränderungen dokumentieren",
      "Vorsorgekontrollen, Medikamente und Tierarztbesuche",
      "Checkliste für ein Zuhause, das mitaltert",
      "Sanfte Beschäftigungs- und Pflegeideen",
      "Erinnerungsseiten: Was ich an dir liebe"
    ],
    "pages": 23
  },
  "the-veterinary-records-pack-de": {
    "tagline": "Gesundheit, Behandlungen und Termine gut dokumentiert",
    "inside": [
      "Katzenprofil, Tierarztkontakte und Dokumenten-Checkliste",
      "Impfpass-Übersicht, Parasitenvorsorge und Gewichtsverlauf",
      "Vorbereitung für Tierarzttermine und Besuchsprotokolle",
      "Behandlungen, Eingriffe, Befunde und Krankengeschichte im Überblick",
      "Medikamenten-Tracker und Rezeptnotizen",
      "Symptomprotokoll und Notfallinformationen",
      "Tierarztkosten sowie Versicherung und Erstattungen"
    ],
    "pages": 20
  },
  "the-veterinary-records-pack-en": {
    "tagline": "Health, treatments and appointments, clearly recorded",
    "inside": [
      "Cat profile, vet contacts and a document checklist",
      "Vaccination record, parasite prevention and weight history",
      "Vet visit preparation and visit records",
      "Treatments, procedures, test results and medical history at a glance",
      "Medication tracker and prescription notes",
      "Symptom log and emergency information",
      "Vet expenses plus insurance and claims"
    ],
    "pages": 20
  }
};
