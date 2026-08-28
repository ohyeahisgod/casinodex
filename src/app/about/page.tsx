import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { contactMailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "關於我們",
};

export default function AboutPage() {
  return (
    <Container className="py-5 sm:py-6">
      <h1 className="text-xl font-bold sm:text-2xl">關於 {site.name}</h1>
      <div className="mt-4 max-w-2xl space-y-3 text-sm leading-6 text-mute">
        <p>
          CasinoDex 是亞洲市場導向的持牌線上博弈平台名錄與廣告媒介。我們列出第三方平台，並出售與有機排序分離的贊助檔位。
        </p>
        <p>
          我們不營運賭場、不接受投注、不處理玩家金流。外連指向各品牌官網。
        </p>
        <p>未持牌品牌不得上架。全站 18+。付費版位一律標示「贊助」。Gold 首頁三席預設空白。</p>
        <p>
          合作與贊助：{" "}
          <a className="text-paper underline" href={contactMailto()}>
            {site.contactEmail}
          </a>
        </p>
      </div>
    </Container>
  );
}
