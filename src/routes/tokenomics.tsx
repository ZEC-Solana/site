import { createFileRoute } from "@tanstack/react-router";

import { MarketPanel } from "@/components/site/MarketPanel";
import { PageHeader, Section } from "@/components/site/PageHeader";
import { marketQueryOptions } from "@/lib/market-query";
import { TOKEN } from "@/lib/token";

export const Route = createFileRoute("/tokenomics")({
  head: () => ({
    meta: [
      { title: `Tokenomics — ${TOKEN.symbol} on ${TOKEN.chain}` },
      {
        name: "description",
        content:
          "ZEC supply, emission and liquidity structure on Solana, alongside live market cap, pool depth and volume.",
      },
      { property: "og:title", content: `Tokenomics — ${TOKEN.symbol} on ${TOKEN.chain}` },
      {
        property: "og:description",
        content: "Supply, emissions and live liquidity structure for ZEC on Solana.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(marketQueryOptions),
  component: Tokenomics,
});

const SUPPLY = [
  ["Maximum supply", "21,000,000 ZEC", "Fixed cap inherited from the Zcash protocol."],
  ["Issuance", "Proof-of-work block rewards", "Halving schedule mirrors Bitcoin's structure."],
  [
    "Solana representation",
    "Bridged / wrapped ZEC",
    "Each Solana-side token is backed 1:1 by ZEC held in reserve by the bridge issuer.",
  ],
  ["Decimals", "8", "Matches native ZEC precision for clean accounting."],
] as const;

const LIQUIDITY = [
  ["Orca whirlpools", "Concentrated USDC and SOL pairs used for tight-spread execution."],
  ["Meteora DLMM", "Dynamic bins that widen automatically in volatile sessions."],
  ["Raydium", "Backstop depth for routers and aggregator fills."],
] as const;

function Tokenomics() {
  return (
    <>
      <PageHeader
        eyebrow="Tokenomics"
        title={`${TOKEN.symbol} supply is fixed. Liquidity is what we engineer.`}
        description={`${TOKEN.name} has a hard 21 million cap and no discretionary treasury allocation. On ${TOKEN.chain}, the work is in how that supply is distributed across pools — which is what the live figures below measure.`}
      />

      <Section title="Live market structure">
        <MarketPanel />
      </Section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-2xl font-bold md:text-3xl">Supply parameters</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {SUPPLY.map(([label, value, note]) => (
              <div key={label} className="surface-card p-6">
                <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 text-lg font-bold">{value}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section
        title="Where the liquidity sits"
        subtitle="Pool-level figures in the table above are read live; the roles below describe how we use each venue."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {LIQUIDITY.map(([venue, body]) => (
            <div key={venue} className="surface-card p-6">
              <h3 className="text-lg font-bold capitalize">{venue}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Market cap and fully diluted value shown on this page come from the deepest on-chain pool
          and reflect the circulating supply of the Solana-side token, not native {TOKEN.symbol}{" "}
          supply. Always verify against the{" "}
          <a href={TOKEN.cmcUrl} target="_blank" rel="noreferrer" className="underline">
            CoinMarketCap DEX listing
          </a>{" "}
          before trading.
        </p>
      </Section>
    </>
  );
}
