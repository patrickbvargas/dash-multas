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
import { HeroIcon } from "@types";

interface NavLink {
  href: string;
  label: string;
  Icon: HeroIcon;
}

type NavGroup = NavLink[];

const links: NavGroup[] = [
  [
    {
      href: "/",
      label: "Dashboard",
      Icon: ChartPieIcon,
    },
    {
      href: "/calendario",
      label: "Calendário",
      Icon: CalendarIcon,
    },
  ],
  [
    {
      href: "/administrativo",
      label: "Administrativo",
      Icon: FolderOpenIcon,
    },
    {
      href: "/judicial",
      label: "Judicial",
      Icon: WalletIcon,
    },
    {
      href: "/juridico",
      label: "Jurídico",
      Icon: BriefcaseIcon,
    },
  ],
  [
    {
      href: "/recursos",
      label: "Recursos",
      Icon: InboxIcon,
    },
    {
      href: "/condutores",
      label: "Condutores",
      Icon: UserIcon,
    },
    {
      href: "/infracoes",
      label: "Infrações",
      Icon: DocumentIcon,
    },
  ],
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

// TODO: refatore
const SidebarNav = ({ className = "", ...props }: SidebarNavProps) => {
  return (
    <nav className="w-full flex-1" {...props}>
      <ul className={cn("flex flex-col gap-3", className)}>
        {links.map((group, index) => (
          <React.Fragment key={index}>
            {group.map(({ href, label, Icon }) => (
              <li key={label}>
                <SidebarNavLink href={href} label={label} Icon={Icon} />
              </li>
            ))}
            {index < links.length - 1 && (
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
