import { ComponentType, ReactElement, ReactNode } from "react";

export interface ResourceOptions {
  label?: string;
  [key: string]: any;
}

export type RecordToStringFunction = (record: any) => string;

export interface ResourceDefinition<OptionsType extends ResourceOptions = any> {
  readonly name: string;
  readonly route: string;
  readonly options?: OptionsType;
  readonly hasList?: boolean;
  readonly hasEdit?: boolean;
  readonly hasShow?: boolean;
  readonly hasCreate?: boolean;
  readonly icon?: any;
  readonly recordRepresentation?:
    | ReactElement
    | RecordToStringFunction
    | string;
}
export interface ResourceProps {
  name: string;
  list?: ComponentType<any> | ReactElement;
  create?: ComponentType<any> | ReactElement;
  edit?: ComponentType<any> | ReactElement;
  show?: ComponentType<any> | ReactElement;
  hasCreate?: boolean;
  hasEdit?: boolean;
  hasShow?: boolean;
  icon?: ComponentType<any>;
  recordRepresentation?: ReactElement | RecordToStringFunction | string;
  options?: ResourceOptions;
  children?: ReactNode;
}

export type ResourceElement = ReactElement<ResourceProps>;
export type RenderResourcesFunction = (permissions: any) =>
    | ReactNode // (permissions) => <><Resource /><Resource /><Resource /></>
    | Promise<ReactNode> // (permissions) => fetch().then(() => <><Resource /><Resource /><Resource /></>)
    | ResourceElement[] // // (permissions) => [<Resource />, <Resource />, <Resource />]
    | Promise<ResourceElement[]>; // (permissions) => fetch().then(() => [<Resource />, <Resource />, <Resource />])
export type FrameChildren =
  | RenderResourcesFunction
  | Iterable<ReactNode | RenderResourcesFunction>
  | ReactNode;

export type TitleComponent = ComponentType<{}> | ReactElement<any>;
export type CatchAllComponent = ComponentType<{ title?: TitleComponent }>;

export interface CoreLayoutProps {
  children: ReactNode;
}

export type LayoutComponent = ComponentType<CoreLayoutProps>;
export type LoadingComponent = ComponentType<{
  loadingPrimary?: string;
  loadingSecondary?: string;
}>;

export type ResourceItem = {
  name?: string;
  route?: string;
  path?: string;
}