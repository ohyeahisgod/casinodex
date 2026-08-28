import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-3 sm:px-4 ${className}`}>
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
      className={`text-[11px] font-semibold tracking-wide ${
        tone === "sponsor" ? "text-gold" : "text-mute"
      }`}
    >
      {children}
    </p>
  );
}
