import Link from "next/link";
import type { Listing } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/site";
import { BrandMark } from "./BrandMark";
import { ScoreMark } from "./SponsorBadge";

export function OperatorCard({ listing }: { listing: Listing }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-panel p-4">
      <div className="flex items-start gap-3">
        <BrandMark name={listing.name} slug={listing.slug} />
        <div className="min-w-0">
          <h3 className="font-semibold text-paper">
            <Link href={`/operators/${listing.slug}`} className="hover:underline">
              {listing.name}
            </Link>
          </h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {listing.categories.map((category) => (
              <span key={category} className="text-[11px] text-mute">
                {CATEGORY_LABEL[category]}
              </span>
            ))}
          </div>
        </div>
        <ScoreMark score={listing.score} />
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-mute">{listing.blurbZh}</p>
      <Link
        href={`/operators/${listing.slug}`}
        className="mt-4 text-sm font-medium text-paper hover:underline"
      >
        查看資料
      </Link>
    </article>
  );
}
