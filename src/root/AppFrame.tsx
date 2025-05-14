import { CoreFrameContext, CoreFrameContextProps, CoreFrameUI, CoreFrameUIProps } from "../frame";

export const AppFrame = (props: CoreFrameProps) => {
  const {
    adminLayout,
    basename,
    catchAll,
    children,
    queryClient,
  } = props;

  return (
    <CoreFrameContext
      basename={basename}
      queryClient={queryClient}
    >
      <CoreFrameUI
        catchAll={catchAll}
        adminLayout={adminLayout}
      >
        {children}
      </CoreFrameUI>
    </CoreFrameContext>
  );
}

export type CoreFrameProps = CoreFrameContextProps & CoreFrameUIProps;