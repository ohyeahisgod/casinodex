"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { listings } from "@/lib/listings";
import { sponsorConfig } from "@/lib/sponsors";
import type { Category, SlotConfig, SponsorConfig } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

const COOKIE = "casinodex-admin";

function password(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export async function isAdminAuthed(): Promise<boolean> {
  const expected = password();
  if (!expected) return false;
  const jar = await cookies();
  return jar.get(COOKIE)?.value === expected;
}

export async function loginAdmin(formData: FormData) {
  const expected = password();
  const given = String(formData.get("password") ?? "");
  if (!expected || given !== expected) {
    redirect("/admin?error=1");
  }
  const jar = await cookies();
  jar.set(COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  redirect("/admin");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete(COOKIE);
  redirect("/admin");
}

function slotFromForm(
  formData: FormData,
  enabledKey: string,
  slugKey: string,
  id: string,
): SlotConfig {
  const enabled = formData.get(enabledKey) === "on";
  const slugRaw = String(formData.get(slugKey) ?? "").trim();
  const listingSlug = slugRaw && listings.some((item) => item.slug === slugRaw)
    ? slugRaw
    : null;
  return { id, enabled, listingSlug };
}

export async function saveSponsors(formData: FormData) {
  if (!(await isAdminAuthed())) {
    redirect("/admin?error=1");
  }

  const next: SponsorConfig = {
    ...sponsorConfig,
    gold: {
      ...sponsorConfig.gold,
      priceUsdPerMonth: Number(formData.get("goldPrice") || sponsorConfig.gold.priceUsdPerMonth),
      slots: [1, 2, 3].map((index) =>
        slotFromForm(
          formData,
          `gold-${index}-enabled`,
          `gold-${index}-slug`,
          `gold-${index}`,
        ),
      ),
    },
    silver: {
      ...sponsorConfig.silver,
      priceUsdPerMonth: Number(
        formData.get("silverPrice") || sponsorConfig.silver.priceUsdPerMonth,
      ),
      slots: Object.fromEntries(
        CATEGORIES.map((category: Category) => [
          category,
          slotFromForm(
            formData,
            `silver-${category}-enabled`,
            `silver-${category}-slug`,
            `silver-${category}`,
          ),
        ]),
      ) as SponsorConfig["silver"]["slots"],
    },
    bronze: {
      ...sponsorConfig.bronze,
      priceUsdPerMonth: Number(
        formData.get("bronzePrice") || sponsorConfig.bronze.priceUsdPerMonth,
      ),
      slots: [1, 2, 3, 4, 5, 6].map((index) =>
        slotFromForm(
          formData,
          `bronze-${index}-enabled`,
          `bronze-${index}-slug`,
          `bronze-${index}`,
        ),
      ),
    },
  };

  const file = path.join(process.cwd(), "content/sponsors.json");
  await writeFile(file, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  revalidatePath("/");
  revalidatePath("/directory");
  revalidatePath("/sponsors");
  revalidatePath("/admin");
  redirect("/admin?saved=1");
}
