export function outboundRel(sponsored: boolean): string {
  return sponsored
    ? "sponsored nofollow noopener noreferrer"
    : "nofollow noopener noreferrer";
}

export function initials(name: string): string {
  const parts = name.replace(/[._]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const PALETTE = [
  "#2a3d4f",
  "#3a3348",
  "#2f3f38",
  "#43362c",
  "#24364a",
  "#3b2f32",
];

export function toneForSlug(slug: string): string {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
