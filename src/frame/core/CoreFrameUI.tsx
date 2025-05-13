import { CatchAllComponent, FrameChildren, LayoutComponent, LoadingComponent } from "../types";
import { Route, Routes } from "react-router-dom";
import { CoreFrameRoutes } from "./CoreFrameRoutes";


export interface CoreFrameUIProps {
  catchAll?: CatchAllComponent;
  children?: FrameChildren;
  appLayout?: LayoutComponent;
  adminLayout?: LayoutComponent;
  loading?: LoadingComponent;
}

const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const CoreFrameUI = (props: CoreFrameUIProps) => {
  const {
    catchAll = Noop,
    children,
    appLayout = DefaultLayout,
    adminLayout = DefaultLayout,
    loading = Noop,
  } = props;

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <CoreFrameRoutes
            catchAll={catchAll}
            appLayout={appLayout}
            adminLayout={adminLayout}
            loading={loading}
          >
            {children}
          </CoreFrameRoutes>
        }
      />
    </Routes>
  );
}

const Noop = () => null;