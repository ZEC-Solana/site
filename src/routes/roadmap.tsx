import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Section } from "@/components/site/PageHeader";
import { TOKEN } from "@/lib/token";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: `Roadmap — ${TOKEN.brand}` },
      {
        name: "description",
        content:
          "Delivery plan for ZEC liquidity depth, market data APIs and settlement tooling on Solana.",
      },
      { property: "og:title", content: `Roadmap — ${TOKEN.brand}` },
      {
        property: "og:description",
        content: "What we are shipping next for the Solana-native ZEC market.",
      },
    ],
  }),
  component: Roadmap,
});

const PHASES = [
  {
    phase: "Phase 1",
    window: "Shipped",
    status: "done",
    title: "Live market transparency",
    items: [
      "Liquidity-weighted pricing across every active Solana pool",
      "Public dashboard refreshing every 30 seconds",
      "Per-pool depth, volume and trade-count breakdown",
    ],
  },
  {
    phase: "Phase 2",
    window: "In progress",
    status: "active",
    title: "Depth and execution quality",
    items: [
      "Deeper concentrated liquidity on the USDC pair",
      "Automated bin rebalancing during volatile sessions",
      "Slippage benchmarking published monthly",
    ],
  },
  {
    phase: "Phase 3",
    window: "Next",
    status: "next",
    title: "Data and integration APIs",
    items: [
      "Public read API for pool telemetry and historical candles",
      "Reference wallet integration for ZEC settlement on Solana",
      "Treasury reporting exports for finance teams",
    ],
  },
  {
    phase: "Phase 4",
    window: "Planned",
    status: "next",
    title: "Institutional access",
    items: [
      "Request-for-quote flow for block-size trades",
      "Proof-of-reserve attestation cadence for the bridged supply",
      "Third-party security review of the integration toolkit",
    ],
  },
] as const;

function Roadmap() {
  return (
    <>
      <PageHeader
        eyebrow="Roadmap"
        title="From transparent pricing to institutional access."
        description={`Our roadmap is sequenced around one question: can a serious counterparty move size in ${TOKEN.symbol} on ${TOKEN.chain} with predictable cost? Each phase removes one obstacle to that.`}
      />

      <Section>
        <ol className="space-y-6">
          {PHASES.map((p) => (
            <li key={p.phase} className="surface-card p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-accent">
                  {p.phase}
                </span>
                <span
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium"
                  style={
                    p.status === "done"
                      ? { color: "var(--positive)" }
                      : p.status === "active"
                        ? { color: "var(--accent)" }
                        : { color: "var(--muted-foreground)" }
                  }
                >
                  {p.window}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold md:text-2xl">{p.title}</h2>
              <ul className="mt-4 space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-xs text-muted-foreground">
          Timelines are indicative and depend on market conditions. Nothing here is a commitment to
          a specific delivery date.
        </p>
      </Section>
    </>
  );
}
