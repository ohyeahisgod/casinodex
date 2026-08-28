import Link from "next/link";
import { contactMailto, site } from "@/lib/site";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-bg-2 text-sm">
      <Container className="grid gap-6 py-6 sm:grid-cols-3">
        <div>
          <p className="font-bold">{site.name}</p>
          <p className="mt-1 text-xs leading-5 text-mute">{site.description}</p>
        </div>
        <div>
          <p className="font-semibold">名錄</p>
          <div className="mt-2 flex flex-col gap-1.5 text-mute">
            <Link href="/directory">全部平台</Link>
            <Link href="/directory?category=casino">娛樂城</Link>
            <Link href="/directory?category=sports">體育</Link>
            <Link href="/directory?category=crypto">加密</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">CasinoDex</p>
          <div className="mt-2 flex flex-col gap-1.5 text-mute">
            <Link href="/sponsors">贊助方案</Link>
            <Link href="/contact">合作洽詢</Link>
            <Link href="/about">關於我們</Link>
            <Link href="/legal/disclaimer">免責聲明</Link>
            <Link href="/legal/responsible-gaming">負責任博彩</Link>
            <Link href="/admin">贊助檔位管理</Link>
            <a href={contactMailto()}>{site.contactEmail}</a>
          </div>
        </div>
      </Container>
      <div className="border-t border-line py-3 text-center text-[11px] text-mute">
        © {new Date().getFullYear()} CasinoDex · 18+ · 我們不是博彩營運商
      </div>
    </footer>
  );
}
