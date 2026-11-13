// Sanfter Übergang beim Seitenwechsel (nur Einblenden, bei „Bewegung reduzieren“ ohne Effekt).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in flex flex-1 flex-col">{children}</div>;
}
