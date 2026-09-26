import { createFileRoute, Link } from "@tanstack/react-router";

import { MarketPanel } from "@/components/site/MarketPanel";
import { Section } from "@/components/site/PageHeader";
import { marketQueryOptions } from "@/lib/market-query";
import { TOKEN } from "@/lib/token";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZEC Solana Group — live Zcash (ZEC) market data on Solana" },
      {
        name: "description",
        content:
          "Live liquidity-weighted ZEC price, pool depth and 24h volume on Solana, plus the research and integration work behind it.",
      },
      { property: "og:title", content: "ZEC Solana Group — live ZEC market data on Solana" },
      {
        property: "og:description",
        content:
          "Liquidity-weighted ZEC pricing across every Solana pool, refreshed every 30 seconds.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(marketQueryOptions),
  component: Home,
});

const PILLARS = [
  {
    title: "Liquidity provisioning",
    body: "We run and monitor market-making strategies across Orca, Meteora and Raydium pools so ZEC trades with tight spreads at size.",
  },
  {
    title: "Market data",
    body: "Every number on this site is read directly from on-chain DEX pools and weighted by pool depth, so a thin pool can never skew the headline price.",
  },
  {
    title: "Integrations",
    body: "Wallet, payment and treasury teams use our reference implementations to settle ZEC on Solana in minutes rather than weeks.",
  },
];

function Home() {
  return (
    <>
      <section className="hero-canvas border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent">
                {TOKEN.name} · {TOKEN.symbol} · {TOKEN.chain}
              </p>
              <h1 className="mt-4 text-4xl leading-[1.05] font-bold md:text-6xl">
                Institutional-grade rails for {TOKEN.symbol} on {TOKEN.chain}.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {TOKEN.brand} provides liquidity, market data and settlement tooling for the
                Solana-native {TOKEN.symbol} market. Pricing below is pulled live from on-chain
                pools and refreshes every 30 seconds.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/tokenomics"
                  className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Explore tokenomics
                </Link>
                <Link
                  to="/contact"
                  className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  Talk to the desk
                </Link>
              </div>
              <p className="mt-6 font-mono text-[11px] break-all text-muted-foreground">
                Mint {TOKEN.mint}
              </p>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-sm font-semibold">What we track</h2>
              <ul className="mt-4 space-y-4">
                {PILLARS.map((p) => (
                  <li key={p.title}>
                    <p className="text-sm font-semibold">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section
        title="Live market overview"
        subtitle="Aggregated from every Solana pool with active liquidity. Auto-refreshing every 30 seconds."
      >
        <MarketPanel />
      </Section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title}>
              <div className="accent-bar h-1 w-10 rounded-full" />
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <div className="surface-card flex flex-wrap items-center justify-between gap-6 p-8">
          <div>
            <h2 className="text-2xl font-bold">Building on {TOKEN.symbol}?</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              We share pool telemetry, routing guidance and integration support with teams settling
              {" "}
              {TOKEN.symbol} on {TOKEN.chain}.
            </p>
          </div>
          <Link
            to="/contact"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </Section>
    </>
  );
}
