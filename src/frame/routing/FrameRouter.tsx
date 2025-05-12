import * as React from 'react';
import { ReactNode } from 'react';
import {
    useInRouterContext,
    createHashRouter,
    RouterProvider,
} from 'react-router-dom';

import { BasenameContextProvider } from './BasenameContextProvider';

export const FrameRouter = ({ basename = '', children }: FrameRouterProps) => {
  const isInRouter = useInRouterContext();
  const Router = isInRouter ? DummyRouter : InternalRouter;

  return (
    <BasenameContextProvider basename={isInRouter ? basename : ''}>
      <Router basename={basename}>{children}</Router>
    </BasenameContextProvider>
  );
};

export interface FrameRouterProps {
  basename?: string;
  children: ReactNode;
}

const DummyRouter = ({
  children,
}: {
  children: ReactNode;
  basename?: string;
}) => <>{children}</>;

const InternalRouter = ({
  children,
  basename,
}: {
  children: ReactNode;
  basename?: string;
}) => {
  const router = createHashRouter([{ path: '*', element: <>{children}</> }], {
    basename,
  });
  return <RouterProvider router={router} />;
};
