import * as React from "react";

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <section>{children}</section>;
};
