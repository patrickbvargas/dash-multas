import React from "react";
import { cn } from "@utils";
import { NavLink } from "react-router-dom";

export interface SidebarNavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarNavLink = ({
  to = "",
  icon = null,
  label = "",
  className = "",
  ...props
}: SidebarNavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={cn(
        "group/link relative grid cursor-pointer grid-cols-layout items-center gap-3 rounded-lg p-2 text-black-100 transition duration-300 hover:bg-black-500 hover:text-black-50 dark:hover:bg-black-600 [&.active]:bg-black-500 [&.active]:text-black-50",
        className,
      )}
      {...props}
    >
      <div className="w-6">{icon}</div>
      <p className="text-sm font-normal transition-opacity duration-300 group-[.is-collapsed]/sidebar:pointer-events-none group-[.is-collapsed]/sidebar:opacity-0">
        {label}
      </p>
      <span className="pointer-events-none absolute left-full ml-2 flex h-10 items-center rounded-lg bg-black-500 px-3.5 text-sm font-normal text-black-50 opacity-0 transition duration-300 group-[.is-collapsed]/sidebar:group-hover/link:opacity-100 dark:bg-black-600">
        {label}
      </span>
    </NavLink>
  );
};

export default SidebarNavLink;
