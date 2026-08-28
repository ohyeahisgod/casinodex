import type { Listing } from "@/lib/types";
import { initials } from "@/lib/format";

const SIZE = {
  sm: "h-12 w-12",
  md: "h-[4.75rem] w-[4.75rem] sm:h-20 sm:w-[5.5rem]",
  lg: "h-24 w-36 sm:h-28 sm:w-48",
} as const;

export function OperatorLogo({
  listing,
  size = "md",
  className = "",
}: {
  listing: Listing;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm border border-line bg-logo ${SIZE[size]} ${className}`}
    >
      {listing.logo ? (
        // Local files in /public; <img> keeps SVG + PNG simple on OpenNext Workers.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={listing.logo}
          alt={listing.name}
          className="max-h-[86%] max-w-[90%] object-contain"
        />
      ) : (
        <span aria-hidden className="text-sm font-bold text-paper">
          {initials(listing.name)}
        </span>
      )}
    </span>
  );
}
