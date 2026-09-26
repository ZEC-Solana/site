import { Link } from "@tanstack/react-router";

import { TOKEN } from "@/lib/token";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="accent-bar flex size-8 items-center justify-center rounded-lg text-xs font-bold text-accent-foreground">
              Z
            </span>
            <span className="font-display text-sm font-bold">{TOKEN.brand}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Market infrastructure and liquidity research for {TOKEN.name} ({TOKEN.symbol}) on{" "}
            {TOKEN.chain}. Figures on this site are read live from on-chain decentralised exchange
            data.
          </p>
          <p className="mt-4 font-mono text-[11px] break-all text-muted-foreground">{TOKEN.mint}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/tokenomics" className="hover:text-foreground">
                Tokenomics
              </Link>
            </li>
            <li>
              <Link to="/roadmap" className="hover:text-foreground">
                Roadmap
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Market data</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={TOKEN.cmcUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
                CoinMarketCap DEX
              </a>
            </li>
            <li>
              <a
                href={TOKEN.dexscreenerUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                Dexscreener
              </a>
            </li>
            <li>
              <a
                href={`https://solscan.io/token/${TOKEN.mint}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                Solscan
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-5 py-6">
        <p className="mx-auto max-w-6xl text-xs leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} {TOKEN.brand}. Nothing on this website is financial advice.
          Digital assets are volatile and you may lose the full value of your position.
        </p>
      </div>
    </footer>
  );
}
