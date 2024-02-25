import React from "react";
import { cn } from "@utils";

interface CardListProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardList = ({ className = "", ...props }: CardListProps) => {
  return (
    <div
      className={cn(
        "grid max-h-full grid-cols-1 gap-3 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    />
  );
};

export default CardList;
