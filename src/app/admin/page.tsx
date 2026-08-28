import type { Metadata } from "next";
import { listings } from "@/lib/listings";
import { getSponsorInventory } from "@/lib/sponsors";
import { CATEGORY_LABEL, site } from "@/lib/site";
import { Container } from "@/components/ui";
import { isAdminAuthed, loginAdmin, logoutAdmin, saveSponsors } from "./actions";
import type { Category, ResolvedSlot } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "贊助檔位管理",
};

function SlotFields({
  prefix,
  label,
  slot,
  authed,
}: {
  prefix: string;
  label: string;
  slot: ResolvedSlot;
  authed: boolean;
}) {
  return (
    <div className="grid gap-3 rounded-sm border border-line bg-panel p-4 sm:grid-cols-[1fr_2fr_auto] sm:items-center">
      <p className="text-sm font-medium">{label}</p>
      <label className="text-sm text-mute">
        品牌
        <select
          name={`${prefix}-slug`}
          defaultValue={slot.listingSlug ?? ""}
          disabled={!authed}
          className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-paper disabled:opacity-60"
        >
          <option value="">（空席）</option>
          {listings.map((listing) => (
            <option key={listing.slug} value={listing.slug}>
              {listing.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name={`${prefix}-enabled`}
          defaultChecked={slot.enabled}
          disabled={!authed}
        />
        開啟
      </label>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: PageProps<"/admin">) {
  const params = await searchParams;
  const authed = await isAdminAuthed();
  const inventory = getSponsorInventory();
  const error = params.error;
  const saved = params.saved;
  const canWrite = Boolean(process.env.ADMIN_PASSWORD);

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="text-xl font-bold">贊助檔位管理</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        Gold / Silver / Bronze 都在這裡指派。預設三席 Gold 全空。沒有程式改動也能改文案與開關：編輯
        <code className="mx-1 text-paper">content/sponsors.json</code>
        或設定環境變數。寫入此表單需 <code className="text-paper">ADMIN_PASSWORD</code>。
      </p>

      {error ? (
        <p className="mt-4 text-sm text-danger">密碼不正確或尚未設定管理密碼。</p>
      ) : null}
      {saved ? (
        <p className="mt-4 text-sm text-gold">已寫入 content/sponsors.json。</p>
      ) : null}

      {!authed && canWrite ? (
        <form action={loginAdmin} className="mt-6 max-w-sm space-y-3">
          <label className="block text-sm">
            管理密碼
            <input
              type="password"
              name="password"
              className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2"
            />
          </label>
          <button className="rounded-sm bg-play px-4 py-2 text-sm font-bold text-white">
            登入
          </button>
        </form>
      ) : null}

      {!canWrite ? (
        <p className="mt-4 text-sm text-warn">
          未設定 ADMIN_PASSWORD，表單為唯讀。請改 JSON 或在 .env.local 設定密碼後即可在本機寫入。
        </p>
      ) : null}

      <form action={saveSponsors} className="mt-8 space-y-10">
        <section>
          <h2 className="text-lg font-bold">Gold · 本週熱門</h2>
          <label className="mt-3 block text-sm text-mute">
            月費 USD
            <input
              name="goldPrice"
              type="number"
              defaultValue={inventory.config.gold.priceUsdPerMonth}
              disabled={!authed}
              className="mt-1 w-40 rounded-lg border border-line bg-bg px-3 py-2 text-paper"
            />
          </label>
          <div className="mt-4 grid gap-3">
            {inventory.gold.map((slot, index) => (
              <SlotFields
                key={slot.id}
                prefix={`gold-${index + 1}`}
                label={`Gold ${index + 1}`}
                slot={slot}
                authed={authed}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold">Silver · 分類置頂</h2>
          <label className="mt-3 block text-sm text-mute">
            月費 USD
            <input
              name="silverPrice"
              type="number"
              defaultValue={inventory.config.silver.priceUsdPerMonth}
              disabled={!authed}
              className="mt-1 w-40 rounded-lg border border-line bg-bg px-3 py-2 text-paper"
            />
          </label>
          <div className="mt-4 grid gap-3">
            {CATEGORIES.map((category: Category) => (
              <SlotFields
                key={category}
                prefix={`silver-${category}`}
                label={`Silver · ${CATEGORY_LABEL[category]}`}
                slot={inventory.silver[category]}
                authed={authed}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold">Bronze · 精選</h2>
          <label className="mt-3 block text-sm text-mute">
            月費 USD
            <input
              name="bronzePrice"
              type="number"
              defaultValue={inventory.config.bronze.priceUsdPerMonth}
              disabled={!authed}
              className="mt-1 w-40 rounded-lg border border-line bg-bg px-3 py-2 text-paper"
            />
          </label>
          <div className="mt-4 grid gap-3">
            {inventory.bronze.map((slot, index) => (
              <SlotFields
                key={slot.id}
                prefix={`bronze-${index + 1}`}
                label={`Bronze ${index + 1}`}
                slot={slot}
                authed={authed}
              />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            disabled={!authed}
            className="rounded-sm bg-play px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40"
          >
            儲存指派
          </button>
          {authed ? (
            <button formAction={logoutAdmin} className="rounded-sm border border-line px-5 py-2.5 text-sm">
              登出
            </button>
          ) : null}
        </div>
      </form>

      <p className="mt-8 text-xs leading-5 text-mute">
        無伺服器部署時，檔案寫入不會持久化。正式環境請把更新後的 JSON 提交進{" "}
        {site.name} 儲存庫，或改用環境變數覆蓋檔位。
      </p>
    </Container>
  );
}
