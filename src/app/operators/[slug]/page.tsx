import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { OutboundCta } from "@/components/OutboundCta";
import { ScoreMark } from "@/components/SponsorBadge";
import { Container } from "@/components/ui";
import { getListing, listings } from "@/lib/listings";
import { CATEGORY_LABEL } from "@/lib/site";

export function generateStaticParams() {
  return listings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/operators/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return { title: "找不到平台" };
  return {
    title: listing.name,
    description: listing.blurbZh,
  };
}

export default async function OperatorPage({
  params,
}: PageProps<"/operators/[slug]">) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  return (
    <Container className="py-10 sm:py-12">
      <p className="text-xs font-semibold tracking-[0.16em] text-warn uppercase">
        18+ · CasinoDex 不營運此平台
      </p>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        <BrandMark name={listing.name} slug={listing.slug} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-4xl">{listing.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-mute">
            {listing.categories.map((category) => (
              <Link
                key={category}
                href={`/directory?category=${category}`}
                className="rounded-full border border-line px-3 py-1 hover:text-paper"
              >
                {CATEGORY_LABEL[category]}
              </Link>
            ))}
            <ScoreMark score={listing.score} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-line bg-panel p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold">簡介</h2>
          <p className="mt-3 text-base leading-7 text-mute">{listing.blurbZh}</p>
        </article>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-panel p-5">
            <h2 className="text-sm font-semibold">牌照</h2>
            <p className="mt-2 text-sm text-mute">{listing.license.label}</p>
            {listing.license.authority ? (
              <p className="mt-1 text-sm text-mute">{listing.license.authority}</p>
            ) : null}
          </div>
          <div className="rounded-2xl border border-line bg-panel p-5">
            <h2 className="text-sm font-semibold">評分</h2>
            <p className="mt-2 text-sm text-mute">目前尚未評分，顯示為「待評分」。</p>
          </div>
          {listing.officialUrl ? (
            <OutboundCta
              href={listing.officialUrl}
              sponsored={false}
              className="flex w-full items-center justify-center rounded-full bg-paper px-4 py-3 text-sm font-semibold text-bg"
            >
              前往官網
            </OutboundCta>
          ) : null}
          <p className="text-xs leading-5 text-mute">
            外連為第三方網站。CasinoDex 不處理金流、不接受投注。未滿 18 歲不得使用。
          </p>
        </aside>
      </div>
    </Container>
  );
}
