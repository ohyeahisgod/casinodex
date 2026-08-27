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
    <Container className="py-10 sm:py-12">
      <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
        廣告庫存 · 一律標示「贊助」
      </p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl">贊助方案</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        CasinoDex 出售獨立廣告檔位，不出售有機排名。Gold 三席預設全空，留給業務銷售。
        贊助洽詢請用合作信箱
        <a className="ml-1 underline" href={contactMailto("贊助洽詢")}>
          {site.contactEmail}
        </a>
        ，或填下方表單。請勿寄到個人 Gmail。
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-gold/40 bg-gold-soft p-5">
          <p className="text-sm text-gold">Gold</p>
          <h2 className="mt-2 font-display text-2xl">本週熱門</h2>
          <p className="mt-2 text-xl font-semibold">
            {usdPerMonth(config.gold.priceUsdPerMonth)}
          </p>
          <p className="mt-3 text-sm leading-6 text-mute">
            首頁固定 3 席。已售 {goldFilled} / 3。空席保持招租卡片，不會用品牌自動補上。
          </p>
        </article>
        <article className="rounded-2xl border border-gold/40 bg-gold-soft p-5">
          <p className="text-sm text-gold">Silver</p>
          <h2 className="mt-2 font-display text-2xl">分類置頂</h2>
          <p className="mt-2 text-xl font-semibold">
            {usdPerMonth(config.silver.priceUsdPerMonth)}
          </p>
          <p className="mt-3 text-sm leading-6 text-mute">
            娛樂城 / 體育 / 加密各 1 席置頂。已售 {silverFilled} / 3。
          </p>
        </article>
        <article className="rounded-2xl border border-gold/40 bg-gold-soft p-5">
          <p className="text-sm text-gold">Bronze</p>
          <h2 className="mt-2 font-display text-2xl">精選列</h2>
          <p className="mt-2 text-xl font-semibold">
            {usdPerMonth(config.bronze.priceUsdPerMonth)}
          </p>
          <p className="mt-3 text-sm leading-6 text-mute">
            列表高亮 +「精選」標籤，每頁最多 6 席。已售 {bronzeFilled} / 6。
          </p>
        </article>
      </div>

      <div className="mt-10 max-w-xl rounded-2xl border border-gold/40 bg-gold-soft p-5">
        <h2 className="font-display text-2xl">贊助洽詢</h2>
        <p className="mt-2 text-sm leading-6 text-mute">
          收件地址來自 <code className="text-paper">content/site.json</code> 的{" "}
          <code className="text-paper">contactEmail</code>，目前是 {site.contactEmail}。
        </p>
        <div className="mt-5">
          <ContactForm defaultTopic="sponsor" />
        </div>
      </div>

      <p className="mt-8 text-sm text-mute">
        業務指派檔位請編輯 <code className="text-paper">content/sponsors.json</code>{" "}
        或使用{" "}
        <Link href="/admin" className="underline">
          贊助檔位管理
        </Link>
        。價格與開關都在同一份設定檔。
      </p>
    </Container>
  );
}
