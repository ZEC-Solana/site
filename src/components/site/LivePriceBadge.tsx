import { useQuery } from "@tanstack/react-query";

import { marketQueryOptions } from "@/lib/market-query";
import { formatPercent, formatUsd, TOKEN } from "@/lib/token";

export function LivePriceBadge() {
  const { data } = useQuery(marketQueryOptions);
  const change = data?.change24h ?? null;
  const up = (change ?? 0) >= 0;

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: "var(--positive)" }}
        aria-hidden
      />
      <span className="font-medium text-muted-foreground">{TOKEN.symbol}</span>
      <span className="tabular font-semibold">{formatUsd(data?.priceUsd)}</span>
      <span
        className="tabular font-medium"
        style={{ color: up ? "var(--positive)" : "var(--negative)" }}
      >
        {formatPercent(change)}
      </span>
    </div>
  );
}
