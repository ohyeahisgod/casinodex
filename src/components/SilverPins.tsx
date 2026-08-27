import Link from "next/link";
import type { Category, ResolvedSlot } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/site";
import { usdPerMonth } from "@/lib/sponsors";
import { OperatorRow } from "./OperatorRow";
import { SponsorBadge } from "./SponsorBadge";
import { SectionLabel } from "./ui";

function EmptySilver({
  slot,
  category,
}: {
  slot: ResolvedSlot;
  category: Category;
}) {
  return (
    <article className="rounded-2xl border border-dashed border-gold/45 bg-gold-soft p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <SponsorBadge extra="SILVER" />
        <span className="text-sm text-mute">
          {CATEGORY_LABEL[category]}置頂
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-paper">此分類置頂檔位招租</h3>
      <p className="mt-1 text-sm leading-6 text-mute">
        固定出現在該分類列表頂端，不進入有機排名。{usdPerMonth(slot.priceUsdPerMonth)}
      </p>
      <Link href="/sponsors" className="mt-3 inline-block text-sm font-medium hover:underline">
        了解贊助方案
      </Link>
    </article>
  );
}

export function SilverPins({
  slots,
}: {
  slots: { category: Category; slot: ResolvedSlot }[];
}) {
  if (slots.length === 0) return null;

  return (
    <section className="space-y-3">
      <SectionLabel tone="sponsor">贊助置頂 · Silver</SectionLabel>
      <div className="grid gap-3">
        {slots.map(({ category, slot }) =>
          slot.filled && slot.listing ? (
            <div key={slot.id}>
              <OperatorRow listing={slot.listing} sponsored />
            </div>
          ) : (
            <EmptySilver key={slot.id} slot={slot} category={category} />
          ),
        )}
      </div>
    </section>
  );
}
