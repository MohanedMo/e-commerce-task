"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data stays fresh for 5 minutes - avoids refetching on navigation
            staleTime: 5 * 60 * 1000,
            // Cache persists in memory for 30 minutes after last use
            gcTime: 30 * 60 * 1000,
            // Don't retry too aggressively
            retry: 2,
            // Don't refetch when window regains focus (reduces unnecessary calls)
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
