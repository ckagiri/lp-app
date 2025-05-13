import { Navigate, Route, Routes } from "react-router-dom";
import { useScrollToTop } from "../routing";
import { CatchAllComponent, FrameChildren, LayoutComponent, LoadingComponent } from "../types";
import { Children } from "react";
import { useConfigureFrameRouterFromChildren } from "./useConfigureFrameRouterFromChildren";
import { useCreatePath } from "../routing/useCreatePath";

export const CoreFrameRoutes = (props: CoreFrameRoutesProps) => {
  useScrollToTop();

  const {
    appRoutes,
    adminCustomRoutes,
    shellRoutes,
    resources,
  } = useConfigureFrameRouterFromChildren(props.children);
  const createPath = useCreatePath();

  const {
    catchAll: CatchAll,
    shellLayout: ShellLayout,
    appLayout: AppLayout,
    adminLayout: AdminLayout,
  } = props;

  return (
    <Routes>
      <ShellLayout>
        {shellRoutes}
      </ShellLayout>
      <AppLayout>
        {appRoutes}
      </AppLayout>
      <Route
        path="/admin/*"
        element={
          <AdminLayout>
              <Routes>
                {adminCustomRoutes}
                {Children.map(resources, resource => (
                    <Route
                      key={resource.props.name}
                      path={`${resource.props.route}/*`}
                      element={resource}
                    />
                ))}
                <Route
                  path="/"
                  element={
                    resources.length > 0 ? (
                      <Navigate
                        to={createPath({
                          resourcePath: resources[0].props.route,
                          type: 'list',
                        })}
                      />
                    ) : null
                  }
                />
                <Route path="*" element={<CatchAll />} />
              </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  )
};

export interface CoreFrameRoutesProps {
  catchAll: CatchAllComponent;
  children?: FrameChildren;
  shellLayout: LayoutComponent;
  appLayout: LayoutComponent;
  adminLayout: LayoutComponent;
  loading?: LoadingComponent;
};