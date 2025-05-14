import { CoreFrameContext, CoreFrameContextProps } from "./CoreFrameContext";
import { CoreFrameUI, CoreFrameUIProps } from "./CoreFrameUI";

export const CoreFrame = (props: CoreFrameProps) => {
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