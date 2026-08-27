export function SponsorBadge({
  extra,
}: {
  extra?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold-soft px-2 py-0.5 text-[11px] font-semibold tracking-wide text-gold">
      贊助
      {extra ? <span className="text-gold/80">· {extra}</span> : null}
    </span>
  );
}

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[11px] font-semibold text-gold">
      精選
    </span>
  );
}

export function ScoreMark({ score }: { score: number | null }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-bg-2 px-2 py-1 text-xs text-mute">
      {score === null || score === undefined ? "待評分" : score}
    </span>
  );
}
