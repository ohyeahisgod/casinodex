import Link from "next/link";
import type { Listing } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/site";
import { OperatorLogo } from "./OperatorLogo";
import { OutboundCta } from "./OutboundCta";
import { SponsorBadge } from "./SponsorBadge";

export function OperatorListing({
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
      className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 border-b border-line px-2 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-4 ${
        sponsored ? "bg-[#1d1a12]" : "bg-bg"
      }`}
    >
      <OperatorLogo listing={listing} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-base font-bold leading-tight text-paper sm:text-lg">
            <Link href={`/operators/${listing.slug}`} className="hover:underline">
              {listing.name}
            </Link>
          </h3>
          {sponsored ? <SponsorBadge /> : null}
          {featured ? (
            <span className="rounded-sm border border-line px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-mute">
              精選
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 text-sm leading-5 text-mute">{listing.taglineZh}</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {listing.categories.map((category) => (
            <span
              key={category}
              className="rounded-sm bg-panel px-1.5 py-0.5 text-[11px] text-mute"
            >
              {CATEGORY_LABEL[category]}
            </span>
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:min-w-[9.5rem] sm:flex-col sm:items-stretch">
        {listing.officialUrl ? (
          <OutboundCta
            href={listing.officialUrl}
            sponsored={sponsored}
            className="inline-flex items-center justify-center rounded-sm bg-play px-3 py-2 text-center text-sm font-bold text-white"
          >
            前往官網
          </OutboundCta>
        ) : null}
        <Link
          href={`/operators/${listing.slug}`}
          className="inline-flex items-center justify-center rounded-sm border border-line px-3 py-2 text-center text-sm font-semibold text-paper hover:bg-panel"
        >
          查詳情
        </Link>
      </div>
    </article>
  );
}
