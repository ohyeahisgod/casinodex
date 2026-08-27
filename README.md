# CasinoDex

Asia-focused **licensed** online-casino directory and ad inventory. Traditional Chinese UI, English brand names.

CasinoDex does **not** operate a casino, accept bets, or move player funds. We list third-party licensed platforms and sell labeled sponsor slots.

Repository: [ohyeahisgod/casinodex](https://github.com/ohyeahisgod/casinodex)

## Product rules

- Licensed operators only. Do not add unlicensed brands.
- Entire site is 18+. Age gate + persistent 18+ notice.
- Paid placements always show **贊助**. They never affect organic ranking.
- Scores are empty for now (`null` → 「待評分」).
- Gold homepage seats ship **empty** (3 vacant 「本週熱門」 cards).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4.

CMS-style data lives in JSON so listings and ads can be filled without touching React:

| File | Purpose |
| --- | --- |
| `content/listings.json` | Operator directory |
| `content/sponsors.json` | Gold / Silver / Bronze inventory, prices, on/off, assigned slug |
| `content/site.json` | Site name, tagline, sales email |

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

## How to fill a listing

Edit `content/listings.json`. Each operator needs:

```json
{
  "slug": "stake",
  "name": "Stake",
  "blurbZh": "繁體中文簡介（可先占位）",
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
- `categories` is any of `casino` (娛樂城), `sports` (體育), `crypto` (加密).
- Keep `score` as `null` until a real review exists.
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

## Pages

- `/` — 18+ notice, hero, 3 empty Gold seats, organic preview of the 14 brands
- `/directory` — category filters, Silver pins, Bronze highlights, organic results
- `/operators/[slug]` — detail, license placeholder, empty score, official-site CTA
- `/sponsors` — rate card
- `/admin` — assign Gold / Silver / Bronze
- `/about`, `/legal/disclaimer`, `/legal/responsible-gaming`

## First 14 listings

Stake, BC.Game, 1xBet, Roobet, Cloudbet, Rollbit, GG.BET, 22Bet, 1win, Gamdom, Shuffle, Rainbet, 7Bit, BetFury.

Official URLs are best-effort and should be re-checked before publishing.
