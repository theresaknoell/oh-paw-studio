export default function SiteFooter({ claim }: { claim: string }) {
  return (
    <footer className="mt-auto border-t border-sand">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-cocoa/70">
        <p className="font-serif text-lg text-cocoa">{claim}</p>
        <p className="mt-2">© 2026 Oh Paw Studio</p>
      </div>
    </footer>
  );
}
