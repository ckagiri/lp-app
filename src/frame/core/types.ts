import { ReactNode } from "react";

export const ShellRoutes = (_props: FrameRoutesProps) => {
  return null;
};
ShellRoutes.uiName = 'ShellRoutes';

export const AppRoutes = (_props: FrameRoutesProps) => {
  return null;
};
AppRoutes.uiName = 'AppRoutes';

export const AdminCustomRoutes = (_props: FrameRoutesProps) => {
  return null;
};
AdminCustomRoutes.uiName = 'AdminCustomRoutes';

export type FrameRoutesProps = {
  children: ReactNode;
};