import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@utils";
import { HeroIcon } from "@types";

export interface SidebarNavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  Icon: HeroIcon;
}

const SidebarNavLink = ({ href = "", label = "", Icon, className = "", ...props }: SidebarNavLinkProps) => {
  return (
    <NavLink
      to={href}
      className={cn(
        "group/link relative grid cursor-pointer grid-cols-layout items-center gap-3 rounded-lg p-2 text-black-100 transition duration-300 hover:bg-black-500 hover:text-black-50 dark:hover:bg-black-600 [&.active]:bg-black-500 [&.active]:text-black-50",
        className,
      )}
      {...props}
    >
      <Icon className="h-6" />
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
