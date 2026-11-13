// Textvorlagen für Impressum und Datenschutz. Keine Rechtsberatung.
// Alles in [eckigen Klammern] muss vor dem Livegang ausgefüllt bzw. geprüft werden.
import type { Locale } from "@/app/[lang]/dictionaries";

export type LegalPage = {
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const NAME = "[Vor- und Nachname]";
const ADDRESS = "[Straße und Hausnummer, PLZ Ort, Land]";
const EMAIL = "hello@ohpawstudio.com";

export const imprint: Record<Locale, LegalPage> = {
  de: {
    title: "Impressum",
    sections: [
      {
        heading: "Angaben gemäß § 5 DDG",
        paragraphs: [`Oh Paw Studio\nInhaberin: ${NAME}\n${ADDRESS}`],
      },
      { heading: "Kontakt", paragraphs: [`E-Mail: ${EMAIL}`] },
      {
        heading: "Umsatzsteuer",
        paragraphs: [
          "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).",
        ],
      },
      {
        heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        paragraphs: [`${NAME}\n${ADDRESS}`],
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
        heading: "Information according to § 5 DDG",
        paragraphs: [`Oh Paw Studio\nOwner: ${NAME}\n${ADDRESS}`],
      },
      { heading: "Contact", paragraphs: [`Email: ${EMAIL}`] },
      {
        heading: "VAT",
        paragraphs: [
          "In accordance with § 19 UStG (German small business regulation), no VAT is charged.",
        ],
      },
      {
        heading: "Responsible for content according to § 18 (2) MStV",
        paragraphs: [`${NAME}\n${ADDRESS}`],
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
        heading: "5. Links zu Gumroad",
        paragraphs: [
          "Unsere Produkte verkaufen wir über Gumroad. Wenn du auf einen Kaufen-Link klickst, verlässt du diese Website. Für die Datenverarbeitung auf Gumroad ist allein Gumroad verantwortlich; bitte beachte deren Datenschutzerklärung.",
        ],
      },
      {
        heading: "6. Deine Rechte",
        paragraphs: [
          "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren. Wende dich dafür an die oben genannte E-Mail-Adresse.",
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
        heading: "5. Links to Gumroad",
        paragraphs: [
          "We sell our products through Gumroad. When you click a buy link, you leave this website. Gumroad alone is responsible for data processing on its platform; please see its privacy policy.",
        ],
      },
      {
        heading: "6. Your rights",
        paragraphs: [
          "You have the right of access, rectification, erasure, restriction of processing, data portability and objection. You may also lodge a complaint with a data protection supervisory authority. Please contact us at the email address above.",
        ],
      },
    ],
  },
};
