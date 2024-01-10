import React from "react";
import { cn } from "@utils";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = ({ className = "", ...props }: CardContentProps) => {
  return <div className={cn("grid grid-cols-2 gap-3.5 px-2", className)} {...props} />;
};

export default CardContent;
