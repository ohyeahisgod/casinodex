"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { Container } from "./ui";

const NAV = [
  { href: "/directory", label: "平台名錄" },
  { href: "/sponsors", label: "贊助方案" },
  { href: "/contact", label: "合作洽詢" },
  { href: "/about", label: "關於" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="border-b border-line bg-bg-2 px-3 py-1 text-center text-[11px] text-warn">
        18+ ｜ {site.tagline}
      </div>
      <Container className="flex items-center justify-between gap-4 py-2">
        <Link href="/" className="min-w-0 leading-tight">
          <span className="block text-base font-bold tracking-tight text-paper">
            {site.name}
          </span>
          <span className="block truncate text-[11px] text-mute">{site.nameZh}</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-mute md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-paper">
              {item.label}
            </Link>
          ))}
          <span className="rounded-sm border border-warn/50 px-1.5 py-0.5 text-[11px] font-bold text-warn">
            18+
          </span>
        </nav>
        <button
          type="button"
          className="rounded-sm border border-line px-3 py-1 text-sm md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          選單
        </button>
      </Container>
      {open ? (
        <div className="border-t border-line px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
