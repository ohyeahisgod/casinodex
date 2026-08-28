import type { Metadata } from "next";
import { BronzeSlots } from "@/components/BronzeSlots";
import { CategoryFilters } from "@/components/CategoryFilters";
import { OperatorListing } from "@/components/OperatorListing";
import { SilverPins } from "@/components/SilverPins";
import { Container } from "@/components/ui";
import { getOrganicListings, isCategory } from "@/lib/listings";
import { CATEGORY_LABEL } from "@/lib/site";
import { bronzeForPage, getSponsorInventory } from "@/lib/sponsors";
import type { Category, OrganicSort } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "平台名錄",
  description: "CasinoDex 持牌平台有機名錄。贊助置頂與精選與有機排序分離。",
};

export default async function DirectoryPage({
  searchParams,
}: PageProps<"/directory">) {
  const params = await searchParams;
  const categoryParam = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const sortParam = Array.isArray(params.sort) ? params.sort[0] : params.sort;
  const category: Category | undefined = isCategory(categoryParam)
    ? categoryParam
    : undefined;
  const sort: OrganicSort = sortParam === "name" ? "name" : "default";

  const organic = getOrganicListings({ category, sort });
  const inventory = getSponsorInventory();
  const silverSlots = category
    ? [{ category, slot: inventory.silver[category] }]
    : CATEGORIES.map((item) => ({
        category: item,
        slot: inventory.silver[item],
      }));
  const bronze = bronzeForPage(inventory.bronze, category);

  return (
    <Container className="py-4 sm:py-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold">平台名錄</h1>
          <p className="mt-1 text-xs text-mute">
            18+ · 有機排序與誰付費無關
            {category ? ` · ${CATEGORY_LABEL[category]}` : ""}
          </p>
        </div>
        <p className="text-xs text-mute">{organic.length} 家平台</p>
      </div>

      <div className="mt-3">
        <CategoryFilters category={category} sort={sort} />
      </div>

      <div className="mt-4 space-y-3">
        <SilverPins slots={silverSlots} />
        <BronzeSlots slots={bronze} />
        <section>
          <p className="mb-1 text-[11px] font-semibold tracking-wide text-mute">
            有機結果 · 非付費
          </p>
          <div>
            {organic.map((listing) => (
              <OperatorListing key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
