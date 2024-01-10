import React from "react";
import { cn } from "@utils";
import { ArrowTopRightOnSquareIcon } from "@icons/mini";

interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  showExternalLink?: boolean;
}

// TODO: change the Heading tag
const Heading = ({ title = "", showExternalLink = false, className = "", ...props }: HeadingProps) => {
  return (
    <div className={cn("group inline-flex cursor-pointer items-center gap-2.5", className)} {...props}>
      <span className="h-4 w-1 rounded-r-sm bg-gray-300 transition duration-300 group-hover:bg-accent dark:bg-black-400" />
      <h3 className="text-base font-medium uppercase text-gray-600 dark:text-black-50">{title}</h3>
      {showExternalLink && (
        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400 dark:text-black-100" />
      )}
    </div>
  );
};

export default Heading;
