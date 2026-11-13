// Textvorlagen für Impressum und Datenschutz. Keine Rechtsberatung.
// Alles in [eckigen Klammern] muss vor dem Livegang ausgefüllt bzw. geprüft werden.
import type { Locale } from "@/app/[lang]/dictionaries";

export type LegalPage = {
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const NAME = "Theresa Knöll";
const ADDRESS = "c/o Neubauerstraße 77\n4050 Traun\nÖsterreich";
const EMAIL = "hello@ohpawstudio.com";

export const imprint: Record<Locale, LegalPage> = {
  de: {
    title: "Impressum",
    sections: [
      {
        heading: "Angaben gemäß § 5 ECG",
        paragraphs: [`Oh Paw Studio\nInhaberin: ${NAME}\n${ADDRESS}`],
      },
      { heading: "Kontakt", paragraphs: [`E-Mail: ${EMAIL}`] },
      {
        heading: "Unternehmensgegenstand",
        paragraphs: [
          "Verkauf digitaler Produkte (Planer, Vorlagen und Erinnerungsbücher rund um das Leben mit Katzen). [Bitte mit der Gewerbeberechtigung abgleichen]",
        ],
      },
      {
        heading: "Gewerbe und Aufsicht",
        paragraphs: [
          "Gewerbebehörde: [zuständige Bezirkshauptmannschaft bzw. Magistrat eintragen]\nMitglied der Wirtschaftskammer Österreich: [bitte prüfen und ggf. Landeskammer eintragen]\nAnwendbare Rechtsvorschriften: Gewerbeordnung (www.ris.bka.gv.at)",
        ],
      },
      {
        heading: "Umsatzsteuer",
        paragraphs: [
          "Kleinunternehmerregelung gemäß § 6 Abs. 1 Z 27 UStG: Es wird keine Umsatzsteuer ausgewiesen. [UID-Nummer eintragen, falls vorhanden]",
        ],
      },
      {
        heading: "Offenlegung gemäß § 25 MedienG",
        paragraphs: [
          `Medieninhaberin und Herausgeberin: ${NAME}, ${ADDRESS.replace(/\n/g, ", ")}.\nGrundlegende Richtung: Information und Inspiration rund um das Leben mit Katzen sowie die Präsentation digitaler Produkte.`,
        ],
      },
      {
        heading: "Haftung für Links",
        paragraphs: [
          "Diese Website enthält Links zu externen Websites Dritter (z. B. Gumroad), auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir keine Gewähr. Verantwortlich ist stets der jeweilige Anbieter.",
        ],
      },
    ],
  },
  en: {
    title: "Legal Notice",
    sections: [
      {
        heading: "Information according to § 5 ECG (Austria)",
        paragraphs: [`Oh Paw Studio\nOwner: ${NAME}\n${ADDRESS}`],
      },
      { heading: "Contact", paragraphs: [`Email: ${EMAIL}`] },
      {
        heading: "Business purpose",
        paragraphs: [
          "Sale of digital products (planners, templates and memory books for life with cats). [Please check against your trade licence]",
        ],
      },
      {
        heading: "Trade and supervision",
        paragraphs: [
          "Trade authority: [enter the responsible district authority or magistrate]\nMember of the Austrian Economic Chamber: [please check and enter the regional chamber if applicable]\nApplicable regulations: Trade Regulation Act (Gewerbeordnung, www.ris.bka.gv.at)",
        ],
      },
      {
        heading: "VAT",
        paragraphs: [
          "Small business scheme under § 6 (1) no. 27 UStG (Austria): no VAT is shown. [Enter VAT ID if applicable]",
        ],
      },
      {
        heading: "Disclosure according to § 25 MedienG (Austrian Media Act)",
        paragraphs: [
          `Media owner and publisher: ${NAME}, ${ADDRESS.replace(/\n/g, ", ")}.\nBasic orientation: information and inspiration about life with cats and the presentation of digital products.`,
        ],
      },
      {
        heading: "Liability for links",
        paragraphs: [
          "This website contains links to external third-party websites (e.g. Gumroad). We have no influence on their content and accept no liability for it. The respective provider is always responsible.",
        ],
      },
    ],
  },
};

export const privacy: Record<Locale, LegalPage> = {
  de: {
    title: "Datenschutzerklärung",
    sections: [
      {
        heading: "1. Verantwortliche",
        paragraphs: [
          `Verantwortlich im Sinne der DSGVO ist:\n${NAME}, Oh Paw Studio\n${ADDRESS}\nE-Mail: ${EMAIL}`,
        ],
      },
      {
        heading: "2. Hosting und Server-Logfiles",
        paragraphs: [
          "Diese Website wird bei Netlify, Inc. (512 2nd Street, Suite 200, San Francisco, CA 94107, USA) gehostet. Beim Aufruf der Seite verarbeitet der Hosting-Anbieter technisch notwendige Daten, insbesondere die IP-Adresse, Datum und Uhrzeit des Abrufs, die aufgerufene Seite sowie Browser- und Geräteinformationen. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).",
          "[Vor dem Livegang prüfen: Auftragsverarbeitungsvertrag mit dem Hosting-Anbieter und Grundlage der Datenübermittlung in die USA.]",
        ],
      },
      {
        heading: "3. Cookies und Tracking",
        paragraphs: [
          "Diese Website setzt derzeit keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge.",
        ],
      },
      {
        heading: "4. Schriftarten und Bilder",
        paragraphs: [
          "Die verwendeten Schriftarten werden beim Erstellen der Website heruntergeladen und von unserem eigenen Server ausgeliefert. Beim Aufruf der Seite findet keine Verbindung zu Google statt. Produktbilder werden über unseren Server ausgeliefert.",
        ],
      },
      {
        heading: "5. Kontakt per E-Mail",
        paragraphs: [
          "Wenn du uns per E-Mail schreibst, verarbeiten wir deine Angaben (E-Mail-Adresse, Inhalt der Nachricht) zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b oder f DSGVO. Unser E-Mail-Postfach wird bei IONOS SE (Elgendorfer Str. 57, 56410 Montabaur, Deutschland) betrieben. Wir löschen deine Nachricht, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
        ],
      },
      {
        heading: "6. Links zu Gumroad",
        paragraphs: [
          "Unsere Produkte verkaufen wir über Gumroad. Wenn du auf einen Kaufen-Link klickst, verlässt du diese Website. Für die Datenverarbeitung auf Gumroad ist allein Gumroad verantwortlich; bitte beachte deren Datenschutzerklärung.",
        ],
      },
      {
        heading: "7. Deine Rechte",
        paragraphs: [
          "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei der Aufsichtsbehörde beschweren. In Österreich ist das die Datenschutzbehörde (Barichgasse 40–42, 1030 Wien, www.dsb.gv.at). Für deine Anliegen an uns wende dich an die oben genannte E-Mail-Adresse.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "1. Controller",
        paragraphs: [
          `The controller under the GDPR is:\n${NAME}, Oh Paw Studio\n${ADDRESS}\nEmail: ${EMAIL}`,
        ],
      },
      {
        heading: "2. Hosting and server log files",
        paragraphs: [
          "This website is hosted by Netlify, Inc. (512 2nd Street, Suite 200, San Francisco, CA 94107, USA). When you visit the site, the hosting provider processes technically necessary data, in particular your IP address, date and time of the request, the page requested, and browser and device information. The legal basis is our legitimate interest in operating the website securely and reliably (Art. 6(1)(f) GDPR).",
          "[Check before launch: data processing agreement with the hosting provider and basis for the transfer of data to the USA.]",
        ],
      },
      {
        heading: "3. Cookies and tracking",
        paragraphs: [
          "This website currently sets no cookies and uses no analytics or tracking tools.",
        ],
      },
      {
        heading: "4. Fonts and images",
        paragraphs: [
          "The fonts we use are downloaded when the website is built and delivered from our own server. No connection to Google is made when you visit the site. Product images are delivered through our server.",
        ],
      },
      {
        heading: "5. Contact by email",
        paragraphs: [
          "If you write to us by email, we process your details (email address, content of your message) to handle your request. The legal basis is Art. 6(1)(b) or (f) GDPR. Our mailbox is operated by IONOS SE (Elgendorfer Str. 57, 56410 Montabaur, Germany). We delete your message once the request is settled and no statutory retention duties apply.",
        ],
      },
      {
        heading: "6. Links to Gumroad",
        paragraphs: [
          "We sell our products through Gumroad. When you click a buy link, you leave this website. Gumroad alone is responsible for data processing on its platform; please see its privacy policy.",
        ],
      },
      {
        heading: "7. Your rights",
        paragraphs: [
          "You have the right of access, rectification, erasure, restriction of processing, data portability and objection. You may also lodge a complaint with the supervisory authority. In Austria this is the Datenschutzbehörde (Barichgasse 40–42, 1030 Vienna, www.dsb.gv.at). For requests to us, please contact the email address above.",
        ],
      },
    ],
  },
};
