import type { LegalPage } from "@/data/legal";

export default function LegalContent({ page }: { page: LegalPage }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-5xl">{page.title}</h1>
      {page.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-2xl">{s.heading}</h2>
          {s.paragraphs.map((p, i) => (
            <p key={i} className="mt-3 whitespace-pre-line text-cocoa/80">
              {p}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}
