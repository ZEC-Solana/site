import { queryOptions } from "@tanstack/react-query";

import { getMarketSnapshot } from "./market.functions";

export const marketQueryOptions = queryOptions({
  queryKey: ["market-snapshot"],
  queryFn: () => getMarketSnapshot(),
  refetchInterval: 30_000,
  refetchOnWindowFocus: true,
  staleTime: 15_000,
});
