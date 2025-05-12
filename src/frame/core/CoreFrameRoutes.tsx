import { Navigate, Route, Routes } from "react-router-dom";
import { useScrollToTop } from "../routing";
import { CatchAllComponent, FrameChildren, LayoutComponent, LoadingComponent } from "../types";
import { Children } from "react";

export const CoreFrameRoutes = (props: CoreFrameRoutesProps) => {
  useScrollToTop();

  const {
    appRoutes,
    adminCustomRoutes,
    shellRoutes,
    status,
    resources,
  } = useConfigureFrameRouterFromChildren(props.children);

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
                {/* <Route
                  path="/"
                  element={
                    resources.length > 0 ? (
                      <Navigate
                        to={createPath({
                          resourcePath: resources[0].props.path,
                          type: 'list',
                        })}
                      />
                    ) : null
                  }
                /> */}
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