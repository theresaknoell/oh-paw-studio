// Kurzbeschreibung und Inhalte aus dem Gumroad-Shop (Stand November 2026).
export type ProductDetail = {
  tagline: string;
  intro: string[];
  inside: string[];
  pages: number | null;
};

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
    "pages": 73,
    "intro": [
      "Die ersten gemeinsamen Monate sind voller kleiner und großer Momente: das erste Ankommen, neue Lieblingsplätze, lustige Eigenheiten und all die Augenblicke, die das Leben mit deiner Katze so besonders machen.",
      "„Mein erstes Jahr mit dir“ begleitet dich durch dieses einzigartige erste Jahr und hilft dir, Erinnerungen festzuhalten, die du für immer bewahren möchtest.",
      "Ob du gerade ein Kitten bei dir willkommen heißt oder das erste Jahr mit deiner Katze bewusst dokumentieren möchtest – dieses Buch bietet Raum für eure ganz persönliche Geschichte.",
      "Das Erinnerungsbuch wurde bewusst schlicht und tintensparend gestaltet – mit viel Weißraum, klaren Linien und ohne große, vollflächige Farbflächen."
    ]
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
    "pages": 73,
    "intro": [
      "My First Year with You is a thoughtfully designed printable memory book created to help you capture the little moments, milestones, and stories that make life with your cat so special.",
      "From the days before you met to your first twelve months together, this book gives you space to reflect, write, add photos, and preserve your memories in your own way."
    ]
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
    "pages": 53,
    "intro": [
      "Ein Leben mit einer Katze besteht aus vielen kleinen Dingen: vertrauten Routinen, besonderen Vorlieben, täglichen Pflegeaufgaben und Momenten, die man manchmal erst später richtig zu schätzen weiß.",
      "„The Cat Care Journal“ bringt all das an einen Ort. Hier sammelst du wichtige Informationen über deine Katze, organisierst Fütterung und Pflege, dokumentierst Gewicht und Gesundheit und bereitest Tierarztbesuche gut vor.",
      "Ob Kitten, erwachsene Katze oder Seniorin: Das Journal begleitet euch durch alle Lebensphasen."
    ]
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
    "pages": 52,
    "intro": [
      "Life with a cat is made of many little things: familiar routines, special preferences, everyday care and moments you sometimes only truly appreciate later.",
      "“The Cat Care Journal” brings all of it together in one place. Collect important information about your cat, organize feeding and grooming, keep track of weight and health and prepare for vet visits with ease.",
      "Kitten, adult or senior: this journal supports you through every stage of life."
    ]
  },
  "the-cat-enrichment-collection-de": {
    "tagline": "Kreative Beschäftigungsideen für ein abwechslungsreiches Katzenleben",
    "inside": [
      "Grundlagen: warum Beschäftigung so wichtig ist und wie deine Katze tickt",
      "Ideen für Spiel, Jagd und Bewegung",
      "Kopfarbeit, Futterspiele und Schnüffelaufgaben",
      "Einfache DIY-Projekte mit Dingen aus dem Haushalt, inklusive Sicherheitscheck",
      "Beschäftigung für Kitten, erwachsene Katzen, Seniorinnen, Wohnungskatzen und schüchterne Katzen",
      "Wochenplan, Tagestracker, 7-Tage-Challenge und eine Bibliothek mit 30 Ideen"
    ],
    "pages": 56,
    "intro": [
      "Katzen sind neugierige Entdecker mit großen Instinkten. Sie wollen jagen, schnüffeln, knobeln und ihre Umgebung erkunden. Gerade im Alltag in der Wohnung kommt das oft zu kurz.",
      "„The Cat Enrichment Collection“ zeigt dir, wie du mit einfachen Mitteln mehr Abwechslung in das Leben deiner Katze bringst: mit Spielideen, Futterspielen, Schnüffelaufgaben und Projekten zum Selbermachen.",
      "Dazu helfen dir Planer und Tracker, herauszufinden, was deiner Katze wirklich Freude macht."
    ]
  },
  "the-cat-enrichment-collection-en": {
    "tagline": "Creative ways to make every day more interesting",
    "inside": [
      "The basics: why enrichment matters and how your cat thinks",
      "Ideas for play, hunting and movement",
      "Brain games, food puzzles and sniffing activities",
      "Easy DIY projects with household items, including a safety checklist",
      "Enrichment for kittens, adult cats, seniors, indoor cats and shy cats",
      "Weekly planner, daily tracker, a 7-day challenge and a library of 30 ideas"
    ],
    "pages": 57,
    "intro": [
      "Cats are curious explorers with strong natural instincts. They want to hunt, sniff, solve puzzles and explore. In everyday indoor life, that often falls short.",
      "“The Cat Enrichment Collection” shows you how to bring more variety into your cat’s life with simple means: play ideas, food games, sniffing challenges and easy DIY projects.",
      "Planners and trackers help you find out what your cat truly enjoys."
    ]
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
    "pages": 77,
    "intro": [
      "Ein katzenfreundliches Zuhause muss weder chaotisch noch voller Kratzbäume sein. Mit ein bisschen Planung entsteht ein Ort, an dem sich deine Katze sicher fühlt und der trotzdem nach dir aussieht.",
      "„The Cat Home Collection“ führt dich Raum für Raum durch eure Wohnung: von Rückzugsorten und Aussichtsplätzen über Sicherheit bis zu Interior-Ideen, die Katzenzubehör schön in dein Zuhause integrieren.",
      "Ob Einzug, Umzug oder einfach der Wunsch nach mehr Ordnung: Diese Collection hilft dir, euer Zuhause bewusst zu gestalten."
    ]
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
    "pages": 72,
    "intro": [
      "A cat-friendly home doesn’t have to be chaotic or filled with cat trees. With a little planning, you can create a space where your cat feels safe that still looks and feels like you.",
      "“The Cat Home Collection” takes you room by room through your home: from quiet retreats and lookout spots to safety and interior ideas that blend cat essentials beautifully into your space.",
      "Moving in, moving house or simply wanting more order: this collection helps you design your home with intention."
    ]
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
    "pages": 22,
    "intro": [
      "Ein Kitten bringt Bewegung in jedes Zuhause. Es entdeckt, lernt, schläft viel und wächst schneller, als man denkt. Gerade im ersten Jahr verändert sich fast jede Woche etwas.",
      "„The Kitten Care Edition“ begleitet euch durch genau diese Zeit: vom Einzug über Impfungen und Parasitenvorsorge bis zu dem Moment, in dem aus deinem Kitten eine junge Katze geworden ist.",
      "Damit du nichts vergisst und gleichzeitig die schönsten ersten Male festhältst."
    ]
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
    "pages": 22,
    "intro": [
      "A kitten brings energy into every home. They explore, learn, sleep a lot and grow faster than you might expect. During the first year, something changes almost every week.",
      "“The Kitten Care Edition” is your companion through exactly that time: from move-in day through vaccinations and parasite prevention to the moment your kitten has become a young cat.",
      "So you don’t miss a thing and still capture all the precious firsts."
    ]
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
    "pages": 18,
    "intro": [
      "Mit mehreren Katzen ist doppelt so viel los: unterschiedliche Charaktere, eigene Vorlieben, verschiedenes Futter und ein gemeinsamer Alltag, der gut organisiert sein will.",
      "„The Multi-Cat Household Pack“ gibt jeder Katze ihr eigenes Profil und zeigt dir auf den Haushaltsseiten Fütterung, Gesundheit und Aufgaben für alle auf einen Blick.",
      "Dazu helfen dir Seiten zum Miteinander deiner Katzen und eine Schritt-für-Schritt-Begleitung, wenn eine neue Katze einzieht."
    ]
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
    "pages": 18,
    "intro": [
      "Life with several cats means twice the activity: different personalities, individual preferences, different food and a shared routine that needs good organization.",
      "“The Multi-Cat Household Pack” gives every cat their own profile, and the household pages show feeding, health and tasks for everyone at a glance.",
      "You’ll also find pages on how your cats get along and step-by-step support for welcoming a new cat."
    ]
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
    "pages": 53,
    "intro": [
      "Eine Katze bei sich aufzunehmen, ist der Beginn einer besonderen Freundschaft. Die ersten Wochen sind aufregend, schön und manchmal auch ein bisschen überwältigend: Was brauche ich vor dem Einzug? Wie gelingt die Eingewöhnung? Und wie behalte ich Futter, Pflege und Tierarzttermine im Blick?",
      "„The New Cat Parent Bundle“ begleitet dich von der Vorbereitung über die ersten Tage bis in euren gemeinsamen Alltag. Mit kompaktem Wissen, Checklisten zum Abhaken und Vorlagen, in denen du alles Wichtige an einem Ort sammelst.",
      "Ideal für alle, die zum ersten Mal eine Katze aufnehmen, und für alle, die ihrer neuen Katze den bestmöglichen Start schenken möchten."
    ]
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
    "pages": 53,
    "intro": [
      "Bringing a cat home is the beginning of a very special friendship. The first weeks are exciting, wonderful and sometimes a little overwhelming: What do I need before move-in day? How do I help my cat settle in? And how do I keep track of feeding, grooming and vet visits?",
      "“The New Cat Parent Bundle” guides you from preparation through the first days and into your everyday life together, with practical knowledge, checklists to tick off and templates that keep everything important in one place.",
      "Perfect for first-time cat parents and for anyone who wants to give their new cat the best possible start."
    ]
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
    "pages": 23,
    "intro": [
      "Over the years, many things become calmer. Favorite spots get warmer, play sessions get shorter and the moments you share often become even more precious.",
      "Older cats often show changes very quietly: they drink a little more, jump onto their favorite spot less often or groom themselves less thoroughly.",
      "“The Senior Cat Care Edition” helps you record these little things regularly and mention them specifically to your veterinarian.",
      "You’ll also find ideas to make everyday life more comfortable for your older cat."
    ]
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
    "pages": 23,
    "intro": [
      "Mit den Jahren wird vieles ruhiger. Die Lieblingsplätze werden wärmer, die Spielrunden kürzer und die gemeinsamen Momente oft noch wertvoller.",
      "Ältere Katzen zeigen Veränderungen häufig nur leise: Sie trinken etwas mehr, springen seltener auf ihren Lieblingsplatz oder putzen sich weniger gründlich.",
      "„The Senior Cat Care Edition“ hilft dir, solche Kleinigkeiten regelmäßig festzuhalten und bei der Tierarztpraxis gezielt anzusprechen.",
      "Dazu findest du Ideen, wie du den Alltag deiner Katze im Alter bequemer gestaltest."
    ]
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
    "pages": 20,
    "intro": [
      "Beim Tierarzt zählt oft jedes Detail: Wann war die letzte Impfung? Welches Medikament hat geholfen? Seit wann besteht ein Problem?",
      "„The Veterinary Records Pack“ bündelt alle Gesundheitsunterlagen deiner Katze an einem Ort: Impfungen, Parasitenvorsorge, Tierarztbesuche, Befunde, Medikamente und Kosten.",
      "So hast du bei jedem Termin, bei einem Praxiswechsel oder im Notfall alle Antworten griffbereit."
    ]
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
    "pages": 20,
    "intro": [
      "At the vet, details matter: When was the last vaccine? Which medication helped? How long has a problem been going on?",
      "“The Veterinary Records Pack” keeps all of your cat’s health records in one place: vaccinations, parasite prevention, vet visits, test results, medications and expenses.",
      "So you have every answer at hand for each appointment, when changing clinics or in an emergency."
    ]
  },
  "the-seasonal-enrichment-collection-de": {
    "tagline": "Beschäftigungsideen für jede Jahreszeit",
    "intro": [
      "Auch für Katzen verändert sich das Jahr: Das Licht wird anders, draußen gibt es Neues zu beobachten, und im Haushalt stehen andere Dinge im Mittelpunkt.",
      "„The Seasonal Enrichment Collection“ begleitet euch durch Frühling, Sommer, Herbst und Winter. Für jede Saison findest du eine Übersicht mit Sicherheitshinweisen, sechs passende Beschäftigungsideen und einen Tracker für eure Erfahrungen.",
      "Vom Vogelkino im Frühling über die Schattenhöhle im Sommer bis zum Katzen-Adventskalender im Winter."
    ],
    "inside": [
      "Vier Saisonüberblicke mit Vorbereitungs-Checkliste",
      "Sicherheitshinweise, zum Beispiel zu giftigen Pflanzen, Hitze und Weihnachtsdeko",
      "24 Beschäftigungsideen, sechs pro Jahreszeit",
      "Platz für eigene Ideen",
      "Saison-Tracker mit Fotoplatz",
      "Jahresrückblick und Notizseiten"
    ],
    "pages": 16
  },
  "the-seasonal-enrichment-collection-en": {
    "tagline": "Enrichment ideas for every season",
    "intro": [
      "The year changes for cats, too: the light shifts, there are new things to watch outside, and different things take center stage at home.",
      "“The Seasonal Enrichment Collection” takes you through spring, summer, fall and winter. For each season, you’ll find an overview with safety tips, six fitting enrichment ideas and a tracker for your experiences.",
      "From bird TV in spring and a shady den in summer to a cat advent calendar in winter."
    ],
    "inside": [
      "Four season overviews with a prep checklist",
      "Safety tips, for example on toxic plants, heat and holiday decorations",
      "24 enrichment ideas, six per season",
      "Space for your own ideas",
      "Season trackers with room for a photo",
      "Year in review and notes pages"
    ],
    "pages": 16
  },
  "30-days-of-cat-enrichment-de": {
    "tagline": "Jeden Tag eine kleine Idee für mehr Abwechslung",
    "intro": [
      "30 Tage, 30 kleine Abenteuer: Diese Challenge bringt jeden Tag eine neue Beschäftigungsidee in euren Alltag. Keine dauert lange, und keine braucht teures Zubehör.",
      "Jeden Tag probierst du eine Idee aus, notierst kurz die Reaktion deiner Katze und schaust am Ende jeder Woche, was gut funktioniert hat.",
      "Nach 30 Tagen kennst du die Lieblingsbeschäftigungen deiner Katze und habt gemeinsam viele neue Momente erlebt."
    ],
    "inside": [
      "Startseite, um den Ist-Zustand festzuhalten",
      "30 Tagesideen aus Spiel, Erkunden, Kopfarbeit, Schnüffeln, Ruhe und Kreativität",
      "Platz für Reaktion und Notizen zu jedem Tag",
      "Vier Wochenrückblicke",
      "Übersicht aller 30 Tage mit Punktebewertung",
      "Abschlussseite, um eure Erfolge zu feiern"
    ],
    "pages": 18
  },
  "30-days-of-cat-enrichment-en": {
    "tagline": "One little idea a day for a more varied life",
    "intro": [
      "30 days, 30 little adventures: this challenge brings a new enrichment idea into your everyday life every day. None of them take long, and none require expensive equipment.",
      "Each day, try one idea, jot down how your cat reacted and look back at the end of each week at what worked well.",
      "After 30 days, you’ll know your cat’s favorite activities and have shared lots of new moments together."
    ],
    "inside": [
      "A starting page to capture where you are today",
      "30 daily ideas across play, exploring, thinking, sniffing, calm and creativity",
      "Space for reactions and notes every day",
      "Four weekly reviews",
      "An overview of all 30 days with scores",
      "A finish page to celebrate your success"
    ],
    "pages": 18
  },
  "th-indoor-cat-activity-planner-de": {
    "tagline": "Mehr Abwechslung für Wohnungskatzen, gut geplant",
    "intro": [
      "Wohnungskatzen erleben ihre ganze Welt in deinem Zuhause. Damit sie dort genug zu entdecken, zu jagen und zu erkunden haben, braucht es keine großen Umbauten, sondern einen guten Plan.",
      "„The Indoor Cat Activity Planner“ hilft dir, Beschäftigung fest in euren Alltag einzubauen: mit einem Revier-Check für eure Wohnung, einem passenden Tagesrhythmus und Plänen für Woche und Monat.",
      "So entsteht Abwechslung, die zu deiner Katze passt, ohne dass du jeden Tag etwas Neues erfinden musst."
    ],
    "inside": [
      "Revier-Check: Was bietet eure Wohnung Raum für Raum?",
      "Beschäftigungsprofil und Beschäftigungstyp deiner Katze",
      "Tagesrhythmus mit Spielzeiten und Ideen für die Zeit allein",
      "Wochenplan, Tagestracker und Monatsplan",
      "Spielzeug-Rotation",
      "30 Ideen und ein Spickzettel für schnelle Inspiration",
      "Rückblick: Was funktioniert wirklich?"
    ],
    "pages": 16
  },
  "the-indoor-cat-activity-planner-en": {
    "tagline": "More variety for indoor cats, planned with ease",
    "intro": [
      "Indoor cats experience their entire world inside your home. To give them enough to discover, hunt and explore, you don’t need big renovations, just a good plan.",
      "“The Indoor Cat Activity Planner” helps you build enrichment into your everyday routine: with a territory check for your home, a daily rhythm that fits and plans for each week and month.",
      "That way, you create variety that suits your cat without having to invent something new every day."
    ],
    "inside": [
      "Territory check: what does your home offer, room by room?",
      "Your cat’ s enrichment profile and enrichment style",
      "Daily rhythm with play times and ideas for alone time",
      "Weekly planner, daily tracker and monthly plan",
      "Toy rotation",
      "30 ideas and a quick guide for instant inspiration",
      "Review: what really works?"
    ],
    "pages": 16
  },
  "the-diy-enrichment-book-de": {
    "tagline": "Einfache Beschäftigungsideen zum Selbermachen",
    "intro": [
      "Für gute Beschäftigung brauchst du kein teures Spielzeug. Ein Karton, ein paar Papierrollen oder ein altes Handtuch reichen oft schon, um den Alltag deiner Katze spannender zu machen.",
      "„The DIY Enrichment Book“ sammelt einfache Projekte, die du mit Dingen aus dem Haushalt in wenigen Minuten umsetzen kannst: Suchspiele, Futterpuzzles, Verstecke und mehr.",
      "Jedes Projekt kommt mit Materialliste, Schritt-für-Schritt-Anleitung und Sicherheitshinweis."
    ],
    "inside": [
      "Sicherheitscheck und Materialliste für alle Projekte",
      "Such- und Schnüffelspiele, zum Beispiel Muffinblech-Spiel und Handtuch-Schatzrolle",
      "Knobelaufgaben wie Papierrollen-Pyramide und Schuhkarton-Labyrinth",
      "Ideen zum Entdecken: Karton-Verstecke, Entdeckerzone, Fensterplatz und Kickkissen",
      "Platz, um die Reaktion deiner Katze festzuhalten",
      "DIY-Protokoll und Seite für die Lieblingsbeschäftigungen"
    ],
    "pages": 18
  },
  "the-diy-enrichment-book-en": {
    "tagline": "Simple enrichment projects to make at home",
    "intro": [
      "Great enrichment doesn’t require expensive toys. A box, a few paper rolls or an old towel are often enough to make your cat’s day more exciting.",
      "“The DIY Enrichment Book” is a collection of simple projects you can make in minutes with things you already have at home: search games, food puzzles, hiding spots and more.",
      "Every project comes with a materials list, step-by-step instructions and a safety tip."
    ],
    "inside": [
      "Safety check and materials list for every project",
      "Search and sniff games like the Muffin Tin Game and the Towel Treasure Roll",
      "Puzzles like the Paper Roll Pyramid and the Shoebox Maze",
      "Ideas to explore: box hideouts, an exploration zone, a window spot and a kicker pillow",
      "Space to record how your cat reacted",
      "A DIY log and a page for your cat’s favorite activities"
    ],
    "pages": 18
  },
  "the-printable-care-planner-en": {
    "tagline": "Trackers and checklists for everyday cat care",
    "intro": [
      "Sometimes you don’t need a whole book, just the right template at the right time.",
      "“The Printable Care Planner” is a set of individual trackers and checklists. Every page works on its own: print only what you need right now, as often as you like.",
      "Put the weekly plan on the fridge, the food tracker next to the feeding spot and stay on top of everything without even thinking about it."
    ],
    "inside": [
      "Year-at-a-glance overview for all recurring appointments",
      "Daily routine, weekly plan and monthly checklist",
      "Food, water and weight trackers",
      "Grooming and litter box trackers",
      "Medications and appointments",
      "Supplies and shopping list",
      "Expense overview and monthly review"
    ],
    "pages": 16
  }
};
