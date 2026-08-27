import { initials, toneForSlug } from "@/lib/format";

export function BrandMark({
  name,
  slug,
  size = "md",
}: {
  name: string;
  slug: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "lg" ? "h-16 w-16 text-xl" : size === "sm" ? "h-9 w-9 text-xs" : "h-12 w-12 text-sm";

  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-xl font-semibold text-paper ${dim}`}
      style={{ background: toneForSlug(slug) }}
    >
      {initials(name)}
    </span>
  );
}
