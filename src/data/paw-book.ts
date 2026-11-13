// Erinnerungsbuch in My Paw Space, aufgebaut nach dem Buch „Mein erstes Jahr mit dir“ (Oh Paw Studio).
// Kapitel → Seiten → Felder. Neue Texte hier ändern oder ergänzen.
// Achtung: Die Antworten werden pro Feld gespeichert (Einheit-ID, Seiten-ID und Nummer des Feldes). Wer Felder
// umsortiert oder löscht, verschiebt damit bereits gespeicherte Antworten. Am Ende anhängen ist unproblematisch.
//
// Sprache: Aktuell nur Deutsch. Die englische Fassung folgt, sobald das englische Buch vorliegt.

export type RawField =
  | { kind: "long"; q: string; sub?: string; rows?: number }
  | { kind: "short"; q: string }
  | { kind: "list"; q: string; count: number }
  | { kind: "photo"; q: string; sub?: string }
  | { kind: "heading"; q: string }
  | { kind: "note"; q: string }
  | { kind: "table"; q?: string; columns: string[]; rows: number };

export type Field = RawField & { id: string };
export type Page = { id: string; title?: string; subtitle?: string; intro?: string; fields: Field[] };
export type Unit = {
  id: string;
  group: string; // Überschrift in der Kapitelliste
  no?: string; // z. B. „Kapitel 01“ oder „Monat 03“
  title: string;
  subtitle?: string;
  intro?: string;
  impulse?: string; // „Mein Erinnerungsimpuls“
  pages: Page[];
};

// ---- Bausteine ----
const long = (q: string, o: { sub?: string; rows?: number } = {}): RawField => ({ kind: "long", q, ...o });
const short = (q: string): RawField => ({ kind: "short", q });
const photo = (q: string, sub?: string): RawField => ({ kind: "photo", q, sub });
const head = (q: string): RawField => ({ kind: "heading", q });
const note = (q: string): RawField => ({ kind: "note", q });
const list = (q: string, count = 3): RawField => ({ kind: "list", q, count });
const table = (columns: string[], rows: number, q?: string): RawField => ({ kind: "table", q, columns, rows });

type RawPage = { title?: string; subtitle?: string; intro?: string; fields: RawField[] };
type RawUnit = Omit<Unit, "pages"> & { pages: RawPage[] };

const finalize = (u: RawUnit): Unit => ({
  ...u,
  pages: u.pages.map((p, pi) => ({
    ...p,
    id: `p${pi + 1}`,
    fields: p.fields.map((f, fi) => ({ ...f, id: `f${fi + 1}` }) as Field),
  })),
});

const dateLine = "Datum oder Zeitraum:";
const lookBack = "Wenn ich später darauf zurückblicke, möchte ich mich daran erinnern, dass ...";

// ---- Monatskapitel ----
type Month = {
  n: number;
  title: string;
  subtitle: string;
  intro: string;
  impulse: string;
  q: { subtitle?: string; intro: string; fields: RawField[] };
  photo: { subtitle?: string; intro: string; fields: RawField[] };
};

const month = (m: Month): RawUnit => ({
  id: `m${m.n}`,
  group: "03 · Unser erstes Jahr – Monat für Monat",
  no: `Monat ${String(m.n).padStart(2, "0")}`,
  title: m.title,
  subtitle: m.subtitle,
  intro: m.intro,
  impulse: m.impulse,
  pages: [
    { title: m.title, subtitle: m.q.subtitle, intro: m.q.intro, fields: m.q.fields },
    { title: m.title, subtitle: m.photo.subtitle, intro: m.photo.intro, fields: m.photo.fields },
  ],
});

