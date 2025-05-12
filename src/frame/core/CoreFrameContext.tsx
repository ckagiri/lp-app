import * as React from 'react';
import { useMemo } from 'react';
import { QueryClientProvider, QueryClient, Query } from '@tanstack/react-query';

import { FrameRouter } from '../routing/FrameRouter';
import { FrameChildren } from '../types';
import { ResourceDefinitionContextProvider } from './ResourceDefinitionContext';

export interface CoreFrameContextProps {
  basename?: string;
  children: FrameChildren,
  queryClient?: QueryClient
};

export const CoreFrameContext = (props: CoreFrameContextProps) => {
  const {
    basename,
    children,
    queryClient
  } = props;

  const finalQueryClient = useMemo(
    () => queryClient || new QueryClient(),
    [queryClient]
  );

  return (
    <QueryClientProvider client={finalQueryClient}>
      <FrameRouter basename={basename}>
        <ResourceDefinitionContextProvider>
          {children}
        </ResourceDefinitionContextProvider>
      </FrameRouter>
    </QueryClientProvider>
  );
};
