import Link from "next/link";
import type { ResolvedSlot } from "@/lib/types";
import { OperatorListing } from "./OperatorListing";
import { SponsorBadge } from "./SponsorBadge";

export function GoldSlots({ slots }: { slots: ResolvedSlot[] }) {
  return (
    <section className="border-y border-line bg-bg-2">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-2">
        <p className="text-[11px] font-semibold tracking-wide text-mute">
          本週熱門 · 贊助席位
        </p>
        <Link href="/sponsors" className="text-[11px] text-mute hover:text-paper">
          了解贊助
        </Link>
      </div>
      <div className="grid gap-px bg-line sm:grid-cols-3">
        {slots.map((slot, index) =>
          slot.filled && slot.listing ? (
            <div key={slot.id} className="bg-bg">
              <div className="flex items-center justify-between px-2 pt-2">
                <SponsorBadge extra="GOLD" />
                <span className="text-[11px] text-mute">席 {index + 1}/3</span>
              </div>
              <OperatorListing listing={slot.listing} sponsored />
            </div>
          ) : (
            <div
              key={slot.id}
              className="flex min-h-[52px] items-center gap-2 bg-bg px-3 py-2 text-xs text-mute"
            >
              <SponsorBadge />
              <span>本週熱門·贊助席位 {index + 1}/3</span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
