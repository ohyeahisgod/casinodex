import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { contactMailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "關於我們",
};

export default function AboutPage() {
  return (
    <Container className="py-10 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl">關於 {site.name}</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-mute">
        <p>
          CasinoDex 是亞洲市場導向的<strong className="text-paper">持牌線上博弈平台名錄</strong>
          與廣告媒介。我們列出第三方平台、核對牌照欄位（目前為待核實占位），並出售與有機排序分離的贊助檔位。
        </p>
        <p>
          我們<strong className="text-paper">不營運賭場</strong>、不接受投注、不處理玩家金流、不提供遊戲。外連指向各品牌官網，並加上 nofollow / sponsored 等屬性。
        </p>
        <p>
          未持牌品牌不得上架。全站 18+。付費版位一律標示「贊助」，Gold 首頁三席預設空白，留給銷售而不是用品牌自動填滿。
        </p>
        <p>
          合作與贊助請寄{" "}
          <a className="text-paper underline" href={contactMailto()}>
            {site.contactEmail}
          </a>
          ，或使用網站洽詢表單。這是 CasinoDex 的 AgentMail 信箱，不是個人 Gmail。
        </p>
      </div>
    </Container>
  );
}
