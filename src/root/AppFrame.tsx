import { CoreFrameContext, CoreFrameContextProps, CoreFrameUI, CoreFrameUIProps } from "../frame";

export const AppFrame = (props: CoreFrameProps) => {
  const {
    adminLayout,
    children,
    dataProvider,
    queryClient,
  } = props;

  return (
    <CoreFrameContext
      dataProvider={dataProvider}
      queryClient={queryClient}
    >
      <CoreFrameUI
        adminLayout={adminLayout}
      >
        {children}
      </CoreFrameUI>
    </CoreFrameContext>
  );
}

export type CoreFrameProps = CoreFrameContextProps & CoreFrameUIProps;