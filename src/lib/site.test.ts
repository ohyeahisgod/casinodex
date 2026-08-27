import assert from "node:assert/strict";
import { test } from "node:test";
import { contactMailto, site } from "./site";

test("partnership email lives in one config and is not a personal Gmail", () => {
  assert.equal(site.contactEmail, "casinodex@agentmail.to");
  assert.equal(site.contactEmail.includes("@gmail."), false);
  assert.equal(contactMailto().startsWith(`mailto:${site.contactEmail}`), true);
  assert.match(
    contactMailto("贊助洽詢", "hello"),
    /^mailto:casinodex@agentmail\.to\?/,
  );
});
