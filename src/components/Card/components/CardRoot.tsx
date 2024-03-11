import { cn } from "@utils";
import React from "react";

interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardRoot = ({ className = "", ...props }: CardRootProps) => {
  return (
    <div
      className={cn(
        "group/card flex cursor-pointer flex-col gap-2 rounded-lg border-l-4 border-transparent py-3 pl-3 pr-4 transition duration-300 hover:border-accent",
        "bg-white shadow-sm",
        "dark:bg-black-700 dark:shadow-none",
        className,
      )}
      {...props}
    />
  );
};

export default CardRoot;
