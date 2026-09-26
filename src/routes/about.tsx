import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Section } from "@/components/site/PageHeader";
import { TOKEN } from "@/lib/token";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${TOKEN.brand}` },
      {
        name: "description",
        content:
          "Who we are: a liquidity and market-data team focused entirely on the Solana-native ZEC market.",
      },
      { property: "og:title", content: `About — ${TOKEN.brand}` },
      {
        property: "og:description",
        content: "A liquidity and market-data team focused on the Solana-native ZEC market.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  {
    title: "Verifiable over promised",
    body: "We publish live on-chain figures rather than curated screenshots. If a pool thins out, the site shows it.",
  },
  {
    title: "Depth before noise",
    body: "Our mandate is spread and depth quality, not short-term price. Every strategy is reviewed on execution cost.",
  },
  {
    title: "Privacy-respecting by default",
    body: "Zcash exists because financial privacy matters. We carry that principle into how we handle counterparty data.",
  },
];

const TIMELINE = [
  ["2024", "Desk formed to research Solana-native representations of major privacy assets."],
  ["2025", "First ZEC pools seeded on Orca and Meteora; public market dashboard launched."],
  ["2026", "Integration toolkit released for wallets and treasury teams settling ZEC on Solana."],
] as const;

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={`We exist to make ${TOKEN.symbol} tradeable on ${TOKEN.chain} without compromise.`}
        description={`${TOKEN.brand} is a small, research-led team working across market making, on-chain data and settlement engineering for the ${TOKEN.name} (${TOKEN.symbol}) market on ${TOKEN.chain}.`}
      />

      <Section title="What we do" subtitle="Three connected practices, one asset focus.">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="surface-card p-6">
              <div className="accent-bar h-1 w-10 rounded-full" />
              <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-2xl font-bold md:text-3xl">How we got here</h2>
          <ol className="mt-8 space-y-6">
            {TIMELINE.map(([year, body]) => (
              <li key={year} className="flex flex-col gap-2 md:flex-row md:gap-8">
                <span className="tabular w-20 shrink-0 text-sm font-bold text-accent">{year}</span>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section title="The asset we cover">
        <div className="surface-card grid gap-6 p-6 sm:grid-cols-2">
          {[
            ["Asset", `${TOKEN.name} (${TOKEN.symbol})`],
            ["Network", TOKEN.chain],
            ["Mint address", TOKEN.mint],
            ["Primary venues", "Orca, Meteora, Raydium"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 font-mono text-sm break-all">{value}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
