import { Navigate, Route, Routes, useInRouterContext } from "react-router-dom";
import { useScrollToTop } from "../routing";
import { CatchAllComponent, FrameChildren, LayoutComponent, LoadingComponent } from "../types";
import { Children } from "react";
import { useConfigureFrameRouterFromChildren } from "./useConfigureFrameRouterFromChildren";
import { useCreatePath } from "../routing/useCreatePath";
import { BasenameContextProvider } from "../routing/BasenameContextProvider";

export const CoreFrameRoutes = (props: CoreFrameRoutesProps) => {
  useScrollToTop();

  const {
    appRoutes,
    adminCustomRoutes,
    shellRoutes,
    resources,
  } = useConfigureFrameRouterFromChildren(props.children);
  const createPath = useCreatePath();
  const isInRouter = useInRouterContext();

  const {
    catchAll: CatchAll,
    appLayout: AppLayout,
    adminLayout: AdminLayout,
  } = props;

  return (
    <Routes>
      {shellRoutes}
      <Route
        path="/*"
        element={
          <Routes>
            <Route
              path="/contests/*"
              />
            <Route
              path="/admin/*"
            />
          <AppLayout>
            <Routes>
              {appRoutes}
              <Route
                  path="/"
                  element={
                    (<div>Hello From App</div>)
                  }
                />
            </Routes>
          </AppLayout>
        }
      />
      <Route
        path="/admin/*"
        element={
          <BasenameContextProvider basename={isInRouter ? 'admin' : ''}>
            <AdminLayout>
              <Routes>
                {/* {adminCustomRoutes}
                {Children.map(resources, resource => (
                  <Route
                    key={resource.props.name}
                    path={`${resource.props.route}/*`}
                    element={resource}
                  />
                ))} */}
                <Route
                  path="/"
                  element={
                    (<div>Hello</div>)
                  }
                />
                <Route path="*" element={<CatchAll />} />
              </Routes>
            </AdminLayout>
          </BasenameContextProvider>
        }
      />
    </Routes>
  )
};

export interface CoreFrameRoutesProps {
  catchAll: CatchAllComponent;
  children?: FrameChildren;
  appLayout: LayoutComponent;
  adminLayout: LayoutComponent;
  loading?: LoadingComponent;
};