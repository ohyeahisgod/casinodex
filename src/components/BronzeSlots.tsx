import Link from "next/link";
import type { ResolvedSlot } from "@/lib/types";
import { usdPerMonth } from "@/lib/sponsors";
import { OperatorRow } from "./OperatorRow";
import { SectionLabel } from "./ui";
import { SponsorBadge } from "./SponsorBadge";

function EmptyBronze({ slot, index }: { slot: ResolvedSlot; index: number }) {
  return (
    <article className="rounded-2xl border border-dashed border-gold/35 bg-gold-soft/70 p-4">
      <div className="flex items-center justify-between gap-2">
        <SponsorBadge extra="BRONZE" />
        <span className="text-xs text-mute">精選 {index + 1}/6</span>
      </div>
      <h3 className="mt-3 font-semibold text-paper">精選列招租</h3>
      <p className="mt-1 text-sm leading-6 text-mute">
        列表頁高亮列，附「精選」標籤。每頁最多 6 席。{usdPerMonth(slot.priceUsdPerMonth)}
      </p>
      <Link href="/sponsors" className="mt-2 inline-block text-sm hover:underline">
        了解贊助方案
      </Link>
    </article>
  );
}

export function BronzeSlots({ slots }: { slots: ResolvedSlot[] }) {
  return (
    <section className="space-y-3">
      <SectionLabel tone="sponsor">贊助精選 · Bronze · 每頁最多 6 席</SectionLabel>
      <div className="grid gap-3">
        {slots.map((slot, index) =>
          slot.filled && slot.listing ? (
            <OperatorRow
              key={slot.id}
              listing={slot.listing}
              sponsored
              featured
            />
          ) : (
            <EmptyBronze key={slot.id} slot={slot} index={index} />
          ),
        )}
      </div>
    </section>
  );
}
