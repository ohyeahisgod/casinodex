import Link from "next/link";
import { GoldSlots } from "@/components/GoldSlots";
import { OperatorListing } from "@/components/OperatorListing";
import { Container } from "@/components/ui";
import { getOrganicListings } from "@/lib/listings";
import { site } from "@/lib/site";
import { getSponsorInventory } from "@/lib/sponsors";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const organic = getOrganicListings({ sort: "default" });
  const { gold } = getSponsorInventory();

  return (
    <>
      <div className="border-b border-line bg-bg-2">
        <Container className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3">
          <h1 className="text-lg font-bold text-paper sm:text-xl">
            {site.name}
            <span className="ml-2 text-sm font-medium text-mute">{site.nameZh}</span>
          </h1>
          <p className="text-xs text-mute">
            18+ 持牌平台名錄 · 我們不營運賭場
          </p>
        </Container>
      </div>

      <Container className="py-3">
        <GoldSlots slots={gold} />

        <section className="mt-4">
          <div className="flex items-baseline justify-between gap-3 border-b border-line pb-1">
            <h2 className="text-sm font-bold text-paper">
              有機名錄
              <span className="ml-2 text-xs font-medium text-mute">
                {organic.length} 家 · 非付費排序
              </span>
            </h2>
            <Link href="/directory" className="text-xs text-mute hover:text-paper">
              篩選名錄
            </Link>
          </div>
          <div>
            {organic.map((listing) => (
              <OperatorListing key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
