import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader, Section } from "@/components/site/PageHeader";
import { TOKEN } from "@/lib/token";

type ContactSearch = { role?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    role: typeof search["role"] === "string" ? search["role"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Contact — ${TOKEN.brand}` },
      {
        name: "description",
        content:
          "Reach the ZEC Solana Group desk for liquidity, market data access, integrations or role applications.",
      },
      { property: "og:title", content: `Contact — ${TOKEN.brand}` },
      {
        property: "og:description",
        content: "Get in touch about liquidity, data access, integrations or open roles.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { role } = Route.useSearch();
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the desk."
        description={
          role
            ? `We received your interest in the ${role} role. Add a few lines about your background and we will reply.`
            : `Liquidity, market data access, integration support or general questions about ${TOKEN.symbol} on ${TOKEN.chain} — this reaches us directly.`
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="surface-card p-6 md:p-8">
            {sent ? (
              <div className="py-10 text-center">
                <h2 className="text-xl font-bold">Message noted</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  This form is not connected to an inbox yet, so nothing was sent. Email us instead
                  and we will pick it up.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form
                className="grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium">
                    Name
                    <input
                      required
                      name="name"
                      className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-medium">
                  Topic
                  <select
                    name="topic"
                    defaultValue={role ? "Careers" : "Liquidity"}
                    className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
                  >
                    <option>Liquidity</option>
                    <option>Market data access</option>
                    <option>Integration support</option>
                    <option>Careers</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Message
                  <textarea
                    required
                    name="message"
                    rows={6}
                    defaultValue={role ? `I'd like to apply for: ${role}\n\n` : ""}
                    className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
                  />
                </label>
                <button
                  type="submit"
                  className="justify-self-start rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="surface-card p-6">
              <h2 className="text-sm font-semibold">Direct</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  Desk ·{" "}
                  <a href="mailto:desk@example.com" className="text-foreground underline">
                    desk@example.com
                  </a>
                </li>
                <li>
                  Careers ·{" "}
                  <a href="mailto:careers@example.com" className="text-foreground underline">
                    careers@example.com
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Placeholder addresses — send us the real ones and we will swap them in.
              </p>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-sm font-semibold">Verify us on-chain</h2>
              <p className="mt-3 font-mono text-[11px] break-all text-muted-foreground">
                {TOKEN.mint}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a href={TOKEN.cmcUrl} target="_blank" rel="noreferrer" className="underline">
                  CoinMarketCap
                </a>
                <a href={TOKEN.dexscreenerUrl} target="_blank" rel="noreferrer" className="underline">
                  Dexscreener
                </a>
                <a
                  href={`https://solscan.io/token/${TOKEN.mint}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Solscan
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
