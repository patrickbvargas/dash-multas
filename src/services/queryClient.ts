import { QueryClient } from "@tanstack/react-query";
import { QUERY_STALE_TIME_IN_SECONDS } from "@constants";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_IN_SECONDS * 1000,
    },
  },
});
