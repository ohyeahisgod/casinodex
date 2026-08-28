import Link from "next/link";
import type { ResolvedSlot } from "@/lib/types";
import { OperatorCard } from "./OperatorCard";
import { SponsorBadge } from "./SponsorBadge";

export function GoldSlots({ slots }: { slots: ResolvedSlot[] }) {
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-base font-bold text-paper sm:text-lg">
          本週熱門 · 贊助席位
        </h2>
        <Link href="/sponsors" className="text-xs text-mute hover:text-paper">
          了解贊助
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {slots.map((slot, index) =>
          slot.filled && slot.listing ? (
            <div key={slot.id} className="relative">
              <div className="absolute left-3 top-3 z-10">
                <SponsorBadge extra="GOLD" />
              </div>
              <OperatorCard listing={slot.listing} sponsored />
            </div>
          ) : (
            <div
              key={slot.id}
              className="flex min-h-[12.5rem] flex-col items-center justify-center gap-3 border border-dashed border-line bg-bg-2 px-4 py-10 text-center sm:min-h-[16rem]"
            >
              <SponsorBadge />
              <p className="text-sm font-medium text-mute">本週熱門·贊助席位</p>
              <p className="text-xs text-mute">{index + 1}/3</p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
