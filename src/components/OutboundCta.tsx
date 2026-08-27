import { outboundRel } from "@/lib/format";

export function OutboundCta({
  href,
  sponsored,
  children,
  className = "",
}: {
  href: string;
  sponsored: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel={outboundRel(sponsored)}
      className={className}
    >
      {children}
    </a>
  );
}
