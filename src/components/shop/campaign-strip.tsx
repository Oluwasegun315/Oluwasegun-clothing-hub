import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  align?: "left" | "right";
};

/** Full-bleed editorial banner between shop sections. */
export function CampaignStrip({ title, subtitle, image, href = "/collections", align = "left" }: Props) {
  return (
    <section className="relative my-16 min-h-[min(52vh,520px)] w-full overflow-hidden rounded-3xl border border-border md:my-24">
      <Image src={image} alt="" fill className="object-cover" sizes="100vw" priority={false} />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent",
          align === "right" && "bg-gradient-to-l"
        )}
      />
      <div
        className={cn(
          "relative flex h-full min-h-[min(52vh,520px)] max-w-2xl flex-col justify-end p-8 pb-12 md:p-14 lg:p-16",
          align === "right" && "ml-auto items-end text-right"
        )}
      >
        <p className="font-display text-xs tracking-[0.45em] text-primary-foreground/90">CAMPAIGN</p>
        <h2 className="mt-4 font-display text-4xl leading-[0.95] text-primary-foreground md:text-6xl lg:text-7xl">{title}</h2>
        <p className="mt-5 max-w-lg text-base text-primary-foreground/90 md:text-lg">{subtitle}</p>
        <Link href={href} className={cn(buttonVariants(), "mt-8 w-fit rounded-full px-8 glow-button")}>
          View story
        </Link>
      </div>
    </section>
  );
}
