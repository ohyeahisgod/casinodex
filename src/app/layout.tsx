import type { Metadata } from "next";
import { Newsreader, Noto_Sans_TC } from "next/font/google";
import { AgeGate } from "@/components/AgeGate";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Noto_Sans_TC({
  variable: "--font-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name}｜${site.nameZh}`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-paper">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <AgeGate />
      </body>
    </html>
  );
}
