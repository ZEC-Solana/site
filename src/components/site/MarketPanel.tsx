import { useQuery } from "@tanstack/react-query";

import { marketQueryOptions } from "@/lib/market-query";
import {
  formatCompactUsd,
  formatNumber,
  formatPercent,
  formatUsd,
  TOKEN,
} from "@/lib/token";

function Delta({ value }: { value: number | null }) {
  const up = (value ?? 0) >= 0;
  return (
    <span
      className="tabular text-sm font-semibold"
      style={{ color: up ? "var(--positive)" : "var(--negative)" }}
    >
      {formatPercent(value)}
    </span>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="surface-card p-5">
      <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">{label}</p>
      <p className="tabular mt-2 text-xl font-bold md:text-2xl">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function MarketPanel({ showPairs = true }: { showPairs?: boolean }) {
  const { data, isFetching, dataUpdatedAt, refetch } = useQuery(marketQueryOptions);

  return (
    <div className="space-y-6">
      <div className="surface-card overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-6 p-6">
          <div>
            <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
              {TOKEN.symbol} / USD · liquidity-weighted across {formatNumber(data?.pairCount ?? 0)}{" "}
              pools
            </p>
            <div className="mt-2 flex items-end gap-3">
              <p className="tabular text-4xl font-bold md:text-5xl">{formatUsd(data?.priceUsd)}</p>
              <Delta value={data?.change24h ?? null} />
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              Updated{" "}
              {dataUpdatedAt
                ? new Date(dataUpdatedAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "—"}{" "}
              · auto-refresh 30s
            </span>
            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-md border border-border px-3 py-1.5 font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {isFetching ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
          {(
            [
              ["5 min", data?.change5m ?? null],
              ["1 hour", data?.change1h ?? null],
              ["6 hours", data?.change6h ?? null],
              ["24 hours", data?.change24h ?? null],
            ] as const
          ).map(([label, value], i) => (
            <div
              key={label}
              className={`p-5 ${i < 3 ? "border-border md:border-r" : ""} ${i % 2 === 0 ? "border-r border-border md:border-r" : ""}`}
            >
              <p className="text-xs text-muted-foreground">{label}</p>
              <div className="mt-1">
                <Delta value={value} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Market cap" value={formatCompactUsd(data?.marketCap)} hint="Deepest pool" />
        <Stat label="24h volume" value={formatCompactUsd(data?.volume24h)} hint="All pools" />
        <Stat label="Liquidity" value={formatCompactUsd(data?.liquidityUsd)} hint="All pools" />
        <Stat
          label="24h trades"
          value={formatNumber((data?.buys24h ?? 0) + (data?.sells24h ?? 0))}
          hint={`${formatNumber(data?.buys24h)} buys · ${formatNumber(data?.sells24h)} sells`}
        />
      </div>

      {showPairs && (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <th className="px-5 py-3 font-medium">Exchange</th>
                <th className="px-5 py-3 font-medium">Pair</th>
                <th className="px-5 py-3 text-right font-medium">Price</th>
                <th className="px-5 py-3 text-right font-medium">24h</th>
                <th className="px-5 py-3 text-right font-medium">Liquidity</th>
                <th className="px-5 py-3 text-right font-medium">24h volume</th>
              </tr>
            </thead>
            <tbody>
              {(data?.pairs ?? []).map((pair) => (
                <tr key={pair.pairAddress} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium capitalize">
                    <a href={pair.url} target="_blank" rel="noreferrer" className="hover:text-accent">
                      {pair.dex}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {TOKEN.symbol}/{pair.quoteSymbol}
                  </td>
                  <td className="tabular px-5 py-3 text-right">{formatUsd(pair.priceUsd)}</td>
                  <td className="px-5 py-3 text-right">
                    <Delta value={pair.change24h} />
                  </td>
                  <td className="tabular px-5 py-3 text-right">
                    {formatCompactUsd(pair.liquidityUsd)}
                  </td>
                  <td className="tabular px-5 py-3 text-right">
                    {formatCompactUsd(pair.volume24h)}
                  </td>
                </tr>
              ))}
              {(data?.pairs ?? []).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                    Live pool data is temporarily unavailable. It will reappear on the next refresh.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
