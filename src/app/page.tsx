import Link from "next/link";
import { GoldSlots } from "@/components/GoldSlots";
import { OperatorCard } from "@/components/OperatorCard";
import { Container, SectionLabel } from "@/components/ui";
import { getOrganicListings } from "@/lib/listings";
import { site } from "@/lib/site";
import { getSponsorInventory } from "@/lib/sponsors";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const organic = getOrganicListings({ sort: "default" });
  const { gold } = getSponsorInventory();

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <p className="text-xs font-semibold tracking-[0.18em] text-warn uppercase">
            18+ · 名錄而非賭場
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-paper sm:text-5xl">
            {site.name}
            <span className="block text-2xl text-mute sm:text-3xl">
              {site.nameZh}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-mute sm:text-lg">
            {site.tagline}
            付費檔位一律標示「贊助」，絕不混入有機排序。僅列出持牌營運商。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/directory"
              className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-bg"
            >
              瀏覽平台名錄
            </Link>
            <Link
              href="/sponsors"
              className="rounded-full border border-line px-5 py-2.5 text-sm"
            >
              購買贊助檔位
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <GoldSlots slots={gold} />

        <section className="mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>有機名錄 · 非付費排序</SectionLabel>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                持牌平台一覽
              </h2>
            </div>
            <Link href="/directory" className="text-sm hover:underline">
              看完整名錄
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {organic.map((listing) => (
              <OperatorCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
