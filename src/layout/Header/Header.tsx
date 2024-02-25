import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@components";
import { PlusIcon } from "@icons/mini";
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

// TODO: review
const Header = ({ className = "", ...props }: HeaderProps) => {
  const { pageTitle, setPageTitle, showNotification } = useAppContext();
  const location = useLocation();

  React.useEffect(() => {
    const matchConfig = PATHNAME_CONFIG.find(({ pathname }) => pathname === location.pathname);
    if (matchConfig) {
      setPageTitle(matchConfig.title);
      document.title = `Dash Multas | ${matchConfig.title}`;
    }
  }, [location]);

  const handleClick = () => {
    showNotification("Quase lá! Estamos implementando esta funcionalidade.", "warning");
  };

  return (
    <header
      className="flex flex-col items-center justify-between gap-4 overflow-hidden px-2 pb-2 pt-4 sm:flex-row sm:px-8 sm:pb-4 sm:pt-8"
      {...props}
    >
      <h1 className="max-w-full truncate text-2xl font-normal uppercase tracking-wider text-gray-600 dark:text-black-50">
        {pageTitle}
      </h1>
      <Button label="Criar" icon={<PlusIcon className="h-5" />} type="startIcon" onClick={handleClick} />
    </header>
  );
};

export default Header;
