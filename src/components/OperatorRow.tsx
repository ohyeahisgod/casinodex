import Link from "next/link";
import type { Listing } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/site";
import { BrandMark } from "./BrandMark";
import { FeaturedBadge, ScoreMark, SponsorBadge } from "./SponsorBadge";

export function OperatorRow({
  listing,
  sponsored = false,
  featured = false,
}: {
  listing: Listing;
  sponsored?: boolean;
  featured?: boolean;
}) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center ${
        sponsored
          ? "border-gold/40 bg-gold-soft"
          : "border-line bg-panel"
      }`}
    >
      <BrandMark name={listing.name} slug={listing.slug} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-paper">
            <Link href={`/operators/${listing.slug}`} className="hover:underline">
              {listing.name}
            </Link>
          </h3>
          {sponsored ? <SponsorBadge /> : null}
          {featured ? <FeaturedBadge /> : null}
        </div>
        <p className="mt-1 text-sm leading-6 text-mute">{listing.blurbZh}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-mute">
          {listing.categories.map((category) => (
            <span key={category}>{CATEGORY_LABEL[category]}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
        <ScoreMark score={listing.score} />
        <Link
          href={`/operators/${listing.slug}`}
          className="text-sm font-medium text-paper hover:underline"
        >
          查看資料
        </Link>
      </div>
    </article>
  );
}
