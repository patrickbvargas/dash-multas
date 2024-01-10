import React from "react";
import { Button, ThemeSwitcher } from "@components";
import { PlusIcon } from "@icons/mini";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@contexts";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

interface Pathname {
  pathname: string;
  title: string;
}

const PATHNAME_CONFIG: Pathname[] = [
  {
    pathname: "/",
    title: "Dashboard",
  },
  {
    pathname: "/calendario",
    title: "Calendário",
  },
  {
    pathname: "/administrativo",
    title: "Administrativo",
  },
  {
    pathname: "/judicial",
    title: "Judicial",
  },
  {
    pathname: "/juridico",
    title: "Jurídico",
  },

  {
    pathname: "/recursos",
    title: "Recursos",
  },
  {
    pathname: "/condutores",
    title: "Condutores",
  },
  {
    pathname: "/infracoes",
    title: "Infrações",
  },
];

// TODO: check pathname config
const Header = ({ className = "", ...props }: HeaderProps) => {
  const { pageTitle, setPageTitle } = useAppContext();
  const location = useLocation();

  React.useEffect(() => {
    const matchConfig = PATHNAME_CONFIG.find(({ pathname }) => pathname === location.pathname);
    if (matchConfig) {
      setPageTitle(matchConfig.title);
      document.title = `Empresa | ${matchConfig.title}`;
    }
  }, [location]);

  return (
    <header className="flex items-center justify-between px-8 pb-4 pt-8" {...props}>
      <h1 className="text-2xl font-normal uppercase tracking-wider text-gray-600 dark:text-black-50">
        {pageTitle}
      </h1>
      <div className="flex gap-2">
        <ThemeSwitcher />
        <Button label="Criar" icon={<PlusIcon className="h-5 w-5" />} type="startIcon" />
      </div>
    </header>
  );
};

export default Header;
