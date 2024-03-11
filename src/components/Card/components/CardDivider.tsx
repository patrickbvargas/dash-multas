import React from "react";
import { cn } from "@utils";

interface CardDividerProps extends React.HTMLAttributes<HTMLHRElement> {}

const CardDivider = ({ className = "", ...props }: CardDividerProps) => {
  return (
    <hr
      className={cn("rounded-full border-t-2", "border-gray-100", "dark:border-black-600", className)}
      {...props}
    />
  );
};

export default CardDivider;
