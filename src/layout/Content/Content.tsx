import React from "react";
import { cn } from "@utils";
import { MainRoutes } from "@routes";

interface ContentProps extends React.HTMLAttributes<HTMLElement> {}

const Content = ({ className = "", ...props }: ContentProps) => {
  return (
    <main className={cn("flex h-full flex-col gap-5 overflow-hidden px-8 pb-8 pt-4", className)} {...props}>
      <MainRoutes />
    </main>
  );
};

export default Content;
