import listingsJson from "../../content/listings.json";
import type { Category, Listing, OrganicSort } from "./types";
import { CATEGORIES } from "./types";

export const listings = listingsJson as Listing[];

export function getListing(slug: string): Listing | undefined {
  return listings.find((item) => item.slug === slug);
}

export function isCategory(value: string | undefined | null): value is Category {
  return !!value && (CATEGORIES as readonly string[]).includes(value);
}

export function listingMatchesCategory(
  listing: Listing,
  category: Category | undefined,
): boolean {
  if (!category) return true;
  return listing.categories.includes(category);
}

export function getOrganicListings(options: {
  category?: Category;
  sort?: OrganicSort;
  source?: Listing[];
} = {}): Listing[] {
  const source = options.source ?? listings;
  const filtered = options.category
    ? source.filter((item) => item.categories.includes(options.category!))
    : [...source];

  if (options.sort === "name") {
    return filtered.sort((a, b) => a.name.localeCompare(b.name, "en"));
  }

  return filtered;
}

/** Homepage showcase: a short organic preview, never the full directory. */
export const SHOWCASE_LIMIT = 6;

export function getShowcaseListings(limit = SHOWCASE_LIMIT): Listing[] {
  return getOrganicListings({ sort: "default" }).slice(0, limit);
}

export function scoreLabel(score: number | null | undefined): string {
  if (score === null || score === undefined) return "待評分";
  return String(score);
}
