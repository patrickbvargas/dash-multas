import React from "react";
import SidebarNavLink from "./components/SidebarNavLink";
import SidebarNavDivider from "./components/SidebarNavDivider";
import {
  ChartPieIcon,
  CalendarIcon,
  FolderOpenIcon,
  BriefcaseIcon,
  InboxIcon,
  UserIcon,
  DocumentIcon,
  WalletIcon,
} from "@icons/solid";
import { cn } from "@utils";

interface NavLink {
  to: string;
  icon: React.ReactNode;
  label: string;
}

type NavGroup = NavLink[];

const NAV_LINKS: NavGroup[] = [
  [
    {
      to: "/",
      icon: <ChartPieIcon />,
      label: "Dashboard",
    },
    {
      to: "/calendario",
      icon: <CalendarIcon />,
      label: "Calendário",
    },
  ],
  [
    {
      to: "/administrativo",
      icon: <FolderOpenIcon />,
      label: "Administrativo",
    },
    {
      to: "/judicial",
      icon: <WalletIcon />,
      label: "Judicial",
    },
    {
      to: "/juridico",
      icon: <BriefcaseIcon />,
      label: "Jurídico",
    },
  ],
  [
    {
      to: "/recursos",
      icon: <InboxIcon />,
      label: "Recursos",
    },
    {
      to: "/condutores",
      icon: <UserIcon />,
      label: "Condutores",
    },
    {
      to: "/infracoes",
      icon: <DocumentIcon />,
      label: "Infrações",
    },
  ],
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

// TODO: review
const SidebarNav = ({ className = "", ...props }: SidebarNavProps) => {
  return (
    <nav className="w-full flex-1" {...props}>
      <ul className={cn("flex flex-col gap-3", className)}>
        {NAV_LINKS.map((group, index) => (
          <React.Fragment key={index}>
            {group.map(({ to, icon, label }) => (
              <li key={label}>
                <SidebarNavLink to={to} icon={icon} label={label} />
              </li>
            ))}
            {index < NAV_LINKS.length - 1 && (
              <li key={`divider-${index}`}>
                <SidebarNavDivider />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
