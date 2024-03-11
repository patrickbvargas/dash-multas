import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@utils";
import { useAppContext } from "@hooks";
import { CreateMenu } from "@components";

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
]; // TODO: import info from sideBar nav

// TODO: review
const Header = ({ className = "", ...props }: HeaderProps) => {
  const { pageTitle, setPageTitle } = useAppContext();
  const location = useLocation();

  React.useEffect(() => {
    const matchConfig = PATHNAME_CONFIG.find(({ pathname }) => pathname === location.pathname);
    if (matchConfig) {
      setPageTitle(matchConfig.title);
      document.title = `Dash Multas | ${matchConfig.title}`;
    }
  }, [location]);

  return (
    <header
      className={cn(
        "flex flex-col items-center justify-between gap-4 px-2 pb-2 pt-4 sm:flex-row sm:px-8 sm:pb-4 sm:pt-8",
        className,
      )}
      {...props}
    >
      <h1
        className={cn(
          "max-w-full truncate text-2xl font-normal uppercase tracking-wider",
          "text-gray-600",
          "dark:text-black-50",
        )}
      >
        {pageTitle}
      </h1>
      <div className="flex gap-2">
        <CreateMenu />
      </div>
    </header>
  );
};

export default Header;
