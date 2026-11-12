import { notFound } from "next/navigation";
import { about } from "@/data/about";
import { hasLocale } from "../dictionaries";

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const page = about[lang];

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-5xl">{page.title}</h1>
      <p className="mt-6 font-serif text-2xl leading-9 text-olive">
        {page.lead}
      </p>
      {page.sections.map((s) => (
        <section key={s.heading} className="mt-12">
          <h2 className="text-3xl">{s.heading}</h2>
          {s.paragraphs?.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-8 text-cocoa/85">
              {p}
            </p>
          ))}
          {s.items && (
            <ul className="mt-4 space-y-3">
              {s.items.map((it, i) => (
                <li
                  key={i}
                  className="border-l-2 border-sage pl-4 text-lg leading-8 text-cocoa/85"
                >
                  {it.title && (
                    <strong className="font-medium text-cocoa">
                      {it.title}:{" "}
                    </strong>
                  )}
                  {it.text}
                </li>
              ))}
            </ul>
          )}
          {s.closing && (
            <p className="mt-4 text-lg leading-8 text-cocoa/85">{s.closing}</p>
          )}
        </section>
      ))}
    </main>
  );
}
