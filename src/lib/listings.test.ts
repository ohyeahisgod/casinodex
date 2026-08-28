import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { getOrganicListings, listings, scoreLabel } from "./listings";
import { resolveInventory, sponsorConfig } from "./sponsors";

test("ships fourteen licensed listings", () => {
  assert.equal(listings.length, 14);
  assert.deepEqual(
    listings.map((item) => item.name),
    [
      "Stake",
      "BC.Game",
      "1xBet",
      "Roobet",
      "Cloudbet",
      "Rollbit",
      "GG.BET",
      "22Bet",
      "1win",
      "Gamdom",
      "Shuffle",
      "Rainbet",
      "7Bit",
      "BetFury",
    ],
  );
});

test("organic default order ignores paid slots and scores", () => {
  const organic = getOrganicListings({ sort: "default" });
  assert.equal(organic.length, 14);
  assert.equal(organic[0].name, "Stake");
  assert.ok(organic.every((item) => item.score === null));
});

test("organic name sort is alphabetical and still unpaid", () => {
  const organic = getOrganicListings({ sort: "name" });
  assert.deepEqual(
    organic.map((item) => item.name),
    [...organic].map((item) => item.name).sort((a, b) => a.localeCompare(b, "en")),
  );
});

test("category filter does not inject sponsor ranking", () => {
  const crypto = getOrganicListings({ category: "crypto", sort: "default" });
  assert.ok(crypto.every((item) => item.categories.includes("crypto")));
  assert.ok(crypto.some((item) => item.slug === "stake"));
  assert.ok(!crypto.some((item) => item.slug === "1xbet"));
});

test("empty score stays null in data and is not a fake chip in listings", () => {
  assert.equal(scoreLabel(null), "待評分");
  assert.equal(scoreLabel(undefined), "待評分");
  assert.ok(listings.every((item) => item.score === null));
});

test("each of the 14 operators has a unique selling line and an in-repo logo", () => {
  const taglines = listings.map((item) => item.taglineZh);
  assert.equal(new Set(taglines).size, 14);
  assert.ok(listings.every((item) => item.taglineZh.length > 0));
  assert.ok(
    listings.every((item) => !item.blurbZh.includes("持牌與官網資訊待編輯核實")),
  );
  assert.ok(listings.every((item) => !item.taglineZh.includes("待核實")));
  assert.ok(listings.every((item) => item.logo.startsWith("/logos/")));
  for (const item of listings) {
    const file = path.join(process.cwd(), "public", item.logo);
    assert.equal(existsSync(file), true, `${item.slug} missing ${item.logo}`);
  }
});

test("gold three seats stay empty by default and never auto-fill", () => {
  const inventory = resolveInventory(listings, sponsorConfig, {});
  assert.equal(inventory.gold.length, 3);
  assert.ok(inventory.gold.every((slot) => slot.filled === false));
  assert.ok(inventory.gold.every((slot) => slot.listing === null));
  assert.ok(inventory.silver.casino.filled === false);
  assert.ok(inventory.silver.sports.filled === false);
  assert.ok(inventory.silver.crypto.filled === false);
  assert.equal(inventory.bronze.length, 6);
  assert.ok(inventory.bronze.every((slot) => slot.filled === false));
});

test("a paid slot fills only when enabled and slug matches a listing", () => {
  const inventory = resolveInventory(listings, sponsorConfig, {
    SPONSOR_GOLD_1_ENABLED: "true",
    SPONSOR_GOLD_1_SLUG: "stake",
    SPONSOR_GOLD_2_SLUG: "bc-game",
    SPONSOR_SILVER_CASINO_ENABLED: "true",
    SPONSOR_SILVER_CASINO_SLUG: "roobet",
    SPONSOR_BRONZE_1_ENABLED: "false",
    SPONSOR_BRONZE_1_SLUG: "shuffle",
  });

  assert.equal(inventory.gold[0].filled, true);
  assert.equal(inventory.gold[0].listing?.name, "Stake");
  assert.equal(inventory.gold[1].filled, false);
  assert.equal(inventory.gold[2].filled, false);
  assert.equal(inventory.silver.casino.filled, true);
  assert.equal(inventory.bronze[0].filled, false);

  const organic = getOrganicListings({ sort: "default" });
  assert.equal(organic[0].name, "Stake");
  assert.equal(organic.length, 14);
});

test("unknown slug or disabled flag keeps the seat vacant", () => {
  const inventory = resolveInventory(listings, sponsorConfig, {
    SPONSOR_GOLD_1_ENABLED: "true",
    SPONSOR_GOLD_1_SLUG: "not-a-brand",
    SPONSOR_GOLD_2_ENABLED: "true",
    SPONSOR_GOLD_2_SLUG: "",
  });
  assert.equal(inventory.gold[0].filled, false);
  assert.equal(inventory.gold[1].filled, false);
});
