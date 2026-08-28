import Link from "next/link";
import { CategoryEntries } from "@/components/CategoryEntries";
import { GoldSlots } from "@/components/GoldSlots";
import { OperatorCard } from "@/components/OperatorCard";
import { Container } from "@/components/ui";
import { getShowcaseListings } from "@/lib/listings";
import { site } from "@/lib/site";
import { getSponsorInventory } from "@/lib/sponsors";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const featured = getShowcaseListings();
  const { gold } = getSponsorInventory();

  return (
    <>
      <div className="border-b border-line bg-bg-2">
        <Container className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3">
          <h1 className="text-lg font-bold text-paper sm:text-xl">
            {site.name}
            <span className="ml-2 text-sm font-medium text-mute">{site.nameZh}</span>
          </h1>
          <p className="text-xs text-mute">18+ 持牌平台名錄 · 我們不營運賭場</p>
        </Container>
      </div>

      <Container className="py-5 sm:py-6">
        <GoldSlots slots={gold} />

        <div className="mt-8">
          <CategoryEntries />
        </div>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-paper sm:text-lg">
                精選平台
              </h2>
              <p className="mt-0.5 text-xs text-mute">有機精選 · 非付費排序</p>
            </div>
            <Link
              href="/directory"
              className="text-sm font-semibold text-paper hover:underline"
            >
              看完整名錄
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <OperatorCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>

        <div className="mt-8 flex justify-center border-t border-line pt-6">
          <Link
            href="/directory"
            className="inline-flex items-center justify-center rounded-sm bg-paper px-8 py-3 text-sm font-bold text-bg hover:opacity-90"
          >
            看完整名錄
          </Link>
        </div>
      </Container>
    </>
  );
}
