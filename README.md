# CasinoDex

Asia-focused **licensed** online-casino directory and ad inventory. Traditional Chinese UI, English brand names.

CasinoDex does **not** operate a casino, accept bets, or move player funds. We list third-party licensed platforms and sell labeled sponsor slots.

Repository: [ohyeahisgod/casinodex](https://github.com/ohyeahisgod/casinodex)

## Product rules

- Licensed operators only. Do not add unlicensed brands.
- Entire site is 18+. Age gate + persistent 18+ notice.
- Paid placements always show **贊助**. They never affect organic ranking.
- Scores stay `null` until a real review exists. The UI does **not** show empty 「待評分」 chips.
- Gold homepage seats ship **empty** (3 quiet 「本週熱門·贊助席位」 placeholders).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4. Production hosting is Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`), not a static export and not `@cloudflare/next-on-pages`.

CMS-style data lives in JSON so listings and ads can be filled without touching React:

| File | Purpose |
| --- | --- |
| `content/listings.json` | Operator directory |
| `content/sponsors.json` | Gold / Silver / Bronze inventory, prices, on/off, assigned slug |
| `content/site.json` | Site name, tagline, **partnership email** (`contactEmail`) |

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; enables /admin writes
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Confirm you are 18+.

```bash
npm test      # organic vs paid separation
npm run build
npm start
```

## Deploy to Cloudflare

The app stays a full Next.js App Router site. OpenNext adapts `next build` for Workers.

1. Log in to Cloudflare once on this machine:

```bash
npx wrangler login
```

2. Build and deploy:

```bash
npm run deploy
```

`npm run deploy` runs `opennextjs-cloudflare build` then `opennextjs-cloudflare deploy`. The Worker name is `casinodex` in `wrangler.jsonc`. Wrangler prints a `*.workers.dev` URL after a successful deploy. Custom domains are attached in the Cloudflare dashboard, not in this repo.

Other scripts:

| Script | Purpose |
| --- | --- |
| `npm run build` | Local Next.js production build (unchanged) |
| `npm run cf:build` | OpenNext Worker build only |
| `npm run preview` | OpenNext build + local Workers runtime preview |
| `npm run cf-typegen` | Generate `cloudflare-env.d.ts` from Wrangler config |

Do not commit secrets. Keep `.dev.vars` and `.env.local` out of git (copy `.dev.vars.example` for local Wrangler preview).

## How to fill a listing

Edit `content/listings.json`. Each operator needs:

```json
{
  "slug": "stake",
  "name": "Stake",
  "logo": "/logos/stake.svg",
  "taglineZh": "一行繁中賣點",
  "blurbZh": "短簡介，每家都要不同",
  "categories": ["casino", "sports", "crypto"],
  "license": {
    "label": "持牌資訊待核實",
    "authority": null,
    "licenseId": null
  },
  "score": null,
  "officialUrl": "https://stake.com"
}
```

Rules:

- `name` stays the official English brand.
- `logo` is a file in `public/logos/` (never a hotlinked URL). Sources: `content/logos-sources.md`.
- `taglineZh` is one unique Traditional Chinese line for the listing row.
- `categories` is any of `casino` (娛樂城), `sports` (體育), `crypto` (加密).
- Keep `score` as `null` until a real review exists — do not invent scores or show empty score chips.
- Replace the license placeholder after you verify the licence. Unlicensed brands must not be added.
- Detail pages are generated from `slug` at `/operators/<slug>`.
- Organic order is file order (`sort=default`) or English name (`sort=name`). Payment never changes this list.

## How to sell / assign a sponsor slot

All prices and seats are in **one** file: `content/sponsors.json`.

Opening inventory:

| Tier | Where | Seats | Price |
| --- | --- | --- | --- |
| Gold | Homepage 「本週熱門」 | exactly 3 | $1,200 / month |
| Silver | Pin at top of Casino / Sports / Crypto lists | 1 per category | $600 / month |
| Bronze | Highlighted row + 「精選」 on listing pages | max 6 per page | $250 / month |

A seat is shown as filled **only** when `enabled` is `true` **and** `listingSlug` matches a listing. Otherwise it stays an empty 「贊助」 card. CasinoDex never auto-fills Gold (or any tier) with brands.

### Option A — JSON (production)

```json
{
  "id": "gold-1",
  "enabled": true,
  "listingSlug": "stake"
}
```

Set `enabled` to `false` or `listingSlug` to `null` to turn the seat off. Change `priceUsdPerMonth` in the same file when you revise the rate card.

Commit and deploy. No React copy changes required.

### Option B — environment variables

These override JSON. A slot still needs **both** `ENABLED=true` and a valid `SLUG`.

```bash
SPONSOR_GOLD_1_ENABLED=true
SPONSOR_GOLD_1_SLUG=stake
SPONSOR_SILVER_CASINO_ENABLED=true
SPONSOR_SILVER_CASINO_SLUG=roobet
SPONSOR_BRONZE_1_ENABLED=true
SPONSOR_BRONZE_1_SLUG=shuffle
```

Gold 2/3, other Silver categories, and Bronze 2–6 follow the same pattern. See `.env.example`.

### Option C — `/admin`

1. Set `ADMIN_PASSWORD` in `.env.local`.
2. Open `/admin`, sign in, assign slugs, toggle 開啟, save.
3. Locally this writes `content/sponsors.json`. On serverless hosts the write is not durable — copy the JSON back into git or use env vars.

Paid and organic stay separate in the UI: gold rail / silver pins / bronze highlights are labeled 贊助; the directory below is the unpaid list.

## Partnership / contact email

One field: `contactEmail` in `content/site.json`. Footer, sponsor inquiry, and the contact form all read it. Change that value to change the public address later.

Current address: **casinodex@agentmail.to** (AgentMail). Do not use a personal Gmail or any other personal mailbox.

## Pages

- `/` — compact 18+ header, 3 empty Gold seats, dense organic directory of the 14 brands
- `/directory` — category filters, quiet Silver/Bronze inventory, organic results
- `/operators/[slug]` — large logo, name, short blurb, license, official-site CTA
- `/sponsors` — rate card + 贊助洽詢 form
- `/contact` — partnership / sponsor contact form (mailto the AgentMail inbox)
- `/admin` — assign Gold / Silver / Bronze
- `/about`, `/legal/disclaimer`, `/legal/responsible-gaming`

## First 14 listings

Stake, BC.Game, 1xBet, Roobet, Cloudbet, Rollbit, GG.BET, 22Bet, 1win, Gamdom, Shuffle, Rainbet, 7Bit, BetFury.

Official URLs are best-effort and should be re-checked before publishing.
