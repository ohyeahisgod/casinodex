import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "負責任博彩",
};

export default function ResponsibleGamingPage() {
  return (
    <Container className="py-10 sm:py-12">
      <h1 className="text-xl font-bold">負責任博彩</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-mute">
        <p>
          博弈可能令人成癮。CasinoDex 只提供名錄與廣告，請把博彩當成娛樂、設定上限，並在需要時求助。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>未滿 18 歲不得進入本站或第三方博彩網站。</li>
          <li>
            國際資源：{" "}
            <a className="underline" href="https://www.begambleaware.org/">
              BeGambleAware
            </a>
          </li>
          <li>
            台灣協助可洽各縣市衛生局或尋求專業成癮諮詢。
          </li>
        </ul>
      </div>
    </Container>
  );
}
