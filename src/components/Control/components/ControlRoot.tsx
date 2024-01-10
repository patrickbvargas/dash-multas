import React from "react";
import { cn } from "@utils";

interface ControlRootProps extends React.HTMLAttributes<HTMLDivElement> {}

const ControlRoot = ({ className = "", ...props }: ControlRootProps) => {
  return <div className={cn("inline-flex gap-2 transition duration-300", className)} {...props} />;
};

export default ControlRoot;
