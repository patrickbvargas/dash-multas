import React from "react";
import { cn } from "@utils";
import { Heading } from "@components";

interface dataFieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const DataFieldGroup = ({ title = "", children, className = "", ...props }: dataFieldGroupProps) => {
  return (
    <div className={cn("flex max-w-[16rem] flex-1 flex-col gap-4", className)} {...props}>
      <Heading title={title} />
      <div className="flex flex-col gap-3.5 pl-3.5">{children}</div>
    </div>
  );
};

export default DataFieldGroup;
