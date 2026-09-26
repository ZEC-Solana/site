<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules

- Live ZEC market data is fetched server-side in `src/lib/market.functions.ts` from the Dexscreener token API and consumed via `marketQueryOptions` (30s refetch); keeps the no-key third-party call off the client and aggregates all Solana pools in one place.
