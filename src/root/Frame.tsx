import { CoreFrameContext, CoreFrameContextProps, CoreFrameUI, CoreFrameUIProps } from "../frame";

export const Frame = (props: CoreFrameProps) => {
  const {
    adminLayout,
    appLayout,
    basename,
    catchAll,
    children,
    shellLayout,
    queryClient,
  } = props;

  return (
    <CoreFrameContext
      basename={basename}
      queryClient={queryClient}
    >
      <CoreFrameUI
        catchAll={catchAll}
        shellLayout={shellLayout}
        appLayout={appLayout}
        adminLayout={adminLayout}
      >
        {children}
      </CoreFrameUI>
    </CoreFrameContext>
  );
}

export type CoreFrameProps = CoreFrameContextProps & CoreFrameUIProps;