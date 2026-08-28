export const CATEGORIES = ["casino", "sports", "crypto"] as const;

export type Category = (typeof CATEGORIES)[number];

export type OrganicSort = "default" | "name";

export type LicenseInfo = {
  label: string;
  authority: string | null;
  licenseId: string | null;
};

export type Listing = {
  slug: string;
  name: string;
  logo: string;
  taglineZh: string;
  blurbZh: string;
  categories: Category[];
  license: LicenseInfo;
  score: number | null;
  officialUrl: string | null;
};

export type SlotConfig = {
  id: string;
  enabled: boolean;
  listingSlug: string | null;
};

export type SponsorConfig = {
  gold: {
    id: "gold";
    nameZh: string;
    priceUsdPerMonth: number;
    slotCount: 3;
    slots: [SlotConfig, SlotConfig, SlotConfig] | SlotConfig[];
  };
  silver: {
    id: "silver";
    nameZh: string;
    priceUsdPerMonth: number;
    slots: Record<Category, SlotConfig>;
  };
  bronze: {
    id: "bronze";
    nameZh: string;
    priceUsdPerMonth: number;
    maxPerPage: number;
    slots: SlotConfig[];
  };
};

export type ResolvedSlot = {
  id: string;
  enabled: boolean;
  listingSlug: string | null;
  filled: boolean;
  listing: Listing | null;
  tier: "gold" | "silver" | "bronze";
  priceUsdPerMonth: number;
  category?: Category;
};

export type SiteConfig = {
  name: string;
  nameZh: string;
  tagline: string;
  description: string;
  contactEmail: string;
  ageMinimum: number;
  locale: string;
};
