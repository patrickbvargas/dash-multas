import { cn } from "@utils";
import React from "react";

interface dataFieldItemProps extends React.HTMLAttributes<HTMLDListElement> {
  label: string;
  value: string | number;
}

const DataFieldItem = ({ label = "", value = "", className = "", ...props }: dataFieldItemProps) => {
  return (
    <dl className={cn("flex flex-col gap-1", className)} {...props}>
      <dt className="truncate text-sm font-medium text-gray-500 dark:text-black-100">{label}</dt>
      <dd className="truncate text-sm font-normal text-gray-500 dark:text-black-100">{value}</dd>
    </dl>
  );
};

export default DataFieldItem;
