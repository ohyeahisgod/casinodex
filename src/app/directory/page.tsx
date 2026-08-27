import type { Metadata } from "next";
import { BronzeSlots } from "@/components/BronzeSlots";
import { CategoryFilters } from "@/components/CategoryFilters";
import { OperatorRow } from "@/components/OperatorRow";
import { SilverPins } from "@/components/SilverPins";
import { Container, SectionLabel } from "@/components/ui";
import { getOrganicListings, isCategory } from "@/lib/listings";
import { CATEGORY_LABEL } from "@/lib/site";
import {
  bronzeForPage,
  getSponsorInventory,
} from "@/lib/sponsors";
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
    <Container className="py-10 sm:py-12">
      <p className="text-xs font-semibold tracking-[0.16em] text-warn uppercase">
        18+ 名錄
      </p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl">平台名錄</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        有機結果依名稱或預設順序排列，與誰付費無關。評分欄位目前為「待評分」。
        {category
          ? `目前篩選：${CATEGORY_LABEL[category]}。`
          : "可依娛樂城、體育、加密篩選。"}
      </p>

      <div className="mt-6">
        <CategoryFilters category={category} sort={sort} />
      </div>

      <div className="mt-10 space-y-10">
        <SilverPins slots={silverSlots} />
        <BronzeSlots slots={bronze} />

        <section>
          <SectionLabel>有機結果 · 非付費</SectionLabel>
          <p className="mt-2 text-sm text-mute">{organic.length} 個平台</p>
          <div className="mt-4 grid gap-3">
            {organic.map((listing) => (
              <OperatorRow key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
