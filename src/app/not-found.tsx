import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="font-display text-3xl">找不到頁面</h1>
      <p className="mt-3 text-sm text-mute">這個網址不在 CasinoDex 名錄裡。</p>
      <Link href="/" className="mt-6 inline-block underline">
        回到首頁
      </Link>
    </Container>
  );
}
