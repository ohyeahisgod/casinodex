import { readFileSync } from "node:fs";
import path from "node:path";
import sponsorsJson from "../../content/sponsors.json";
import { listings } from "./listings";
import type {
  Category,
  Listing,
  ResolvedSlot,
  SlotConfig,
  SponsorConfig,
} from "./types";
import { CATEGORIES } from "./types";
import { listingMatchesCategory } from "./listings";

export const sponsorConfig = sponsorsJson as SponsorConfig;

export function loadSponsorConfig(): SponsorConfig {
  try {
    const raw = readFileSync(
      path.join(process.cwd(), "content/sponsors.json"),
      "utf8",
    );
    return JSON.parse(raw) as SponsorConfig;
  } catch {
    return sponsorConfig;
  }
}

type EnvMap = Record<string, string | undefined>;

function parseEnabled(raw: string | undefined, fallback: boolean): boolean {
  if (raw === undefined || raw === "") return fallback;
  const value = raw.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(value)) return true;
  if (["false", "0", "no", "off"].includes(value)) return false;
  return fallback;
}

function parseSlug(
  raw: string | undefined,
  fallback: string | null,
): string | null {
  if (raw === undefined) return fallback;
  const value = raw.trim();
  return value === "" ? null : value;
}

function overlaySlot(
  slot: SlotConfig,
  env: EnvMap,
  enabledKey: string,
  slugKey: string,
): SlotConfig {
  return {
    ...slot,
    enabled: parseEnabled(env[enabledKey], slot.enabled),
    listingSlug: parseSlug(env[slugKey], slot.listingSlug),
  };
}

export function applyEnvOverrides(
  config: SponsorConfig,
  env: EnvMap = process.env,
): SponsorConfig {
  return {
    ...config,
    gold: {
      ...config.gold,
      slots: config.gold.slots.map((slot, index) =>
        overlaySlot(
          slot,
          env,
          `SPONSOR_GOLD_${index + 1}_ENABLED`,
          `SPONSOR_GOLD_${index + 1}_SLUG`,
        ),
      ),
    },
    silver: {
      ...config.silver,
      slots: Object.fromEntries(
        CATEGORIES.map((category) => [
          category,
          overlaySlot(
            config.silver.slots[category],
            env,
            `SPONSOR_SILVER_${category.toUpperCase()}_ENABLED`,
            `SPONSOR_SILVER_${category.toUpperCase()}_SLUG`,
          ),
        ]),
      ) as SponsorConfig["silver"]["slots"],
    },
    bronze: {
      ...config.bronze,
      slots: config.bronze.slots.map((slot, index) =>
        overlaySlot(
          slot,
          env,
          `SPONSOR_BRONZE_${index + 1}_ENABLED`,
          `SPONSOR_BRONZE_${index + 1}_SLUG`,
        ),
      ),
    },
  };
}

export function resolveSlot(
  slot: SlotConfig,
  options: {
    tier: ResolvedSlot["tier"];
    priceUsdPerMonth: number;
    listings: Listing[];
    category?: Category;
  },
): ResolvedSlot {
  const listing = slot.listingSlug
    ? (options.listings.find((item) => item.slug === slot.listingSlug) ?? null)
    : null;
  const filled = Boolean(slot.enabled && listing);

  return {
    id: slot.id,
    enabled: slot.enabled,
    listingSlug: slot.listingSlug,
    filled,
    listing: filled ? listing : null,
    tier: options.tier,
    priceUsdPerMonth: options.priceUsdPerMonth,
    category: options.category,
  };
}

export function resolveInventory(
  listingCatalog: Listing[],
  config: SponsorConfig = sponsorConfig,
  env: EnvMap = process.env,
): {
  config: SponsorConfig;
  gold: ResolvedSlot[];
  silver: Record<Category, ResolvedSlot>;
  bronze: ResolvedSlot[];
} {
  const merged = applyEnvOverrides(config, env);
  const gold = merged.gold.slots.slice(0, 3).map((slot) =>
    resolveSlot(slot, {
      tier: "gold",
      priceUsdPerMonth: merged.gold.priceUsdPerMonth,
      listings: listingCatalog,
    }),
  );

  const silver = Object.fromEntries(
    CATEGORIES.map((category) => [
      category,
      resolveSlot(merged.silver.slots[category], {
        tier: "silver",
        priceUsdPerMonth: merged.silver.priceUsdPerMonth,
        listings: listingCatalog,
        category,
      }),
    ]),
  ) as Record<Category, ResolvedSlot>;

  const bronze = merged.bronze.slots
    .slice(0, merged.bronze.maxPerPage)
    .map((slot) =>
      resolveSlot(slot, {
        tier: "bronze",
        priceUsdPerMonth: merged.bronze.priceUsdPerMonth,
        listings: listingCatalog,
      }),
    );

  return { config: merged, gold, silver, bronze };
}

export function bronzeForPage(
  bronze: ResolvedSlot[],
  category: Category | undefined,
): ResolvedSlot[] {
  return bronze.map((slot) => {
    if (!slot.filled || !slot.listing) return slot;
    if (listingMatchesCategory(slot.listing, category)) return slot;
    return { ...slot, filled: false, listing: null };
  });
}

export function getSponsorInventory() {
  return resolveInventory(listings, loadSponsorConfig());
}

export function usdPerMonth(amount: number): string {
  return `USD $${amount.toLocaleString("en-US")} / 月`;
}
