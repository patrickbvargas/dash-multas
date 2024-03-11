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
      icon: <ChartPieIcon className="h-6" />,
      label: "Dashboard",
    },
    {
      to: "/calendario",
      icon: <CalendarIcon className="h-6" />,
      label: "Calendário",
    },
  ],
  [
    {
      to: "/administrativo",
      icon: <FolderOpenIcon className="h-6" />,
      label: "Administrativo",
    },
    {
      to: "/judicial",
      icon: <WalletIcon className="h-6" />,
      label: "Judicial",
    },
    {
      to: "/juridico",
      icon: <BriefcaseIcon className="h-6" />,
      label: "Jurídico",
    },
  ],
  [
    {
      to: "/recursos",
      icon: <InboxIcon className="h-6" />,
      label: "Recursos",
    },
    {
      to: "/condutores",
      icon: <UserIcon className="h-6" />,
      label: "Condutores",
    },
    {
      to: "/infracoes",
      icon: <DocumentIcon className="h-6" />,
      label: "Infrações",
    },
  ],
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

// TODO: refatore
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
