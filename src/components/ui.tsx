import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

export function SectionLabel({
  children,
  tone = "organic",
}: {
  children: ReactNode;
  tone?: "organic" | "sponsor";
}) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.16em] uppercase ${
        tone === "sponsor" ? "text-gold" : "text-mute"
      }`}
    >
      {children}
    </p>
  );
}
