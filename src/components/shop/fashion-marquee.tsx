const DEFAULT_ITEMS = [
  "QUIET LUXURY",
  "OVERSIZED SILHOUETTE",
  "PREMIUM STREET",
  "NEUTRAL TONES",
  "CARGO SYSTEMS",
  "ELEVATED BASICS",
  "RUNWAY ENERGY",
  "GLOBAL EDIT",
];

/** Infinite horizontal marquee — editorial runway ticker (CSS animation for smooth loop). */
export function FashionMarquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-background py-4">
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap font-display text-sm tracking-[0.5em] text-primary/90">
        {doubled.map((t, i) => (
          <span key={`${t}-${i}`} className="select-none">
            {t}
            <span className="mx-8 text-muted-foreground/60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
