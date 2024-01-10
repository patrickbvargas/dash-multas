import React from "react";
import { cn } from "@utils";

interface SidebarNavDividerProps extends React.HTMLAttributes<HTMLHRElement> {}

const SidebarNavDivider = ({ className = "", ...props }: SidebarNavDividerProps) => {
  return (
    <hr
      className={cn("rounded-full border-t-2 border-black-600 dark:border-black-700", className)}
      {...props}
    />
  );
};

export default SidebarNavDivider;
