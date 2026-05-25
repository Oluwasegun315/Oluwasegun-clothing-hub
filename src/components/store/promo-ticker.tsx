const TICKER = [
  "OLUWASEGUN10 — 10% OFF",
  "STREETWEAR DROPS",
  "MEN · KIDS · TRENDING",
  "REAL FITS · REAL PHOTOS",
  "USD PRICING",
  "NEW HEAT WEEKLY",
] as const;

/** Runway-style ticker — seen on SSENSE, Kith, and high-street flagships. */
export function PromoTicker() {
  const line = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-y border-orange-200/80 bg-gray-950 py-3">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.35em] text-orange-100">
        {line.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-12">
            {t}
            <span className="text-orange-500" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
