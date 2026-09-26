import { createServerFn } from "@tanstack/react-start";

import { TOKEN } from "./token";

export type MarketPair = {
  pairAddress: string;
  dex: string;
  quoteSymbol: string;
  priceUsd: number | null;
  liquidityUsd: number | null;
  volume24h: number | null;
  change24h: number | null;
  url: string;
};

export type MarketSnapshot = {
  priceUsd: number | null;
  marketCap: number | null;
  fdv: number | null;
  liquidityUsd: number;
  volume24h: number;
  change5m: number | null;
  change1h: number | null;
  change6h: number | null;
  change24h: number | null;
  buys24h: number;
  sells24h: number;
  pairCount: number;
  pairs: MarketPair[];
  updatedAt: string;
  stale: boolean;
};

type DexPair = {
  pairAddress: string;
  dexId: string;
  url: string;
  quoteToken?: { symbol?: string };
  priceUsd?: string;
  liquidity?: { usd?: number };
  volume?: Record<string, number>;
  priceChange?: Record<string, number>;
  txns?: Record<string, { buys?: number; sells?: number }>;
  marketCap?: number;
  fdv?: number;
};

const EMPTY: MarketSnapshot = {
  priceUsd: null,
  marketCap: null,
  fdv: null,
  liquidityUsd: 0,
  volume24h: 0,
  change5m: null,
  change1h: null,
  change6h: null,
  change24h: null,
  buys24h: 0,
  sells24h: 0,
  pairCount: 0,
  pairs: [],
  updatedAt: new Date(0).toISOString(),
  stale: true,
};

export const getMarketSnapshot = createServerFn({ method: "GET" }).handler(
  async (): Promise<MarketSnapshot> => {
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN.mint}`, {
        headers: { accept: "application/json" },
      });
      if (!res.ok) return { ...EMPTY, updatedAt: new Date().toISOString() };

      const json = (await res.json()) as { pairs?: DexPair[] | null };
      const raw = (json.pairs ?? []).filter((p) => Number(p.liquidity?.usd ?? 0) > 0);
      if (raw.length === 0) return { ...EMPTY, updatedAt: new Date().toISOString() };

      const liquidityUsd = raw.reduce((sum, p) => sum + Number(p.liquidity?.usd ?? 0), 0);
      const volume24h = raw.reduce((sum, p) => sum + Number(p.volume?.["h24"] ?? 0), 0);
      const buys24h = raw.reduce((sum, p) => sum + Number(p.txns?.["h24"]?.buys ?? 0), 0);
      const sells24h = raw.reduce((sum, p) => sum + Number(p.txns?.["h24"]?.sells ?? 0), 0);

      // Liquidity-weighted price + change, so one thin pool cannot skew the headline.
      const weighted = (pick: (p: DexPair) => number | undefined) => {
        let num = 0;
        let den = 0;
        for (const p of raw) {
          const value = pick(p);
          const weight = Number(p.liquidity?.usd ?? 0);
          if (value !== undefined && Number.isFinite(value) && weight > 0) {
            num += value * weight;
            den += weight;
          }
        }
        return den > 0 ? num / den : null;
      };

      const deepest = raw.reduce((a, b) =>
        Number(b.liquidity?.usd ?? 0) > Number(a.liquidity?.usd ?? 0) ? b : a,
      );

      const pairs: MarketPair[] = raw
        .slice()
        .sort((a, b) => Number(b.liquidity?.usd ?? 0) - Number(a.liquidity?.usd ?? 0))
        .slice(0, 8)
        .map((p) => ({
          pairAddress: p.pairAddress,
          dex: p.dexId,
          quoteSymbol: p.quoteToken?.symbol ?? "—",
          priceUsd: p.priceUsd ? Number(p.priceUsd) : null,
          liquidityUsd: Number(p.liquidity?.usd ?? 0),
          volume24h: Number(p.volume?.["h24"] ?? 0),
          change24h: p.priceChange?.["h24"] ?? null,
          url: p.url,
        }));

      return {
        priceUsd: weighted((p) => (p.priceUsd ? Number(p.priceUsd) : undefined)),
        marketCap: deepest.marketCap ?? null,
        fdv: deepest.fdv ?? null,
        liquidityUsd,
        volume24h,
        change5m: weighted((p) => p.priceChange?.["m5"]),
        change1h: weighted((p) => p.priceChange?.["h1"]),
        change6h: weighted((p) => p.priceChange?.["h6"]),
        change24h: weighted((p) => p.priceChange?.["h24"]),
        buys24h,
        sells24h,
        pairCount: raw.length,
        pairs,
        updatedAt: new Date().toISOString(),
        stale: false,
      };
    } catch {
      return { ...EMPTY, updatedAt: new Date().toISOString() };
    }
  },
);
