import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OperatorLogo } from "@/components/OperatorLogo";
import { OutboundCta } from "@/components/OutboundCta";
import { Container } from "@/components/ui";
import { getListing, listings } from "@/lib/listings";
import { CATEGORY_LABEL, contactMailto, site } from "@/lib/site";

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
    description: listing.taglineZh,
  };
}

export default async function OperatorPage({
  params,
}: PageProps<"/operators/[slug]">) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  return (
    <Container className="py-5 sm:py-6">
      <p className="text-xs text-warn">18+ · CasinoDex 不營運此平台</p>

      <div className="mt-3 flex gap-4">
        <OperatorLogo listing={listing} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold sm:text-3xl">{listing.name}</h1>
          <p className="mt-1 text-sm text-mute">{listing.taglineZh}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {listing.categories.map((category) => (
              <Link
                key={category}
                href={`/directory?category=${category}`}
                className="rounded-sm border border-line px-2 py-0.5 text-xs text-mute hover:text-paper"
              >
                {CATEGORY_LABEL[category]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="border border-line bg-panel p-4">
          <h2 className="text-xs font-semibold tracking-wide text-mute">簡介</h2>
          <p className="mt-2 text-sm leading-6 text-paper">{listing.blurbZh}</p>
        </div>
        <aside className="space-y-3">
          <div className="border border-line bg-panel p-4">
            <h2 className="text-xs font-semibold tracking-wide text-mute">牌照</h2>
            <p className="mt-1 text-sm">{listing.license.label}</p>
            {listing.license.authority ? (
              <p className="mt-1 text-sm text-mute">{listing.license.authority}</p>
            ) : null}
            {listing.license.licenseId ? (
              <p className="mt-1 font-mono text-xs text-mute">
                {listing.license.licenseId}
              </p>
            ) : null}
          </div>
          {listing.officialUrl ? (
            <OutboundCta
              href={listing.officialUrl}
              sponsored={false}
              className="flex w-full items-center justify-center rounded-sm bg-play px-4 py-3 text-sm font-bold text-white"
            >
              前往官網
            </OutboundCta>
          ) : null}
          <p className="text-xs leading-5 text-mute">
            外連為第三方網站。CasinoDex 不處理金流、不接受投注。未滿 18 歲不得使用。
            合作：{" "}
            <a className="text-paper underline" href={contactMailto()}>
              {site.contactEmail}
            </a>
          </p>
        </aside>
      </div>
    </Container>
  );
}
