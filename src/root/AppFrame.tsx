import { CoreFrameContext, CoreFrameContextProps, CoreFrameUI, CoreFrameUIProps } from "../frame";

export const AppFrame = (props: CoreFrameProps) => {
  const {
    children,
    dataProvider,
    queryClient,
  } = props;

  return (
    <CoreFrameContext
      dataProvider={dataProvider}
      queryClient={queryClient}
    >
      <CoreFrameUI>
        {children}
      </CoreFrameUI>
    </CoreFrameContext>
  );
}

export type CoreFrameProps = CoreFrameContextProps & CoreFrameUIProps;