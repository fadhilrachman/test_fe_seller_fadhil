'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // useErrorBoundary: false,
          refetchOnWindowFocus: false,
          retry(failureCount, error: any) {
            if (error.status === 404) return false;
            if (failureCount < 2) return true;
            return false;
          }
        }
      }
    })
  );

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
