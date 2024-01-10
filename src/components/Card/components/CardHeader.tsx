import React from "react";
import { cn } from "@utils";
import { Control, PriorityIndicator } from "@components";
import { PencilSquareIcon, TrashIcon } from "@icons/outline";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isPriority: boolean;
}

// TODO: include action callbacks
const CardHeader = ({ title = "", isPriority = false, className = "", ...props }: CardHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)} {...props}>
      <h4 className="truncate text-base font-medium text-gray-700 dark:text-black-50">{title}</h4>
      <div className="flex gap-2 px-2">
        <Control.Root className="hidden opacity-0 group-hover/card:inline-flex group-hover/card:opacity-100">
          <Control.Action icon={<PencilSquareIcon className="h-5 w-5" />} variant="edit" />
          <Control.Action icon={<TrashIcon className="h-5 w-5" />} variant="delete" />
        </Control.Root>
        {isPriority && <PriorityIndicator />}
      </div>
    </div>
  );
};

export default CardHeader;