const months: RawUnit[] = [
  month({
    n: 1,
    title: "Alles ist neu",
    subtitle: "Zwei Leben, die sich erst noch aufeinander einstellen.",
    intro:
      "Der erste gemeinsame Monat steckt voller kleiner Entdeckungen. Du lernst meine Gewohnheiten kennen, ich entdecke deine Eigenheiten - und nach und nach finden wir heraus, wie unser Alltag zusammenpasst.\n\nVielleicht gibt es noch vieles, das ungewohnt ist. Vielleicht hast du schon einen Lieblingsplatz gefunden, erkennst vertraute Geräusche oder weißt genau, wann es Zeit zum Spielen ist. Manche Veränderungen fallen sofort auf. Andere zeigen sich erst mit der Zeit. Es geht nicht darum, wie viel in diesem Monat passiert ist. Es geht darum, was diesen Anfang für uns besonders gemacht hat.",
    impulse:
      "Was war in diesem Monat neu? Welche kleine Eigenheit habe ich an dir entdeckt? Und gab es einen Moment, in dem ich zum ersten Mal dachte: Jetzt kommen wir langsam miteinander an?",
    q: {
      subtitle: "Zwei Leben, die sich erst noch aufeinander einstellen.",
      intro:
        "Ich lernte dich kennen, während du deine neue Welt entdecktest. Manche Dinge waren aufregend, andere vielleicht noch ungewohnt. Und irgendwo zwischen den ersten Erkundungstouren und den ruhigen Momenten begann unser gemeinsames Leben.",
      fields: [
        long("Was hat dich in deinem neuen Alltag am meisten beschäftigt?"),
        long("Welche Eigenschaften habe ich in diesem Monat an dir entdeckt?"),
        long("Ein Moment aus diesem Monat, den ich nicht vergessen möchte:"),
        long("Was ist uns inzwischen schon vertrauter geworden?"),
        long("Wo hast du dich zuerst wohlgefühlt?"),
        long("Gab es einen Moment, in dem ich dachte: Jetzt fühlst du dich zu Hause?"),
      ],
    },
    photo: {
      subtitle: "Unser erster Monat in Bildern",
      intro:
        "Ein Foto muss nicht perfekt sein, um eine Erinnerung festzuhalten. Vielleicht zeigt es deinen Lieblingsplatz, ein neues Spielzeug, einen verschlafenen Morgen oder einfach einen ganz gewöhnlichen Moment, der sich heute schon vertraut anfühlt.",
      fields: [photo("Ein Foto aus unserem ersten Monat"), short(dateLine), long("Was auf diesem Bild passiert:"), long("Wenn ich später daraus zurückblicke, möchte ich mich daran erinnern, dass ...")],
    },
  }),
  month({
    n: 2,
    title: "Du wirst mutiger",
    subtitle: "Vertrautheit wächst in kleinen Schritten",
    intro:
      "Langsam wird aus dem neuen Zuhause ein vertrauter Ort. Du bewegst dich sicherer, zeigst mehr von deiner Persönlichkeit und erkundest Ecken, bei denen du anfangs noch gezögert hast.\n\nVon Tag zu Tag verstehe ich besser, was dich neugierig macht, was dir Sicherheit gibt und was dich zum Schnurren bringt. Manche Veränderungen sind deutlich zu erkennen. Andere zeigen sich erst, wenn ich meine Erinnerungen mit denen vom Anfang vergleiche.\n\nVielleicht fühlt sich etwas, das zunächst ungewohnt war, inzwischen ganz selbstverständlich an. Oder ich entdecke eine Eigenheit an dir, die mir im ersten Monat noch gar nicht aufgefallen ist.\n\nEs muss nicht jeden Tag etwas Neues passieren. Auch ruhige Momente und kleine Schritte gehören zu unserer Geschichte.",
    impulse:
      "Wenn ich an unseren ersten Monat zurückdenke: Was fühlt sich heute vertrauter an? Was hast du inzwischen für dich entdeckt? Und welche neue Seite deiner Persönlichkeit durfte ich kennenlernen?",
    q: {
      subtitle: "Was sich verändert hat",
      intro:
        "In diesem Monat hat sich einiges verändert. Vielleicht traust du dich inzwischen mehr zu und zeigst Seiten von dir, die ich vorher noch nicht kannte.\n\nManche Schritte sind groß, andere ganz klein. Alle gehören zu unserer Geschichte.",
      fields: [
        long("Was hast du in diesem Monat neu entdeckt?"),
        long("Gab es etwas, bei dem du anfangs vorsichtig warst, das jetzt aber schon vertrauter ist?"),
        long("Welche Eigenheit ist mir in diesem Monat besonders aufgefallen?"),
        long("Welcher gemeinsame Moment hat mich besonders zum Lächeln gebracht?"),
        long("Hast du einen neuen Lieblingsplatz oder ein neues Lieblingsspiel gefunden?"),
        long("Was fühlt sich in unserem Alltag inzwischen ganz selbstverständlich an?"),
        long("Das habe ich in diesem Monat neu über dich gelernt:"),
      ],
    },
    photo: {
      intro:
        "Manchmal zeigen Fotos Veränderungen, die im Alltag kaum auffallen. Vielleicht wirkst du auf einem Bild schon viel selbstsicherer, erkundest neugierig einen neuen Ort oder liegst ganz selbstverständlich an deinem Lieblingsplatz.\n\nHalte einen dieser Momente fest - ganz egal, ob es ein kleines Abenteuer oder ein ruhiger Augenblick ist.",
      fields: [photo("Ein Foto aus unserem zweiten Monat"), short(dateLine), long("Was auf diesem Bild passiert:"), long("Das macht diesen Monat besonders:"), long(lookBack)],
    },
  }),
  month({
    n: 3,
    title: "Dein kleiner Charakter",
    subtitle: "Du bist nicht einfach irgendeine Katze",
    intro:
      "Mit jedem Tag lerne ich dich ein bisschen besser kennen. Ich entdecke, was dich neugierig macht, worüber du dich freust und welche kleinen Eigenheiten dich unverwechselbar machen.\n\nVielleicht bist du mutig, verspielt, verschmust oder lieber erst einmal vorsichtig. Vielleicht hast du deinen ganz eigenen Kopf und überraschst mich immer wieder mit deiner Art, die Welt zu entdecken.\n\nDein Charakter zeigt sich nicht nur in besonderen Momenten. Oft steckt er in den kleinen Wiederholungen: darin, wie du meine Aufmerksamkeit suchst, spielst, dich ausruhst oder auf neue Situationen reagierst.\n\nUnd während ich dich immer besser kennenlerne, darfst du dich weiterentwickeln. Was ich heute über dich festhalte, ist ein liebevoller Blick auf den kleinen Charakter, den ich gerade entdecke.",
    impulse:
      "Beschreibe nicht nur, wie du bist, sondern auch, woran ich das erkenne. Manchmal erzählt eine kleine Situation mehr als drei passende Wörter.",
    q: {
      subtitle: "Das bist einfach du",
      intro:
        "Und irgendwann merkt man: Du bist nicht einfach irgendeine Katze. Du bist ganz genau du - mit deinem eigenen Kopf, deinen kleinen Eigenheiten und deiner ganz persönlichen Art, die Welt zu sehen.",
      fields: [
        list("Welche drei Worte beschreiben dich momentan am besten?"),
        long("Welche Angewohnheit ist typisch für dich?"),
        long("Was machst du auf deine ganz eigene Art?"),
        long("Wie forderst du meine Aufmerksamkeit?"),
        long("Woran merke ich, dass du dich wohlfühlst?"),
        long("Eine kleine Situation, die deinen Charakter besonders gut zeigt:"),
      ],
    },
    photo: {
      subtitle: "Unser dritter Monat in Bildern",
      intro:
        "Manche Bilder halten nicht nur einen Moment fest, sondern zeigen auch ein Stück deiner Persönlichkeit. Vielleicht deinen neugierigen Blick, deine verspielte Seite, deine liebste Art zu kuscheln oder einen dieser Momente, in denen du einfach ganz du selbst bist.",
      fields: [photo("Ein Foto, das deinen Charakter zeigt"), short(dateLine), long("Was auf diesem Bild passiert:"), long("Das macht diesen Moment so typisch für dich:"), long(lookBack)],
    },
  }),
  month({
    n: 4,
    title: "Immer mehr du",
    subtitle: "Die kleinen Dinge werden vertraut",
    intro:
      "Mit der Zeit werden manche Dinge ganz selbstverständlich. Ich weiß immer besser, wann du spielen möchtest, wo du am liebsten schläfst und welche kleinen Rituale zu unserem Alltag gehören.\n\nVielleicht hast du ein Spielzeug, das du immer wieder hervorholst, einen Lieblingsplatz, den du dir ganz für dich ausgesucht hast, oder eine bestimmte Tageszeit, in der du besonders aktiv wirst. Vielleicht hast du auch eine Vorliebe, mit der ich niemals gerechnet hätte.\n\nSolche Kleinigkeiten wirken im Alltag oft selbstverständlich. Doch gerade sie erzählen viel darüber, was dich ausmacht und wie unser gemeinsames Leben aussieht.\n\nDeine Vorlieben können sich verändern. Deshalb möchte ich festhalten, was gerade typisch für dich ist - als kleine Momentaufnahme unserer gemeinsamen Zeit.",
    impulse:
      "Welche Dinge gehören inzwischen ganz selbstverständlich zu deinem Alltag? Was magst du besonders gerne? Und gibt es eine kleine Gewohnheit oder Vorliebe, die mich immer wieder überrascht?",
    q: {
      subtitle: "Deine kleinen Favoriten",
      intro:
        "Vielleicht hast du inzwischen einen Lieblingsplatz, ein bestimmtes Spielzeug oder ein kleines Ritual, auf das du dich jeden Tag freust.",
      fields: [
        short("Was ist momentan dein absolutes Lieblingsding?"),
        short("Welches Ritual haben wir inzwischen gemeinsam?"),
        short("Was darf in deinem Alltag auf keinen Fall fehlen?"),
        short("Dein Lieblingsspielzeug:"),
        short("Dein Lieblingsplatz:"),
        short("Deine liebste Tageszeit:"),
        short("Deine liebsten Snacks oder Futtervorlieben:"),
        short("Eine ungewöhnliche Vorliebe von dir:"),
      ],
    },
    photo: {
      subtitle: "Ein Blick auf deine Lieblingsdinge",
      intro:
        "Vielleicht ist es der Platz am Fenster, ein bestimmtes Spielzeug oder eine kleine Ecke, die du immer wieder aufsuchst. Manchmal verrät gerade das, was wir täglich sehen, wie besonders unser gemeinsamer Alltag geworden ist.",
      fields: [photo("Ein Foto von deinem Lieblingsplatz oder Lieblingsspielzeug"), short(dateLine), long("Das magst du daran besonders:"), long("Eine kleine Geschichte oder Erinnerung, die ich damit verbinde:"), long(lookBack)],
    },
  }),
  month({
    n: 5,
    title: "Kleine Abenteuer",
    subtitle: "Nicht jedes Abenteuer beginnt vor der Haustür",
    intro:
      "Ein Abenteuer muss nicht groß sein. Manchmal reicht eine neue Kartonschachtel, ein sonniger Platz oder eine Ecke, die bisher noch niemand erkundet hat. Manchmal ist es ein neues Spiel, ein gemeinsamer Ausflug oder eine Situation, die uns beide überrascht.\n\nMit jedem gemeinsamen Erlebnis entstehen neue Erinnerungen. Manche bringen uns zum Lachen, andere zeigen mir, wie neugierig du bist und wie gerne du deine Welt entdeckst.\n\nDabei müssen wir nichts Besonderes planen, um etwas zu erleben. Oft sind es gerade die ungeplanten Momente, die später eine schöne Geschichte ergeben.",
    impulse:
      "Was hat uns in diesem Monat überrascht? Welches kleine Abenteuer würdest du später gerne noch einmal erleben? Und welche Geschichte würde ich jemandem erzählen, wenn er mich nach unseren schönsten gemeinsamen Erlebnissen fragt?",
    q: {
      subtitle: "Ein Abenteuer muss nicht groß sein.",
      intro:
        "Manchmal reicht eine neue Schachtel, ein sonniger Platz oder eine Ecke, die bisher noch niemand erkundet hat. Manchmal ist es ein gemeinsamer Ausflug oder eine Situation, die wir beide so schnell nicht vergessen.",
      fields: [
        long("Was war unser schönstes kleines Abenteuer in diesem Monat?"),
        long("Was hat dich besonders neugierig gemacht?"),
        long("Haben wir etwas zum ersten Mal gemeinsam ausprobiert?"),
        long("Was war der lustigste Moment?"),
        long("Womit hast du mich überrascht?"),
        long("Welchen Moment würde ich gerne noch einmal erleben?"),
        long("Das kleine Abenteuer, von dem ich noch lange erzählen möchte:"),
      ],
    },
    photo: {
      subtitle: "Unser kleines Abenteuer in Bildern",
      intro:
        "Ein Foto hält einen Augenblick fest. Die Geschichte dahinter macht ihn zu einer Erinnerung.\n\nVielleicht zeigt das Bild deine erste Begegnung mit etwas Neuem, einen besonders neugierigen Moment oder eine Situation, über die ich heute noch lachen muss. Es muss kein perfektes Foto sein - wichtig ist, dass es uns an etwas erinnert, das wir gemeinsam erlebt haben.",
      fields: [photo("Unser kleines Abenteuer"), short(dateLine), long("Die Geschichte hinter diesem Bild:"), long("Das war das Besondere an diesem Moment:"), long(lookBack)],
    },
  }),
  month({
    n: 6,
    title: "Halbzeit, kleines Wunder",
    subtitle: "Ein guter Moment, um zurückzublicken",
    intro:
      "Sechs Monate gemeinsamer Alltag können sich gleichzeitig kurz und lang anfühlen. Vielleicht erinnerst du dich noch genau an die ersten Tage. Vielleicht fällt dir erst jetzt auf, wie viel sich seitdem verändert hat.\n\nAus den ersten vorsichtigen Begegnungen sind vertraute Momente geworden. Du hast deine Eigenheiten gezeigt, neue Dinge entdeckt und bist ein Stück mehr in meinem Alltag angekommen. Und während vieles inzwischen selbstverständlich wirkt, steckt in all diesen kleinen Veränderungen unsere gemeinsame Geschichte.\n\nDie Halbzeit ist ein schöner Anlass, kurz innezuhalten und zurückzuschauen. Nicht, um zu bewerten, was sich verändert hat, sondern um wahrzunehmen, was in diesen sechs Monaten gewachsen ist - und was von Anfang an zu dir gehört hat.",
    impulse:
      "Wähle ein Foto aus deiner Anfangszeit und vergleiche es mit einem aktuellen Bild. Was fällt dir auf? Was hat sich verändert? Und was ist überraschend gleich geblieben?\n\nManchmal erkennt man erst im direkten Vergleich, wie viel Zeit vergangen ist. Halte fest, was dir auffällt - auch die kleinen Dinge.",
    q: {
      subtitle: "Damals und heute",
      intro:
        "Manche Momente fühlen sich noch ganz frisch an. Andere gehören bereits zu unserer gemeinsamen Geschichte, als wären sie schon immer da gewesen.\n\nEin guter Zeitpunkt, um zurückzuschauen und zu entdecken, wie viel sich bereits verändert hat - und was uns von Anfang an ausgemacht hat.",
      fields: [
        long("Was hat sich seit unserem Anfang am meisten verändert?"),
        long("Was ist meine liebste Erinnerung aus den vergangenen Monaten?"),
        long("Was überrascht mich an dir immer wieder?"),
        long("Was war am Anfang anders als heute?"),
        long("Welche Eigenheit ist von Anfang an geblieben?"),
        long("Was habe ich durch dich gelernt?"),
        long("Wenn ich an unsere ersten Tage denke, bin ich besonders dankbar für ..."),
      ],
    },
    photo: {
      subtitle: "Sechs Monate mit dir",
      intro:
        "Zwei Bilder, zwei Zeitpunkte und sechs Monate voller kleiner Geschichten dazwischen.\n\nWähle ein Foto aus deiner Anfangszeit und ein aktuelles Bild. Vielleicht erkennst du, wie sehr du gewachsen bist, wie vertraut du dich inzwischen bewegst oder wie manche deiner Eigenheiten von Anfang an dieselben geblieben sind.\n\nEs geht nicht darum, den Unterschied möglichst groß zu machen. Manchmal erzählt gerade das, was gleich geblieben ist, eine besonders schöne Geschichte.",
      fields: [photo("Ein Bild vom Anfang"), short(dateLine), photo("Ein aktuelles Bild"), short(dateLine), long("Wenn ich diese beiden Bilder vergleiche, fällt mir auf ..."), long("Sechs Monate mit dir in einem Satz:")],
    },
  }),
  month({
    n: 7,
    title: "Unser Alltag",
    subtitle: "Aus vielen kleinen Momenten wird Vertrautheit",
    intro:
      "Ein gemeinsames Jahr besteht nicht nur aus besonderen Ereignissen. Es besteht auch aus dem ganz normalen Alltag: Begrüßungen, Spielzeiten, Ruhephasen und den kleinen Ritualen, die sich oft ganz nebenbei entwickeln.\n\nVielleicht begrüßt du mich auf deine eigene Weise, hast einen festen Platz in meiner Nähe oder erinnerst mich jeden Tag daran, wann es Zeit für eine Spielpause ist. Vieles davon wirkt inzwischen selbstverständlich. Doch genau diese kleinen Gewohnheiten erzählen, wie unser gemeinsames Leben aussieht.\n\nDiese Seite lädt mich dazu ein, einen Moment innezuhalten und den Alltag bewusst wahrzunehmen. Denn was heute gewöhnlich erscheint, kann später genau das sein, wonach ich mich beim Zurückblättern sehne.",
    impulse:
      "Wie sieht ein ganz gewöhnlicher Tag mit dir momentan aus? Was passiert morgens, wie verbringen wir unsere gemeinsame Zeit und welcher kleine Moment gehört inzwischen einfach dazu?\nDu musst nichts Besonderes erleben, um etwas festzuhalten. Auch ein ganz normaler Tag ist Teil unserer Geschichte.",
    q: {
      subtitle: "Nicht jeder besondere Moment ist spektakulär.",
      intro:
        "Oft sind es die gewöhnlichen Tage, die sich irgendwann als die schönsten Erinnerungen herausstellen. Die Begrüßung, wenn ich nach Hause komme. Dein Lieblingsplatz in meiner Nähe. Die kleinen Rituale, über die wir gar nicht mehr nachdenken müssen.",
      fields: [
        long("Wie sieht ein typischer Tag mit dir momentan aus?"),
        long("Wie begrüßt du mich, wenn ich nach Hause komme?"),
        long("Welches kleine Ritual gehört inzwischen fest zu unserem Tag?"),
        long("Wo bist du am liebsten, wenn ich zu Hause bin?"),
        long("Was machen wir besonders gerne zusammen?"),
        long("Welcher unscheinbare Moment bringt mich immer wieder zum Lächeln?"),
        long("Was würde mir fehlen, wenn es nicht mehr zu unserem Alltag gehören würde?"),
      ],
    },
    photo: {
      subtitle: "Ein ganz gewöhnlicher Moment",
      intro:
        "Manchmal sind es nicht die großen Erlebnisse, die uns besonders nahegehen. Es ist der Moment, in dem du dich neben mich legst, mich beim Alltag begleitest oder einfach dort bist, wo ich dich am liebsten habe.\n\nHalte einen Augenblick fest, der euren Alltag gerade besonders gut beschreibt. Vielleicht ist es dein Lieblingsplatz, eure gemeinsame Spielzeit oder ein kleines Ritual, das sich längst ganz selbstverständlich anfühlt.",
      fields: [photo("Ein Moment aus unserem Alltag"), short(dateLine), long("Was passiert auf diesem Bild?"), long("Warum gehört dieser Moment zu uns?"), long("Wenn ich mich später an unseren Alltag erinnere, möchte ich nicht vergessen, dass ...")],
    },
  }),
  month({
    n: 8,
    title: "Unverwechselbar du",
    subtitle: "Manche Eigenheiten werden zu Lieblingsgeschichten",
    intro:
      "Vielleicht gibt es eine Angewohnheit, die mich immer wieder zum Lachen bringt. Vielleicht hast du eine ganz eigene Art, meine Aufmerksamkeit zu bekommen, deine Wünsche zu zeigen oder dich an deinen Lieblingsplatz zurückzuziehen.\n\nEs sind oft die kleinen Dinge, an denen ich dich sofort erkenne. Manches davon ist typisch für dich, anderes verstehen vielleicht nur wir beide. Mit der Zeit werden aus diesen Eigenheiten vertraute Rituale und aus manchen Momenten Geschichten, die ich noch lange erzählen möchte.\n\nDieser Monat gehört all den Dingen, die dich unverwechselbar machen. Nicht, weil du etwas Besonderes tun musst, sondern weil du auf deine ganz eigene Weise du bist.",
    impulse:
      "Welche Eigenheit von dir würde ich sofort wiedererkennen? Was machst du auf eine Weise, die nur zu dir passt? Und welche kleine Geschichte würde ich irgendwann gerne erzählen, wenn jemand fragt, was dich so besonders macht?",
    q: {
      subtitle: "Nur du machst das",
      intro:
        "Und es gibt Dinge, die nur du so machst. Eigenheiten, die mich zum Lachen bringen, kleine Marotten, die zu dir gehören, und Momente, in denen ich mich frage, was wohl gerade in deinem Kopf vorgeht.",
      fields: [
        long("Welche Angewohnheit bringt mich immer wieder zum Lachen?"),
        long("Wie bittest du um etwas, das du haben möchtest? Welches Geräusch oder welche Bewegung ist typisch für dich?"),
        long("Was machst du auf eine Weise, die ich so nur von dir kenne?"),
        long("Welche deiner Eigenheiten finde ich besonders liebenswert?"),
        long("Gibt es ein kleines Ritual, das wir beide sofort wiedererkennen würden?"),
        long("Welche Geschichte über dich muss ich unbedingt festhalten?"),
      ],
    },
    photo: {
      subtitle: "Das bist so typisch du",
      intro:
        "Manchmal reicht eine einzige Bewegung, ein bestimmter Blick oder ein vertrautes Geräusch, und ich weiß sofort, was du vorhast.\n\nHalte einen dieser Momente fest. Vielleicht ist es eine lustige Angewohnheit, eine typische Schlafposition oder deine ganz eigene Art, mir zu zeigen, was du möchtest. Das Foto muss nicht perfekt sein - es soll dich so zeigen, wie du wirklich bist.",
      fields: [photo("Eine Eigenheit, die typisch für dich ist"), short(dateLine), long("Was machst du auf diesem Bild?"), long("Warum ist das so typisch für dich?"), long("Wenn ich dieses Bild später ansehe, werde ich bestimmt wieder lächeln, weil ...")],
    },
  }),
  month({
    n: 9,
    title: "So viel erlebt",
    subtitle: "Eine Sammlung aus kleinen Geschichten",
    intro:
      "Nach vielen gemeinsamen Monaten entsteht langsam ein persönlicher Schatz aus Erinnerungen. Vielleicht gibt es ein Erlebnis, an das ich häufig zurückdenke. Vielleicht sind es mehrere kleine Momente, die zusammen diesen Monat ausmachen.\n\nManche Erinnerungen bleiben wegen eines einzigen Augenblicks im Kopf. Andere werden erst besonders, wenn ich mich an die kleinen Details erinnere: deinen Blick, meine Reaktion, das Unerwartete oder das Gefühl, das dieser Moment hinterlassen hat.\n\nIch muss nicht alles chronologisch erzählen und auch nicht jeden Tag festhalten. Entscheidend ist, welche Geschichten ich später gerne wiederfinden möchte.",
    impulse:
      "Wähle eine Geschichte aus diesem Monat und erzähle sie so, als würdest du sie jemandem berichten, der nicht dabei war. Was ist passiert? Was hat den Moment besonders gemacht? Welche kleinen Details möchte ich auf keinen Fall vergessen?\n\nEin Foto kann der Anfang der Geschichte sein - meine Worte machen sie vollständig.",
    q: {
      intro:
        "Manche Erinnerungen bestehen aus einem einzigen Augenblick. Andere setzen sich aus vielen kleinen Momenten zusammen, die erst im Rückblick eine ganze Geschichte ergeben.\nDieser Monat ist eine Einladung, noch einmal auf das zu schauen, was wir erlebt haben.",
      fields: [
        long("Welche Erinnerung aus diesem Monat möchte ich für immer behalten?"),
        long("Was haben wir gemeinsam erlebt, das mir besonders wichtig war?"),
        long("Welcher Moment war ganz anders, als ich erwartet hatte?"),
        long("Worüber muss ich noch heute lachen, wenn ich daran denke?"),
        long("Welche Kleinigkeit würde ich ohne dieses Buch vielleicht vergessen?"),
        long("Die Geschichte, die ich später noch einmal erzählen möchte:", { rows: 5 }),
      ],
    },
    photo: {
      subtitle: "Eine Geschichte, die bleibt",
      intro:
        "Wähle ein Foto aus diesem Monat, das dich an ein besonderes Erlebnis erinnert. Es muss kein außergewöhnlicher Moment sein. Vielleicht steckt hinter dem Bild eine lustige Begebenheit, eine kleine Überraschung oder eine Erinnerung, die nur für euch beide Bedeutung hat.\n\nErzähle, was auf dem Bild passiert ist und was man nicht erkennen kann, wenn man es nur ansieht.",
      fields: [photo("Unser Foto des Monats"), short(dateLine), long("Was ist auf diesem Bild passiert?"), long("Die Geschichte hinter diesem Moment:"), long("Was möchte ich später noch genau so in Erinnerung haben?")],
    },
  }),
  month({
    n: 10,
    title: "Die kleinen Dinge",
    subtitle: "Was heute selbstverständlich ist, kann morgen kostbar sein",
    intro:
      "Je vertrauter wir miteinander werden, desto leichter übersehe ich manchmal die kleinen Details. Die Art, wie du schläfst, ein bestimmter Blick oder eine Bewegung, die ich sofort wiedererkenne.\n\nVielleicht bemerkst du gar nicht, wie oft ich über solche Kleinigkeiten lächle. Doch genau sie machen unseren Alltag einzigartig und erzählen viel darüber, wer du bist.\n\nMit der Zeit werden manche Dinge so selbstverständlich, dass ich kaum noch bewusst auf sie achte. Umso schöner ist es, sie für einen Moment wieder wahrzunehmen und festzuhalten.",
    impulse:
      "Beobachte dich für einen Moment ganz bewusst. Was machst du, wenn du dich sicher fühlst? Welche kleinen Geräusche gibst du von dir? Welche Geste kenne ich inzwischen so gut, dass ich sofort weiß, was du möchtest?\n\nDu musst daraus keine große Geschichte machen. Manchmal reicht ein einziger Satz, um eine kleine Erinnerung für immer festzuhalten.",
    q: {
      intro:
        "Vielleicht ist es ein bestimmter Blick, ein leises Geräusch oder die Art, wie du dich einkuschelst. Vielleicht ist es die Bewegung deiner Pfoten, wenn du träumst, oder die Art, wie du mich ansiehst, wenn du etwas möchtest.\n\nEs sind oft nicht die großen Erlebnisse, die uns am vertrautesten werden. Es sind die kleinen Dinge, die sich wiederholen, die mich schmunzeln lassen und die irgendwann untrennbar zu dir gehören.",
      fields: [
        long("Welches Detail an dir möchte ich niemals vergessen?"),
        long("Welcher Blick, welches Geräusch oder welche Bewegung ist typisch für dich?"),
        long("Welcher unscheinbare Moment war in diesem Monat besonders wertvoll?"),
        long("Wie sieht ein typischer Kuschel- oder Spielmoment aus?"),
        long("Gibt es einen Ort oder ein Geräusch, das ich immer mit dir verbinden werde?"),
        long("Was machst du, wenn du müde oder besonders neugierig bist?"),
        long("Welche kleine Veränderung ist mir aufgefallen?"),
        long("Ein kleines Detail, das dich ausmacht:"),
      ],
    },
    photo: {
      subtitle: "Kleine Dinge, große Erinnerungen",
      intro:
        "Manche Momente wirken im Alltag ganz gewöhnlich. Doch wenn ich später an dieses Jahr zurückdenke, möchte ich mich auch an genau diese Augenblicke erinnern können.\n\nWähle ein Foto, das eines deiner kleinen, unverwechselbaren Details zeigt. Vielleicht deinen typischen Blick, deine Lieblingsposition beim Schlafen oder einen Moment, in dem du ganz du selbst bist.",
      fields: [photo("Unser Foto des Monats"), short(dateLine), long("Was ist auf diesem Bild zu sehen?"), long("Was macht diesen Moment so typisch für dich?"), long("Was möchte ich später noch genau so in Erinnerung haben?")],
    },
  }),
  month({
    n: 11,
    title: "Fast schon ein Jahr",
    subtitle: "Ein Anfang wird zu einer gemeinsamen Geschichte",
    intro:
      "Bald liegt unser erstes gemeinsames Jahr hinter uns. Vielleicht kann ich mir inzwischen kaum mehr vorstellen, wie mein Alltag ohne dich aussah. Was am Anfang neu und ungewohnt war, ist längst vertraut geworden. Aus den ersten gemeinsamen Tagen ist ein Alltag entstanden, der sich ganz selbstverständlich nach uns anfühlt.\n\nWenn ich heute an unseren Anfang zurückdenke, fallen mir vielleicht Dinge auf, die ich damals noch gar nicht bemerkt habe. Wie sehr du dich verändert hast. Wie viel ich über dich gelernt habe. Und wie viele kleine Erinnerungen inzwischen zu unserer Geschichte gehören.\n\nDieser Monat ist eine Gelegenheit, noch einmal innezuhalten und zurückzublicken - nicht, weil schon alles vorbei ist, sondern weil vor uns noch so viel liegt.",
    impulse:
      "Blättere durch die bisherigen Kapitel. Welche Geschichte hattest du fast vergessen? Welches Foto berührt dich heute besonders? Gibt es etwas, das du gerne noch festhalten möchtest, bevor sich unser erstes gemeinsames Jahr vollendet?\n\nDu darfst frühere Seiten ergänzen und Antworten erweitern. Erinnerungen dürfen mit dir wachsen.",
    q: {
      subtitle: "Wie schnell aus einem kleinen neuen Wesen ein fester Teil des Lebens werden kann.",
      intro:
        "Ein ganzes Jahr liegt beinahe hinter uns. Voller Momente, die nur uns gehören, voller Gewohnheiten, die selbstverständlich geworden sind, und voller Erinnerungen, die ich nicht mehr missen möchte.\n\nWenn ich an unseren Anfang zurückdenke, sehe ich nicht nur, wie du gewachsen bist. Ich sehe auch, wie wir uns miteinander vertraut gemacht haben und wie aus vielen einzelnen Augenblicken unsere gemeinsame Geschichte entstanden ist.",
      fields: [
        long("Was hat sich seit unserem Anfang am stärksten verändert?"),
        list("Welche drei Erinnerungen aus unserem Jahr sind mir besonders wichtig?"),
        long("Worauf freue ich mich, wenn ich an unsere Zukunft denke?"),
        head("Wenn ich an den Anfang zurückdenke ..."),
        long("Welche deiner Eigenschaften ist heute besonders deutlich?"),
        long("Was möchte ich im kommenden Jahr mit dir erleben?"),
      ],
    },
    photo: {
      subtitle: "Damals und heute",
      intro:
        "Manchmal braucht es nur ein einziges altes Foto, um sich daran zu erinnern, wie alles begonnen hat. Ein Blick auf dein damaliges Ich - und plötzlich werden Veränderungen sichtbar, die im Alltag ganz nebenbei passiert sind.\n\nWähle zwei Bilder aus: eines vom Anfang und eines von heute. Halte sie nebeneinander fest und bewahre damit einen kleinen Ausschnitt eurer gemeinsamen Entwicklung.",
      fields: [photo("So warst du damals"), short(dateLine), photo("Du heute"), short(dateLine), long("Das hat sich verändert:"), long("Wenn ich beide Bilder ansehe, denke ich daran, dass ...")],
    },
  }),
  month({
    n: 12,
    title: "Ein Jahr mit dir",
    subtitle: "Ein Jahr ist ein Anfang, kein Abschluss",
    intro:
      "Zwölf gemeinsame Monate. Ein ganzes Jahr voller Leben, Lachen, Überraschungen und kleiner Augenblicke, die unseren Alltag geprägt haben.\n\nWenn ich heute zurückblicke, sehe ich nicht nur, wie sehr du gewachsen bist, sondern denke auch an unsere ersten gemeinsamen Tage, an all die Dinge, die wir voneinander gelernt haben, und an Momente, die vielleicht ganz unscheinbar waren und mir trotzdem für immer in Erinnerung bleiben werden.\n\nNicht jede Erinnerung ist aufgeschrieben. Nicht jeder Tag ist fotografiert. Das muss auch nicht sein. Dieses Buch kann niemals alles festhalten, was unser erstes Jahr ausgemacht hat. Aber es bewahrt einen Teil unserer Geschichte - und erinnert mich daran, wie viel in so kurzer Zeit entstehen kann.",
    impulse:
      "Wenn ich unsere gemeinsame Zeit in drei Bildern erzählen müsste, welche würde ich wählen? Was sollen diese Bilder über unsere Geschichte erzählen?\nUnd wenn ich nur einen einzigen Satz für dieses Jahr behalten könnte: Welcher wäre es?",
    q: {
      subtitle: "Zwölf Monate voller Leben, Lachen, Überraschungen und kleiner Augenblicke.",
      intro:
        "Vielleicht ist nicht jeder Tag in Erinnerung geblieben. Vielleicht gab es ruhige Zeiten, aufregende Abenteuer und Momente, die ganz anders verliefen als erwartet. Doch aus all diesen Tagen ist etwas entstanden, das nur uns gehört.\n\nWenn ich an unser erstes Jahr denke, muss ich nicht jede einzelne Erinnerung aufzählen können. Es reicht, zu wissen, dass du heute ein fester Teil meines Lebens bist und unsere Geschichte gerade erst begonnen hat.",
      fields: [
        long("Was war mein schönster Moment in unserem ersten gemeinsamen Jahr?", { rows: 4 }),
        long("Was bedeutest du heute für mich?", { rows: 4 }),
        long("Was möchte ich dir für die Zukunft mitgeben?", { rows: 5 }),
      ],
    },
    photo: {
      subtitle: "Unser Jahr in Bildern",
      intro:
        "Manchmal erzählen Bilder mehr, als Worte es könnten. Drei kleine Ausschnitte aus unserem ersten gemeinsamen Jahr - jeder auf seine Weise besonders und zusammen ein Stück unserer Geschichte.\n\nWähle ein Bild vom Anfang, einen deiner liebsten Momente und ein aktuelles Foto. Es müssen keine perfekten Bilder sein. Entscheidend ist, was du mit ihnen verbindest und welche Erinnerung du darin bewahren möchtest.",
      fields: [photo("Ein Bild von damals"), photo("Ein Lieblingsmoment"), photo("Ein aktuelles Bild"), long("Ein Satz, der unser erstes Jahr perfekt beschreibt:", { rows: 3 })],
    },
  }),
];

