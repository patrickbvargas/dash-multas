import React from "react";
import { cn } from "@utils";
import { ChevronLeftIcon } from "@icons/mini";

interface SidebarControlProps extends React.HTMLAttributes<HTMLButtonElement> {
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarControl = ({ setIsCollapsed, ...props }: SidebarControlProps) => {
  return (
    <button
      className="rounded-lg p-2 transition duration-300 hover:bg-black-600"
      onClick={() => setIsCollapsed((prev) => !prev)}
      {...props}
    >
      <ChevronLeftIcon
        className={cn("h-5 w-5 transition-all duration-700 group-[.is-collapsed]/sidebar:rotate-180")}
      />
    </button>
  );
};

export default SidebarControl;
