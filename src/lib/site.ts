import siteJson from "../../content/site.json";
import type { SiteConfig } from "./types";

export const site = siteJson as SiteConfig;

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
