/** Subtle fade between routes (§9) — CSS only, so content never waits on JS. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
