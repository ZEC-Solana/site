import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Section } from "@/components/site/PageHeader";
import { TOKEN } from "@/lib/token";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: `Careers — ${TOKEN.brand}` },
      {
        name: "description",
        content:
          "Open roles in market making, on-chain data engineering and integrations for the Solana-native ZEC market.",
      },
      { property: "og:title", content: `Careers — ${TOKEN.brand}` },
      {
        property: "og:description",
        content: "Open roles across trading, data engineering and integrations.",
      },
    ],
  }),
  component: Careers;
});

const ROLES = [
  {
    title: "Quantitative Trader — Solana DEX",
    type: "Full-time · Remote (UTC±4)",
    body: "Own inventory and quoting strategy across concentrated liquidity pools. You will be measured on realised spread and fill quality, not volume.",
  },
  {
    title: "On-chain Data Engineer",
    type: "Full-time · Remote",
    body: "Build the ingestion layer behind our public market data: pool state, swap history, candle aggregation and anomaly detection.",
  },
  {
    title: "Integrations Engineer (TypeScript)",
    type: "Full-time · Remote",
    body: "Ship the reference SDK and wallet integrations that let teams settle ZEC on Solana in a day rather than a quarter.",
  },
  {
    title: "Compliance & Operations Lead",
    type: "Part-time · Contract",
    body: "Own counterparty onboarding, reserve reporting cadence and our relationships with venue and bridge partners.",
  },
] as const;

const BENEFITS = [
  ["Remote-first", "Fully distributed team with async-by-default communication."],
  ["Real ownership", "Small team, direct mandate, no layers between you and the market."],
  ["Learning budget", "Annual allowance for research, conferences and tooling."],
  ["Transparent pay", "Bands published internally, reviewed twice a year."],
] as const;

function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Small team, narrow mandate, real market exposure."
        description={`We hire people who want to own a measurable surface of the ${TOKEN.symbol} market on ${TOKEN.chain}. If that sounds like a constraint rather than a limitation, we will get along.`}
      />

      <Section title="Open roles">
        <div className="grid gap-4">
          {ROLES.map((role) => (
            <article
              key={role.title}
              className="surface-card flex flex-wrap items-start justify-between gap-6 p-6"
            >
              <div className="max-w-2xl">
                <h3 className="text-lg font-bold">{role.title}</h3>
                <p className="mt-1 text-xs font-medium tracking-wide uppercase text-accent">
                  {role.type}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{role.body}</p>
              </div>
              <Link
                to="/contact"
                search={{ role: role.title }}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Apply
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(([title, body]) => (
            <div key={title}>
              <div className="accent-bar h-1 w-10 rounded-full" />
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
