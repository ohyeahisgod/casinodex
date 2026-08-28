import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "免責聲明",
};

export default function DisclaimerPage() {
  return (
    <Container className="py-10 sm:py-12">
      <h1 className="text-xl font-bold">免責聲明</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-mute">
        <p>
          CasinoDex 提供資訊與廣告刊登，不是博彩營運商，也不構成投資、投注或法律建議。平台資料、牌照與官網連結需自行核實，內容可能過時。
        </p>
        <p>
          使用任何第三方網站的風險由你自行承擔。部分司法管轄區禁止線上博彩；請遵守你所在地法律。
        </p>
        <p>未滿 18 歲（或當地法定年齡，以較高者為準）不得使用本站。</p>
      </div>
    </Container>
  );
}
