export function SponsorBadge({ extra }: { extra?: string }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-gold/50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">
      贊助
      {extra ? <span className="ml-1 font-semibold text-gold/80">· {extra}</span> : null}
    </span>
  );
}
