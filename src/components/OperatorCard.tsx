import Link from "next/link";
import type { Listing } from "@/lib/types";
import { OperatorLogo } from "./OperatorLogo";
import { OutboundCta } from "./OutboundCta";
import { SponsorBadge } from "./SponsorBadge";

export function OperatorCard({
  listing,
  sponsored = false,
}: {
  listing: Listing;
  sponsored?: boolean;
}) {
  return (
    <article className="flex h-full flex-col border border-line bg-bg">
      <div className="flex min-h-[8.5rem] items-center justify-center border-b border-line bg-logo px-5 py-6">
        <OperatorLogo
          listing={listing}
          size="lg"
          className="border-0 bg-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold leading-tight text-paper">
            <Link href={`/operators/${listing.slug}`} className="hover:underline">
              {listing.name}
            </Link>
          </h3>
          {sponsored ? <SponsorBadge /> : null}
        </div>
        <p className="mt-2 flex-1 text-sm leading-6 text-mute">{listing.taglineZh}</p>
        <div className="mt-4 flex flex-col gap-2">
          {listing.officialUrl ? (
            <OutboundCta
              href={listing.officialUrl}
              sponsored={sponsored}
              className="inline-flex items-center justify-center rounded-sm bg-play px-3 py-2.5 text-center text-sm font-bold text-white"
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
      </div>
    </article>
  );
}
