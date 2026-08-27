import Link from "next/link";
import type { ResolvedSlot } from "@/lib/types";
import { usdPerMonth } from "@/lib/sponsors";
import { SponsorBadge } from "./SponsorBadge";
import { OperatorCard } from "./OperatorCard";
import { SectionLabel } from "./ui";

function EmptyGoldCard({
  slot,
  index,
}: {
  slot: ResolvedSlot;
  index: number;
}) {
  return (
    <article className="flex min-h-[220px] flex-col rounded-2xl border border-dashed border-gold/45 bg-gold-soft p-4">
      <div className="flex items-center justify-between gap-2">
        <SponsorBadge extra="GOLD" />
        <span className="text-xs text-mute">檔位 0{index + 1}</span>
      </div>
      <h3 className="mt-6 font-display text-xl text-paper">此檔位招租</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-mute">
        首頁「本週熱門」付費版位。不會自動填入任何品牌，也不會進入有機排序。
      </p>
      <p className="text-sm font-medium text-gold">
        {usdPerMonth(slot.priceUsdPerMonth)}
      </p>
      <Link
        href="/sponsors"
        className="mt-3 text-sm font-medium text-paper hover:underline"
      >
        了解贊助方案
      </Link>
    </article>
  );
}

export function GoldSlots({ slots }: { slots: ResolvedSlot[] }) {
  return (
    <section className="rounded-3xl border border-gold/25 bg-bg-2/80 p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel tone="sponsor">贊助版位 · 與有機名錄分離</SectionLabel>
          <h2 className="mt-2 font-display text-2xl text-paper sm:text-3xl">
            本週熱門
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-mute">
          Gold 固定三席，售出前保持空白。付費品牌不會混入下方有機名單。
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {slots.map((slot, index) =>
          slot.filled && slot.listing ? (
            <div key={slot.id} className="rounded-2xl ring-1 ring-gold/40">
              <div className="flex items-center justify-between px-4 pt-4">
                <SponsorBadge extra="GOLD" />
                <span className="text-xs text-mute">檔位 0{index + 1}</span>
              </div>
              <div className="p-2 pt-0">
                <OperatorCard listing={slot.listing} />
              </div>
            </div>
          ) : (
            <EmptyGoldCard key={slot.id} slot={slot} index={index} />
          ),
        )}
      </div>
    </section>
  );
}
