import siteJson from "../../content/site.json";
import type { SiteConfig } from "./types";

export const site = siteJson as SiteConfig;

export const CONTACT_TOPICS = {
  sponsor: "贊助洽詢",
  partnership: "合作夥伴",
  other: "其他",
} as const;

export type ContactTopic = keyof typeof CONTACT_TOPICS;

export function isContactTopic(value: string | undefined): value is ContactTopic {
  return !!value && value in CONTACT_TOPICS;
}

/** Partnership inbox from content/site.json — never a personal mailbox. */
export function contactMailto(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return query
    ? `mailto:${site.contactEmail}?${query}`
    : `mailto:${site.contactEmail}`;
}

export const CATEGORY_LABEL: Record<string, string> = {
  casino: "娛樂城",
  sports: "體育",
  crypto: "加密",
};

export const CATEGORY_BLURB: Record<string, string> = {
  casino: "老虎機、真人荷官與原創遊戲等娛樂城產品。",
  sports: "體育與電競盤口、現場投注。",
  crypto: "以加密貨幣入出金為主的平台。",
};
