import Link from "next/link";
import type { ResolvedSlot } from "@/lib/types";
import { usdPerMonth } from "@/lib/sponsors";
import { OperatorListing } from "./OperatorListing";
import { SponsorBadge } from "./SponsorBadge";

export function BronzeSlots({ slots }: { slots: ResolvedSlot[] }) {
  const filled = slots.filter((slot) => slot.filled && slot.listing);
  const vacant = slots.filter((slot) => !(slot.filled && slot.listing));
  const sample = slots[0];

  return (
    <section className="space-y-2">
      {filled.map((slot) => (
        <OperatorListing
          key={slot.id}
          listing={slot.listing!}
          sponsored
          featured
        />
      ))}
      {vacant.length > 0 && sample ? (
        <p className="flex flex-wrap items-center gap-2 border border-dashed border-line px-3 py-2 text-xs text-mute">
          <SponsorBadge extra="BRONZE" />
          <span>
            精選列招租 · {vacant.length}/{slots.length} 席空 ·{" "}
            {usdPerMonth(sample.priceUsdPerMonth)}
          </span>
          <Link href="/sponsors" className="ml-auto text-paper hover:underline">
            贊助方案
          </Link>
        </p>
      ) : null}
    </section>
  );
}
