import React from "react";
import { cn } from "@utils";
import { ArrowTopRightOnSquareIcon } from "@icons/mini";
import { Link } from "react-router-dom";

interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  linkTo?: string | null;
}

// TODO: refatore
const Heading = ({ title = "", linkTo = null, className = "", ...props }: HeadingProps) => {
  return (
    <Link to={linkTo || ""} rel="noopener noreferrer">
      <div
        className={cn("group inline-flex max-w-full cursor-pointer items-center gap-2.5", className)}
        {...props}
      >
        <span className="h-4 w-1 rounded-r-sm bg-gray-300 transition duration-300 group-hover:bg-accent dark:bg-black-400" />
        <h3 className="truncate text-base font-medium uppercase text-gray-600 dark:text-black-50">{title}</h3>
        {linkTo && <ArrowTopRightOnSquareIcon className="h-5 text-gray-400 dark:text-black-100" />}
      </div>
    </Link>
  );
};

export default Heading;
