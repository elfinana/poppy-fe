'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

type Props = {};

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
