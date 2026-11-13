"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NewsletterStrings = {
  email: string;
  button: string;
  sending: string;
  consentBefore: string;
  consentLink: string;
  consentAfter: string;
  note: string;
  success: string;
  errorEmail: string;
  errorConsent: string;
  errorNetwork: string;
};

type Status = "idle" | "sending" | "success" | "error";

// Eigenes Formular, das beim Absenden an MailerLite sendet. Es lädt vorab keine Skripte von Dritten
// (kein Google reCAPTCHA) und setzt keine Cookies.
export default function NewsletterSignup({
  lang,
  action,
  t,
}: {
  lang: "de" | "en";
  action: string;
  t: NewsletterStrings;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const loadedAt = useRef<number | null>(null);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  if (status === "success") {
    return (
      <p role="status" className="font-serif text-2xl leading-8">
        {t.success}
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") ?? "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          setError(t.errorEmail);
          setStatus("error");
          return;
        }
        if (!form.get("consent")) {
          setError(t.errorConsent);
          setStatus("error");
          return;
        }
        // Spamschutz: ausgefülltes Fangfeld oder Absenden innerhalb einer Sekunde nach dem Laden der Seite (Bots).
        const tooFast = loadedAt.current !== null && Date.now() - loadedAt.current < 1000;
        if (form.get("website") || tooFast) {
          setStatus("success");
          return;
        }
        setStatus("sending");
        try {
          await fetch(action, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams({ "fields[email]": email, "ml-submit": "1", anticsrf: "true" }),
          });
          setStatus("success");
        } catch {
          setError(t.errorNetwork);
          setStatus("error");
        }
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`nl-email-${lang}`} className="sr-only">{t.email}</label>
          <input
            id={`nl-email-${lang}`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.email}
            aria-invalid={status === "error" && !!error}
            aria-describedby="nl-note"
            className="min-h-12 w-full rounded-lg border-[1.5px] border-taupe bg-ivory px-4 text-base transition-colors hover:border-olive-deep focus:border-cocoa focus:outline-2 focus:outline-offset-2 focus:outline-cocoa"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-olive-deep px-8 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa disabled:bg-sand disabled:text-cocoa/70"
        >
          {status === "sending" ? t.sending : t.button}
        </button>
      </div>

      {/* Fangfeld gegen Spam-Bots, für Menschen unsichtbar */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-cocoa/90">
        <input type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0 accent-[#626a54]" />
        <span>
          {t.consentBefore}
          <Link href={`/${lang}/datenschutz`} className="text-cocoa underline underline-offset-4 hover:text-olive-deep">
            {t.consentLink}
          </Link>
          {t.consentAfter}
        </span>
      </label>

      {status === "error" && error && (
        <p role="alert" className="mt-3 text-sm text-[#7a3f33]">{error}</p>
      )}
      <p id="nl-note" className="mt-3 text-sm text-cocoa/90">{t.note}</p>
    </form>
  );
}
