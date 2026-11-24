"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/query-client";
import StoreProvider from "./storeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Don't use useState here for the client; getQueryClient handles
  // per-request (server) vs singleton (browser) correctly.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>{children}</StoreProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
