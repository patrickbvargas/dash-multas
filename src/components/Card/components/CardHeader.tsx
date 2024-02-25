import React from "react";
import { cn } from "@utils";
import { ActionControls, PriorityIndicator } from "@components";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isPriority?: boolean;
  editCallback: () => void;
  deleteCallback: () => void;
}

const CardHeader = ({
  title = "",
  isPriority = false,
  editCallback = () => {},
  deleteCallback = () => {},
  className = "",
  ...props
}: CardHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)} {...props}>
      <h2 className="truncate text-base font-medium text-gray-700 dark:text-black-50">{title}</h2>
      <div className="flex gap-2 px-2">
        <div className="hidden opacity-0 group-hover/card:inline-flex group-hover/card:opacity-100">
          <ActionControls editCallback={editCallback} deleteCallback={deleteCallback} />
        </div>
        {isPriority && <PriorityIndicator />}
      </div>
    </div>
  );
};

export default CardHeader;
