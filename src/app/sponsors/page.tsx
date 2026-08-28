import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui";
import { contactMailto, site } from "@/lib/site";
import { getSponsorInventory, usdPerMonth } from "@/lib/sponsors";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "贊助方案",
  description: "CasinoDex Gold / Silver / Bronze 贊助檔位價目與庫存。",
};

export default function SponsorsPage() {
  const { config, gold, silver, bronze } = getSponsorInventory();
  const goldFilled = gold.filter((slot) => slot.filled).length;
  const silverFilled = Object.values(silver).filter((slot) => slot.filled).length;
  const bronzeFilled = bronze.filter((slot) => slot.filled).length;

  return (
    <Container className="py-5 sm:py-6">
      <p className="text-xs font-bold text-gold">廣告庫存 · 一律標示「贊助」</p>
      <h1 className="mt-1 text-xl font-bold sm:text-2xl">贊助方案</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">
        出售獨立廣告檔位，不出售有機排名。Gold 三席預設全空。洽詢
        <a className="ml-1 underline" href={contactMailto("贊助洽詢")}>
          {site.contactEmail}
        </a>
        。
      </p>

      <div className="mt-5 grid gap-px bg-line lg:grid-cols-3">
        <article className="bg-bg p-4">
          <p className="text-xs font-bold text-gold">Gold</p>
          <h2 className="mt-1 text-lg font-bold">本週熱門</h2>
          <p className="mt-1 text-base font-semibold">
            {usdPerMonth(config.gold.priceUsdPerMonth)}
          </p>
          <p className="mt-2 text-sm text-mute">
            首頁固定 3 席。已售 {goldFilled} / 3。空席保持招租，不會用品牌自動補上。
          </p>
        </article>
        <article className="bg-bg p-4">
          <p className="text-xs font-bold text-gold">Silver</p>
          <h2 className="mt-1 text-lg font-bold">分類置頂</h2>
          <p className="mt-1 text-base font-semibold">
            {usdPerMonth(config.silver.priceUsdPerMonth)}
          </p>
          <p className="mt-2 text-sm text-mute">
            娛樂城 / 體育 / 加密各 1 席置頂。已售 {silverFilled} / 3。
          </p>
        </article>
        <article className="bg-bg p-4">
          <p className="text-xs font-bold text-gold">Bronze</p>
          <h2 className="mt-1 text-lg font-bold">精選列</h2>
          <p className="mt-1 text-base font-semibold">
            {usdPerMonth(config.bronze.priceUsdPerMonth)}
          </p>
          <p className="mt-2 text-sm text-mute">
            列表高亮 +「精選」，每頁最多 6 席。已售 {bronzeFilled} / 6。
          </p>
        </article>
      </div>

      <div className="mt-6 max-w-xl border border-line bg-panel p-4">
        <h2 className="text-lg font-bold">贊助洽詢</h2>
        <p className="mt-1 text-sm text-mute">
          收件為 {site.contactEmail}。
        </p>
        <div className="mt-4">
          <ContactForm defaultTopic="sponsor" />
        </div>
      </div>

      <p className="mt-6 text-sm text-mute">
        業務指派請編輯 content/sponsors.json 或使用{" "}
        <Link href="/admin" className="underline">
          贊助檔位管理
        </Link>
        。
      </p>
    </Container>
  );
}
