import React from "react";
import { cn } from "@utils";

interface dataFieldWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

const DataFieldWrapper = ({ className = "", ...props }: dataFieldWrapperProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-2 sm:p-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
};

export default DataFieldWrapper;
