import Link from "next/link";
import type { Category, ResolvedSlot } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/site";
import { usdPerMonth } from "@/lib/sponsors";
import { OperatorListing } from "./OperatorListing";
import { SponsorBadge } from "./SponsorBadge";

export function SilverPins({
  slots,
}: {
  slots: { category: Category; slot: ResolvedSlot }[];
}) {
  if (slots.length === 0) return null;

  const filled = slots.filter(({ slot }) => slot.filled && slot.listing);
  const vacant = slots.filter(({ slot }) => !(slot.filled && slot.listing));
  const sample = slots[0]?.slot;

  return (
    <section>
      {filled.map(({ category, slot }) => (
        <div key={slot.id}>
          <p className="mb-1 flex items-center gap-2 text-[11px] text-mute">
            <SponsorBadge extra="SILVER" />
            {CATEGORY_LABEL[category]}置頂
          </p>
          <OperatorListing listing={slot.listing!} sponsored />
        </div>
      ))}
      {vacant.length > 0 && sample ? (
        <p className="flex flex-wrap items-center gap-2 border border-dashed border-line px-3 py-2 text-xs text-mute">
          <SponsorBadge extra="SILVER" />
          <span>
            分類置頂招租
            {vacant.map(({ category }) => ` · ${CATEGORY_LABEL[category]}`).join("")}
            {" · "}
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
