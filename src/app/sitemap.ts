import { listings } from "@/lib/listings";

export default function sitemap() {
  const base = "https://casinodex.com";
  const staticPaths = [
    "",
    "/directory",
    "/sponsors",
    "/about",
    "/legal/disclaimer",
    "/legal/responsible-gaming",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
    })),
    ...listings.map((listing) => ({
      url: `${base}/operators/${listing.slug}`,
      changeFrequency: "weekly" as const,
    })),
  ];
}