// ---- Alle Einheiten in Buchreihenfolge ----
const rawUnits: RawUnit[] = [
  {
    id: "intro",
    group: "Vorwort",
    title: "Willkommen",
    subtitle: "Dieses Buch gehört dir und mir.",
    pages: [
      {
        title: "Willkommen",
        subtitle: "Dieses Buch gehört dir und mir.",
        intro:
          "Manche Geschichten beginnen mit einem Plan. Andere mit einem Zufall. Und manchmal reicht ein einziger Blick, um zu wissen, dass etwas ganz Besonderes beginnt.\n\nDieses Buch erzählt unsere Geschichte. Von den ersten Gedanken an dich über die kleinen Abenteuer unseres Alltags bis zu all den Momenten, zu denen ich irgendwann zurückblättern und die ich noch einmal erleben möchte.\n\nHier ist Platz für Fotos, kleine Geschichten, lustige Eigenheiten und all die Dinge, die vielleicht niemand sonst bemerken würde - die für mich aber alles bedeuten.\n\nDu musst nicht jeden Moment festhalten und nicht jede Seite ausfüllen. Es gibt keine richtige oder falsche Art, dieses Buch zu gestalten.\n\nBewahre einfach das, was dir wichtig ist.\n\nDenn am Ende sind es nicht die perfekten Erinnerungen, die zählen. Es sind eure.",
        fields: [short("Dein Name:"), short("Dein Spitzname:"), short("Dieses Buch begonnen am:")],
      },
      {
        title: "So wird dein Buch zu eurer Geschichte",
        intro:
          "Die schönsten Erinnerungen entstehen oft ganz nebenbei. Manchmal sind es die großen Momente, manchmal nur ein vertrauter Blick, ein neues Geräusch oder eine kleine Angewohnheit, die uns zum Lächeln bringt.\n\nDu musst dieses Buch nicht chronologisch oder vollständig ausfüllen. Nutze die Fragen als Anregung und halte fest, woran du dich später erinnern möchtest.\n\nEin paar Ideen für deine Einträge:\n• Schreib so, wie du erzählst. Auch kurze Sätze, lustige Beobachtungen und kleine Anekdoten machen deine Erinnerungen persönlich.\n• Ergänze Fotos und Daten. Ein Bild, ein ungefähres Datum oder ein Satz dazu kann dir später helfen, dich an die Situation zu erinnern.\n• Lass Platz für das echte Leben. Manche Fragen passen zu euch, andere vielleicht nicht. Überspringe sie, ergänze eigene Gedanken oder nutze freie Flächen.\n• Halte auch Alltägliches fest. Wo hast du am liebsten geschlafen? Welche Angewohnheit hast du erst nach einigen Wochen bemerkt? Was hat dich zum Lachen gebracht?\n\nDu kannst die Seiten direkt ausfüllen oder später zurückkommen. Es gibt keinen Zeitplan und keine Pflicht, jede Zeile zu nutzen.\n\nDieses Buch ist für eure Erinnerungen da - nicht umgekehrt.",
        fields: [],
      },
    ],
  },
  {
    id: "k1",
    group: "01 · Bevor wir uns fanden",
    no: "Kapitel 01",
    title: "Bevor wir uns fanden",
    subtitle: "Noch gehörten wir nicht zum Alltag des anderen.",
    intro:
      "Manchmal wartet man aufeinander, ohne es zu wissen. Und manchmal begegnet man sich ganz unerwartet.\n\nBevor du bei mir eingezogen bist, gab es eine Zeit, in der ich dich noch nicht kannte. Vielleicht habe ich nach einer Katze gesucht, vielleicht war die Entscheidung schon lange gereift. Oder ich bin eher zufällig auf dich gestoßen und konnte danach nicht mehr aufhören, an dich zu denken.\n\nIrgendetwas hat mich zu dir geführt. Vielleicht war es dein Blick auf einem Foto, deine neugierige Art oder einfach das Gefühl, dass ich dich kennenlernen musste.\n\nHier beginnt die Geschichte, die deinem Einzug vorausging.",
    pages: [
      {
        fields: [
          long("Wie bist du in mein Leben gekommen?"),
          long("Was hat mich an dir als Erstes fasziniert?"),
          long("War es ein Foto, dein Aussehen, eine Beschreibung deiner Persönlichkeit oder etwas, das ich erst später verstanden habe?"),
        ],
      },
      {
        title: "Bevor wir uns fanden",
        subtitle: "Wie sah mein Alltag aus, bevor du Teil davon wurdest?",
        fields: [
          long("Was war damals typisch für mein Leben? Was sollte sich verändern, und worauf habe ich mich gefreut?"),
          long("Der Moment, in dem ich wusste: Du sollst es sein:"),
          short("Datum:"),
          long("Daran erinnere ich mich besonders:"),
          long("Damals wusste ich noch nicht, dass ..."),
          photo("Ein Foto aus der Zeit vor deinem Einzug oder das erste Bild von dir."),
        ],
      },
    ],
  },
  {
    id: "k2",
    group: "02 · Endlich bist du da",
    no: "Kapitel 02",
    title: "Endlich bist du da",
    subtitle: "Und dann kam der Tag, auf den wir gewartet haben.",
    intro:
      "Aus Vorfreude wurde Wirklichkeit. Plötzlich warst du da - und aus der Vorstellung, wie es mit dir sein würde, wurden die ersten gemeinsamen Erlebnisse.\n\nVielleicht verlief alles so, wie wir es uns ausgemalt haben. Vielleicht kam es ganz anders. Die Heimfahrt, dein erster Blick durch die neue Umgebung, der erste Lieblingsplatz oder die erste Nacht: Oft sind es gerade diese kleinen Details, die den Anfang unvergesslich machen.\n\nAn welche Momente möchtest du dich später erinnern?\n• Unser erster Blick und die erste Berührung\n• Die Heimfahrt und deine ersten Schritte im neuen Zuhause\n• Der Ort, den du als Erstes erkundet hast\n• Dein erster Lieblingsplatz\n• Unsere erste gemeinsame Nacht\n• Der Moment, in dem sich alles ein bisschen vertrauter anfühlte\n\nDu musst nicht alles sofort aufschreiben. Manches bleibt direkt im Gedächtnis, anderes fällt dir vielleicht erst beim Betrachten alter Fotos wieder ein.",
    pages: [
      {
        title: "Von der Vorfreude zur gemeinsamen Geschichte",
        subtitle: "Und plötzlich warst du ein Teil meines Lebens.",
        intro:
          "Aus der Vorfreude wurde Wirklichkeit. Du warst da - mit deiner ganz eigenen Art, deiner Neugier und einer neuen kleinen Welt, die es gemeinsam zu entdecken gab.\n\nVielleicht warst du anfangs vorsichtig. Vielleicht hast du sofort neugierig deine Umgebung erkundet. Vielleicht war auch alles ein bisschen anders, als ich es mir vorgestellt hatte.\n\nMit dir kamen neue Geräusche, erste Berührungen und ungewohnte Situationen. Und während du dein neues Zuhause kennenlerntest, begann auch für mich ein ganz neuer Alltag - mit dir an meiner Seite.",
        fields: [
          head("Dein Steckbrief"),
          short("Dein Name:"),
          short("Dein Spitzname:"),
          short("Geboren am (oder geschätztes Geburtsdatum):"),
          short("Bei mir eingezogen am:"),
          short("Wie alt warst du bei deinem Einzug?"),
          short("Deine Rasse oder besondere Merkmale:"),
          short("Deine Fellfarbe:"),
        ],
      },
      {
        title: "Endlich bist du da",
        intro:
          "Jede Begegnung hat ihre eigene Geschichte. Vielleicht hast du mich sofort um deine Pfote gewickelt. Vielleicht warst du erst einmal zurückhaltend. Oder ich wusste schon beim ersten Foto, dass ich dich unbedingt kennenlernen wollte.\n\nHeute erinnere ich mich an den Anfang unserer gemeinsamen Geschichte.",
        fields: [
          long("Wo hast du gelebt, bevor du bei mir eingezogen bist?"),
          long("Wie haben wir uns zum ersten Mal kennengelernt?"),
          long("Was ist mir bei unserer ersten Begegnung besonders aufgefallen?"),
          long("Was ging mir durch den Kopf, als ich wusste, dass du bei mir einziehst?"),
          head("Willkommen zu Hause"),
          long("Wie verlief deine Heimfahrt?"),
          long("Was hast du als Erstes erkundet?"),
          long("Wo hast du dich zum ersten Mal wohlgefühlt?"),
          long("Welcher Ort war dein erster Lieblingsplatz?"),
        ],
      },
      {
        title: "Deine neue Welt",
        intro:
          "Die ersten Stunden und Nächte erzählen oft ihre ganz eigene Geschichte. Vielleicht hast du neugierig alles erkundet, vielleicht erst einmal einen sicheren Platz gesucht. Nach und nach wurde aus dem neuen Ort ein Zuhause - mit vertrauten Menschen, kleinen Routinen und vielleicht auch tierischen Mitbewohnern.",
        fields: [
          long("Wie waren unsere ersten gemeinsamen Stunden?"),
          head("Unsere erste Nacht"),
          long("Wo hast du geschlafen?"),
          long("Welche Geräusche oder kleinen Momente sind mir in Erinnerung geblieben?"),
          long("Wie habe ich mich in dieser ersten Nacht gefühlt?"),
          head("Dein Zuhause & deine Mitbewohner"),
          long("Wie wohnst du? (Alleine mit deinen Menschen? Mit anderen Katzen? Mit Hunden? Mit anderen Tieren?)"),
          long("Wer gehört zu deiner Familie? Name (und Tierart) deiner Mitbewohner:"),
          long("Wie habt ihr aufeinander reagiert?"),
        ],
      },
      {
        title: "Ein Bild vom Anfang",
        intro:
          "Manchmal erzählt ein einziges Foto mehr, als wir in Worte fassen können. Vielleicht zeigt es dich in deinem neuen Zuhause, eingekuschelt an deinem ersten Lieblingsplatz oder mitten in deiner ersten Erkundungstour.",
        fields: [
          photo("Hier ist Platz für ein Foto aus deinen ersten Tagen:"),
          short("Datum oder Zeitraum:"),
          long("Diesen Moment möchte ich festhalten, weil ..."),
          long("Was ich auf diesem Foto besonders liebe:"),
          long("Wenn ich an deine ersten Tage zurückdenke, erinnere ich mich an ..."),
        ],
      },
      {
        title: "Unser Zuhause wird zu deinem Zuhause",
        subtitle: "Ein neuer Ort. So viele neue Eindrücke. Und mit der Zeit ein Platz für dich.",
        intro:
          "Als du bei mir eingezogen bist, war vieles noch fremd. Neue Gerüche, unbekannte Geräusche, andere Räume und Menschen, die erst zu vertrauten Begleitern werden mussten.\nVielleicht hast du mutig jeden Winkel erkundet. Vielleicht hast du dich lieber erst einmal versteckt und alles aus sicherer Entfernung beobachtet. Jede Katze hat ihr eigenes Tempo, wenn sie sich an eine neue Umgebung gewöhnt.\nMit jedem Tag gab es etwas Neues zu entdecken. Ein Platz, an dem du gerne geschlafen hast. Ein Geräusch, das dich neugierig gemacht hat. Oder eine kleine Routine, durch die unser Zuhause nach und nach auch zu deinem Zuhause wurde.",
        fields: [
          long("Wo hast du dich am Anfang am liebsten aufgehalten?"),
          long("Gab es einen Ort, an dem du dich besonders sicher gefühlt hast?"),
          long("Was hast du neugierig erkundet – und was war dir anfangs noch nicht geheuer?"),
          long("Welche kleine Gewohnheit hat sich in den ersten Tagen entwickelt?"),
          long("Was hat uns geholfen, uns miteinander einzuleben?"),
        ],
      },
      {
        title: "Unser Zuhause wird zu deinem Zuhause",
        subtitle: "Ein Blick zurück",
        intro:
          "Vielleicht gibt es ein Foto von deinem ersten Nickerchen, deiner vorsichtigen Erkundungstour oder dem ungewöhnlichen Platz, den du dir zum Schlafen ausgesucht hast.",
        fields: [
          long("Ein Moment aus deiner Eingewöhnungszeit, den ich festhalten möchte:"),
          photo("Das Foto dazu oder ein kleiner Schnappschuss aus deinen ersten Tagen"),
        ],
      },
    ],
  },
  {
    id: "k3",
    group: "03 · Unser erstes Jahr – Monat für Monat",
    no: "Kapitel 03",
    title: "Unser erstes Jahr – Monat für Monat",
    subtitle: "Ein Jahr mit dir. Zwölf Kapitel. Und keine Geschichte wie die andere.",
    intro:
      "Das erste gemeinsame Jahr lässt sich nicht in feste Schritte einteilen. Vielleicht verändert sich in den ersten Wochen besonders viel. Vielleicht braucht ihr Zeit, um euch aneinander zu gewöhnen. So wird dein Buch zu eurer Geschichte.\n\nManche Veränderungen bemerkst du sofort. Andere erkennst du erst später - wenn du ein Foto vom Anfang mit einem aktuellen Bild vergleichst oder dich an etwas erinnerst, das längst selbstverständlich geworden ist.\n\nDeshalb beginnt Monat 01 mit deinem Einzug. Ganz gleich, wie alt du zu diesem Zeitpunkt bist. Dieses Buch begleitet eure gemeinsame Zeit, nicht ausschließlich das erste Lebensjahr deiner Katze.\n\nSo begleiten dich die Monatskapitel:\nJeder Monat lädt dich dazu ein, besondere Erlebnisse, kleine Eigenheiten und alltägliche Momente festzuhalten. Du findest Fragen, zusätzliche Erinnerungsimpulse und Platz für Fotos oder persönliche Notizen.\n\nDu musst nicht jede Frage beantworten und keinen Monat lückenlos dokumentieren. Nimm dir heraus, was zu euch passt. Vielleicht ist ein Monat voller neuer Abenteuer, vielleicht besteht er vor allem aus vertrauten Momenten. Beides gehört zu eurer Geschichte.\n\nEin kleiner Tipp: Notiere zu Beginn jedes Monats das Datum oder den Zeitraum. So kannst du später besser nachvollziehen, wann eure Erinnerungen entstanden sind.",
    pages: [{ fields: [short("Unser erster gemeinsamer Monat begann am:")] }],
  },
  ...months,
  {
    id: "k4",
    group: "04 · Das macht dich aus",
    no: "Kapitel 04",
    title: "Das macht dich aus",
    subtitle: "Es gibt Dinge, die gehören einfach zu dir.",
    intro:
      "Die Art, wie du schläfst. Die Geräusche, die du machst. Dein Lieblingsplatz, deine kleinen Rituale und die Angewohnheiten, über die ich immer wieder lachen muss.\n\nManche dieser Dinge haben wir bereits in unseren Monatsgeschichten festgehalten. Hier sammeln wir all das, was dich unabhängig von einem bestimmten Zeitpunkt ausmacht.\n\nDenn auch wenn du dich veränderst, bleiben manche Dinge unverwechselbar du.",
    pages: [
      {
        fields: [
          head("Dein Charakter"),
          long("Wie würde ich deine Persönlichkeit beschreiben?"),
          long("Bist du eher neugierig, vorsichtig, verspielt, verschmust oder etwas ganz anderes?"),
          list("Welche drei Worte passen am besten zu dir?"),
          long("Was macht deinen Charakter besonders? (Was ist typisch für dich - und was würde mir sofort einfallen, wenn ich dich beschreiben sollte?)", { rows: 4 }),
        ],
      },
      {
        intro:
          "Manche Dinge machen deinen Alltag besonders. Bestimmte Plätze, vertraute Spielsachen oder kleine Momente, die du immer wieder suchst. Sie gehören zu deinem ganz eigenen kleinen Universum.",
        fields: [
          head("Deine Lieblingsdinge"),
          short("Dein Lieblingsspielzeug:"),
          short("Dein Lieblingsplatz zum Schlafen:"),
          short("Dein Lieblingsplatz zum Beobachten:"),
          short("Dein liebstes Spiel:"),
          short("Deine besonderen Vorlieben:"),
          long("Gibt es etwas, das dich immer glücklich macht oder sofort neugierig werden lässt?"),
          photo("Deine Lieblingsplätze oder Lieblingsdinge"),
        ],
      },
      {
        intro:
          "Manchmal sind es gerade die kleinen Eigenheiten, die uns besonders ans Herz wachsen. Die Dinge, die du immer wieder auf deine ganz eigene Art machst - und die mich zum Lachen bringen, selbst wenn ich sie schon hundertmal erlebt habe.",
        fields: [
          head("Was machst du auf deine ganz eigene Art?"),
          long("Welche Situation bringt mich jedes Mal zum Lachen?"),
          long("Gibt es einen Blick, ein Geräusch oder eine Bewegung, die ich sofort erkenne?"),
          long("Was ist deine wohl lustigste oder ungewöhnlichste Angewohnheit?"),
          head("Unsere kleinen Rituale"),
          note("Manche Momente gehören einfach uns. Vielleicht sind es feste Abläufe, gemeinsame Spiele oder die Art, wie du meine Nähe suchst."),
          long("Was machen wir regelmäßig gemeinsam?"),
          long("Woran merke ich, dass du meine Nähe suchst?"),
          long("Was verstehen vermutlich nur du und ich?"),
        ],
      },
      {
        title: "Das bist einfach du",
        intro:
          "Es sind nicht nur die großen Momente, die dich besonders machen. Es sind all die kleinen Dinge, die zusammen dich ergeben.\n\nHier darf ein Bild von dir stehen, das dich genauso zeigt, wie du bist: in deinem Lieblingsmoment, mit deinem unverwechselbaren Blick oder einfach mitten aus deinem Alltag.",
        fields: [long("Was dich für mich unverwechselbar macht:", { rows: 3 }), photo("Ein Platz für dein Lieblingsfoto – und für alles, was sich nicht in Worte fassen lässt.")],
      },
    ],
  },
  {
    id: "k5",
    group: "05 · Ein Jahr voller Wir",
    no: "Kapitel 05",
    title: "Ein Jahr voller Wir",
    subtitle: "Ein Jahr sind nur zwölf Monate. Aber eigentlich besteht es aus unzähligen kleinen Momenten, die zusammen unsere Geschichte ergeben.",
    intro:
      "Es sind die ersten Male und die vertrauten Wiederholungen. Die aufregenden Tage und die stillen Augenblicke. Die lustigen Missgeschicke, die kleinen Fortschritte und die Momente, in denen ich einfach nur froh bin, dass es dich gibt.\n\nManches ist mir sofort im Gedächtnis geblieben. Anderes entdecke ich vielleicht erst wieder, wenn ich durch die Fotos blättere oder eine alte Seite lese.\n\nJetzt ist es Zeit, zurückzuschauen. Nicht, um alles festzuhalten, was passiert ist, sondern um wiederzufinden, was unser erstes Jahr besonders gemacht hat.",
    pages: [
      {
        title: "Mein persönlicher Jahresrückblick",
        intro:
          "Wenn ich auf unser erstes gemeinsames Jahr zurückblicke, fallen mir bestimmt viele Erlebnisse ein. Manche waren groß und aufregend, andere wären für Außenstehende vielleicht ganz gewöhnlich gewesen. Doch sie alle gehören zu unserer Geschichte.",
        fields: [
          long("Was war mein schönster Moment mit dir?"),
          long("Was hat mich am meisten überrascht?"),
          long("Was habe ich durch dich über mich selbst gelernt?"),
          long("Was hat sich in meinem Alltag verändert, seit du da bist?"),
          long("Welchen Moment würde ich gerne noch einmal erleben?"),
        ],
      },
      {
        title: "Kleine Dinge, große Geschichten",
        intro: "Manche Erinnerungen sind winzig. Und trotzdem bleiben sie für immer.",
        fields: [
          head("Das erste kaputte Ding"),
          long("Was musste durch deine Neugier, deine Krallen oder deine kleinen Abenteuer daran glauben?"),
          long("Wann ist es passiert?"),
          head("Dein erster verlorener Milchzahn"),
          long("Wann haben wir deinen ersten kleinen Zahn entdeckt?"),
          long("Haben wir ihn gefunden oder ist er spurlos verschwunden?"),
          head("Deine ersten kleinen Streiche"),
          long("Was hast du angestellt, womit wir nicht gerechnet haben?"),
          long("Was war bisher dein lustigster oder frechster Moment?"),
        ],
      },
      {
        title: "Unsere wichtigsten Meilensteine",
        intro:
          "Nicht alles passiert nach einem bestimmten Zeitplan. Manche Momente lassen sich planen, andere kommen völlig unerwartet. Und manchmal merke ich erst später, wie wichtig ein bestimmter Augenblick für uns war.\nHier ist Platz für die Ereignisse, die für uns Bedeutung haben - ganz gleich, wann sie stattgefunden haben.",
        fields: [table(["Datum", "Unser besonderer Moment"], 12)],
      },
      {
        title: "Ein Foto, das alles sagt",
        intro:
          "Manchmal gibt es ein Foto, das mehr erzählt als viele Worte. Vielleicht zeigt es einen besonderen Augenblick, vielleicht einen ganz gewöhnlichen Tag. Doch sobald ich es sehe, weiß ich wieder, warum ich genau diesen Moment festhalten wollte.",
        fields: [photo("Unser Foto"), long("Warum ich dieses Bild ausgewählt habe:")],
      },
    ],
  },
  {
    id: "k6",
    group: "06 · Ein besonderer Tag",
    no: "Kapitel 06",
    title: "Ein besonderer Tag",
    subtitle: "Dein erster Geburtstag",
    intro:
      "Ein Jahr ist vergangen, seit unsere gemeinsame Geschichte begonnen hat. Aus den ersten vorsichtigen Begegnungen sind vertraute Gewohnheiten geworden. Du bist gewachsen, hast neue Lieblingsplätze entdeckt und deinen ganz eigenen Platz in meinem Alltag gefunden.\n\nVielleicht bist du heute kaum wiederzuerkennen, wenn ich an die ersten Bilder zurückdenke. Vielleicht gibt es aber auch Dinge, die noch genauso sind wie damals: dein Blick, deine kleinen Eigenheiten oder die Art, wie du meine Nähe suchst.\n\nGanz gleich, was sich verändert hat - heute geht es um dich und um all die Erinnerungen, die wir bereits miteinander teilen.\n\nDieser Tag muss nicht groß oder außergewöhnlich sein. Er darf einfach so sein, wie er zu dir passt. Denn das Schönste daran ist, dass wir ihn gemeinsam erleben.",
    pages: [
      {
        title: "Dein erster Geburtstag",
        intro:
          "Ein besonderer Tag verdient einen Platz in unserem Erinnerungsbuch. Hier halte ich fest, wie du heute bist, wie wir deinen Geburtstag verbracht haben und an welchen Moment ich mich besonders gerne erinnern möchte.",
        fields: [
          short("Heute bist du schon so alt:"),
          short("Geburtstagsdatum:"),
          short("Dein Lieblingsspielzeug gerade:"),
          short("Dein Lieblingsplatz gerade:"),
          long("So haben wir gefeiert"),
          long("Mein schönster Moment an deinem Geburtstag"),
          photo("Ein Bild von dir an deinem besonderen Tag"),
          long("Ein Wunsch für dein nächstes Lebensjahr:"),
        ],
      },
    ],
  },
  {
    id: "k7",
    group: "07 · Ein Brief an dich",
    no: "Kapitel 07",
    title: "Ein Brief an dich",
    subtitle: "Für später, wenn ich zurückblättere",
    intro:
      "Vielleicht wirst du dieses Buch nie lesen. Vielleicht werde ich es irgendwann wieder aufschlagen und mich daran erinnern, wie unser gemeinsames Leben in diesem ersten Jahr ausgesehen hat.\n\nAn deinen Blick, deine Eigenheiten und unsere kleinen Routinen. An die Dinge, die du jeden Tag getan hast und die mir heute so vertraut sind, dass ich kaum darüber nachdenke. An die Momente, die ich festhalten wollte, weil ich schon damals wusste, dass sie eines Tages Erinnerungen sein würden.\n\nVielleicht werde ich beim Lesen lächeln, weil ich mich an etwas erinnere, das längst selbstverständlich geworden ist. Vielleicht werde ich überrascht sein, wie klein du einmal warst oder wie viel sich seitdem verändert hat.\n\nDieser Brief ist für einen späteren Moment. Für den Tag, an dem ich zurückblättere und mich frage, wie alles angefangen hat. Ich möchte mich daran erinnern, wie du heute bist, was ich an dir liebe und was unser erstes gemeinsames Jahr für mich bedeutet hat.",
    pages: [
      {
        intro: "Wenn ich dir heute etwas sagen könnte, das du für immer wissen sollst, dann wäre es ...",
        fields: [
          long("Was ich an dir besonders liebe:"),
          long("Was ich nie vergessen möchte:"),
          long("Was du in meinem Leben verändert hast:"),
          long("Was ich mir für unsere Zukunft wünsche:"),
          long("Und falls ich irgendwann vergesse, wie sich dieses erste Jahr angefühlt hat, möchte ich mich an eines erinnern:"),
          long("Das soll mir immer von unserem Anfang bleiben:"),
        ],
      },
    ],
  },
  {
    id: "k8",
    group: "08 · Danke, dass es dich gibt",
    no: "Kapitel 08",
    title: "Danke, dass es dich gibt",
    subtitle: "Ein Jahr voller kleiner Pfotenabdrücke im Herzen.",
    intro:
      "Ein Jahr voller gemeinsamer Momente, neuer Gewohnheiten und Erinnerungen, die nur uns gehören.\n\nAls dieses Jahr begann, wusste ich noch nicht, welche Geschichten wir miteinander erleben würden. Welche kleinen Eigenheiten ich an dir entdecken, welche Routinen sich entwickeln und welche scheinbar gewöhnlichen Tage mir später besonders viel bedeuten würden.\n\nDieses Buch hält einen Teil unseres Anfangs fest. Nicht jeden Tag, nicht jede Begegnung und nicht jeden Augenblick - aber genug, um mich daran zu erinnern, wie viel in einem einzigen Jahr entstehen kann.\n\nWenn ich heute zurückblicke, sehe ich nicht nur, wie sehr du gewachsen bist. Ich sehe auch all die kleinen Momente, aus denen unser gemeinsames Leben besteht. Dinge, die vielleicht niemand sonst bemerken würde und die gerade deshalb so sehr zu uns gehören.\n\nUnd während dieses erste Kapitel unserer Geschichte nun seinen Platz in diesem Buch gefunden hat, wartet noch so viel auf uns. Neue Abenteuer, vertraute Tage und Erinnerungen, von denen ich heute noch gar nicht weiß, dass ich sie eines Tages bewahren möchte.\n\nDanke, dass du Teil meines Lebens bist.\n\nAuf alles, was noch kommt. Und auf all die kleinen Momente, die unsere Geschichte weiterhin zu unserer ganz eigenen machen.",
    pages: [
      {
        title: "Unsere Geschichte – bis hierher",
        fields: [short("Dein Name:"), short("Unser erster gemeinsamer Tag:"), short("Unser erstes Jahr festgehalten am:"), photo("Ein Foto, das unser erstes Jahr für mich zusammenfasst")],
      },
    ],
  },
  {
    id: "k9",
    group: "09 · Für alles, was seinen eigenen Platz verdient",
    no: "Kapitel 09",
    title: "Für alles, was seinen eigenen Platz verdient",
    intro:
      "Nicht jede Erinnerung lässt sich einem bestimmten Monat zuordnen. Manche Erlebnisse passieren ganz nebenbei, andere fallen dir erst viel später wieder ein. Vielleicht gibt es ein Foto, das du unbedingt aufbewahren möchtest, eine lustige Begebenheit oder einen kleinen Moment, der dir bis heute ein Lächeln ins Gesicht zaubert.\n\nDiese Seite ist für alles, was in kein anderes Kapitel passen muss. Für Erinnerungen, die ihren eigenen Platz verdienen - ganz unabhängig davon, wann sie passiert sind.",
    pages: [{ fields: [long("Was ist passiert?"), long("Wann war das ungefähr?"), long("Warum möchte ich mich daran erinnern?"), photo("Ein Foto oder eine kleine Erinnerung")] }],
  },
  {
    id: "k10",
    group: "10 · Vom Anfang bis heute",
    no: "Kapitel 10",
    title: "Vom Anfang bis heute",
    intro:
      "Manchmal fällt erst beim Vergleichen von Bildern auf, wie viel Zeit vergangen ist. Fotos zeigen nicht nur, wie deine Katze ausgesehen hat. Sie bewahren auch vertraute Plätze, besondere Stimmungen und kleine Details, die im Alltag leicht in Vergessenheit geraten.\n\nWähle drei Bilder aus eurem ersten gemeinsamen Jahr: eines vom Anfang, eines aus der Zeit dazwischen und eines von heute. Es müssen keine perfekten Porträts sein. Gerade die spontanen Aufnahmen erzählen oft die schönsten Geschichten.",
    pages: [
      {
        fields: [
          photo("Ein Bild vom Anfang", "Wie alles begann."),
          photo("Ein Bild aus unserer Mitte", "Ein Moment aus der Zeit, in der ihr euch immer besser kennengelernt habt."),
          photo("Ein Bild von heute", "So sieht euer gemeinsames Leben inzwischen aus."),
          long("Wenn ich diese Bilder betrachte, denke ich daran, dass ...", { sub: "Was fällt dir beim Vergleich auf? Welche Veränderungen siehst du? Und welche Dinge sind vielleicht genau gleich geblieben?" }),
        ],
      },
    ],
  },
  {
    id: "k11",
    group: "11 · Dieses Buch darf weiterwachsen",
    no: "Kapitel 11",
    title: "Dieses Buch darf weiterwachsen",
    intro:
      "Mit diesen Seiten endet die Geschichte eures ersten gemeinsamen Jahres - aber nicht eure gemeinsame Zeit.\n\nVielleicht schlägst du dieses Buch in einigen Monaten wieder auf. Vielleicht findest du ein Foto, das unbedingt noch hineingehört, erinnerst dich an eine kleine Begebenheit oder möchtest einen Gedanken festhalten, der dir erst mit etwas Abstand in den Sinn kommt.\n\nDu kannst dieses Buch so lassen, wie es ist. Oder du lässt es mit euch weiterwachsen und ergänzt nach und nach das, was dir wichtig erscheint. Es gibt kein Richtig oder Falsch und kein vollständiges Bild davon, wie eure Geschichte aussehen muss.\nDenn nicht alles muss aufgeschrieben oder fotografiert werden. Manche Erinnerungen bleiben einfach bei dir. Andere verdienen einen eigenen Platz auf diesen Seiten.",
    pages: [{ fields: [long("Eine Erinnerung, die ich noch ergänzen möchte:"), long("Ein Gedanke, den ich aus diesem Jahr mitnehme:", { rows: 5 })] }],
  },
  {
    id: "k12",
    group: "12 · Kleine Veränderungen festhalten",
    no: "Kapitel 12",
    title: "Kleine Veränderungen festhalten",
    subtitle: "Gewicht und Beobachtungen im Überblick",
    intro:
      "Katzen entwickeln sich individuell. Alter, Herkunft, Gesundheit, Ernährung und viele weitere Faktoren können beeinflussen, wie sie sich körperlich und im Verhalten verändern.\n\nDieses Buch soll keine Entwicklungsschritte vorgeben, die zu einem bestimmten Zeitpunkt erreicht werden müssen. Es soll dir vielmehr ermöglichen, Beobachtungen und wichtige Informationen übersichtlich zu sammeln.\n\nWie schön, wenn man später nachvollziehen kann, wie sich die eigene Katze entwickelt hat. Mit regelmäßigen Einträgen lassen sich Gewicht, körperliche Veränderungen und besondere Beobachtungen übersichtlich sammeln.\n\nDu musst nicht alles dokumentieren. Halte einfach die Informationen fest, die für euch wichtig sind. Ergänze immer das Datum, damit du deine Einträge später richtig einordnen kannst.",
    pages: [{ fields: [table(["Datum", "Alter meiner Katze", "Gewicht", "Meine Notizen"], 6)] }],
  },
  {
    id: "k13",
    group: "13 · Wichtige Informationen an einem Ort",
    no: "Kapitel 13",
    title: "Wichtige Informationen an einem Ort",
    subtitle: "Gesundheit und Vorsorge im Überblick",
    intro:
      "Auch gesundheitliche Informationen gehören zur Geschichte eures gemeinsamen Jahres. Mit einer übersichtlichen Dokumentation kannst du später nachvollziehen, wann du mit deiner Katze in der Tierarztpraxis warst, welche Informationen du erhalten hast und ob weitere Termine vereinbart wurden.\n\nBewahre wichtige Unterlagen wie den Impfpass, Befunde und Behandlungsinformationen zusätzlich sicher auf. Diese Seiten helfen dir, die wichtigsten Angaben gesammelt griffbereit zu haben.",
    pages: [
      { fields: [table(["Datum", "Anlass d. Besuchs", "Befunde/Infos", "Behandlung/Medikamente", "Kontrolle/nä. Termin"], 10)] },
      {
        title: "Impfungen und Vorsorge",
        fields: [
          table(["Datum", "Impfung/Vorsorge", "Notizen", "Nächster Termin"], 10),
          short("Tierarztpraxis:"),
          short("Telefonnummer:"),
          short("Notfallpraxis:"),
          short("Telefonnummer der Notfallpraxis:"),
          long("Besondere Hinweise zur Gesundheit meiner Katze:"),
          note("Diese Seiten dienen der persönlichen Dokumentation und ersetzen keine tierärztliche Untersuchung oder Beratung. Halte dich bei Impfungen, Vorsorge und Behandlungen an die Empfehlungen deiner Tierärztin oder deines Tierarztes."),
        ],
      },
    ],
  },
];

export const bookUnits: Unit[] = rawUnits.map(finalize);

// ---- Schlüssel für gespeicherte Antworten und Fotos ----
// text: `${katze}|${einheit}|${seite}.${feld}` ; list: …`.${nr}`; table: JSON-Text mit Zeilen
export const answerKey = (catId: string, unitId: string, pageId: string, fieldId: string, sub?: number) =>
  `${catId}|${unitId}|${pageId}.${fieldId}${sub ? `.${sub}` : ""}`;

export const unitPrefix = (catId: string, unitId: string) => `${catId}|${unitId}|`;

export type TableRows = string[][];
export const parseRows = (raw: string | undefined, columns: number, rows: number): TableRows => {
  let data: unknown = [];
  try {
    data = raw ? JSON.parse(raw) : [];
  } catch {
    data = [];
  }
  const out = Array.isArray(data) ? (data as unknown[]).map((r) => (Array.isArray(r) ? r.map(String) : [])) : [];
  while (out.length < rows) out.push([]);
  return out.map((r) => Array.from({ length: columns }, (_, i) => r[i] ?? ""));
};
