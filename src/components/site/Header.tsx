import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { TOKEN } from "@/lib/token";
import { LivePriceBadge } from "./LivePriceBadge";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/tokenomics", label: "Tokenomics" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="accent-bar flex size-9 items-center justify-center rounded-lg text-sm font-bold text-accent-foreground">
            Z
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold">{TOKEN.brand}</span>
            <span className="text-[11px] text-muted-foreground">
              {TOKEN.symbol} · {TOKEN.chain}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LivePriceBadge />
          </div>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border px-3 py-2 text-sm font-medium md:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-border bg-card px-5 py-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
