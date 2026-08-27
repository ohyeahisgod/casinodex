import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-bg-2">
      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg">{site.name}</p>
          <p className="mt-2 text-sm leading-6 text-mute">{site.description}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">名錄</p>
          <div className="mt-3 flex flex-col gap-2 text-mute">
            <Link href="/directory">全部平台</Link>
            <Link href="/directory?category=casino">娛樂城</Link>
            <Link href="/directory?category=sports">體育</Link>
            <Link href="/directory?category=crypto">加密</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">CasinoDex</p>
          <div className="mt-3 flex flex-col gap-2 text-mute">
            <Link href="/sponsors">贊助方案</Link>
            <Link href="/about">關於我們</Link>
            <Link href="/legal/disclaimer">免責聲明</Link>
            <Link href="/legal/responsible-gaming">負責任博彩</Link>
            <Link href="/admin">贊助檔位管理</Link>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </div>
        </div>
      </Container>
      <div className="border-t border-line py-4 text-center text-xs text-mute">
        © {new Date().getFullYear()} CasinoDex · 18+ · 我們不是博彩營運商
      </div>
    </footer>
  );
}
