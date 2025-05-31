"use client";

import * as React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const NProgress: React.FC = () => {
  return (
    <React.Suspense fallback={null}>
      <ProgressBar
        height="4px"
        color="hsl(var(--accent))"
        options={{ showSpinner: false }}
        shallowRouting={true}
      />
    </React.Suspense>
  );
};
