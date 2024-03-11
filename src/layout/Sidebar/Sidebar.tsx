import React, { useCallback } from "react";
import SidebarLogo from "./components/SidebarLogo";
import SidebarNav from "./components/SidebarNav/SidebarNav";
import SidebarControl from "./components/SidebarControl";
import { cn } from "@utils";
import { useLocalStorage, useNotificationContext } from "@hooks";
import { ThemeSwitcher } from "@components";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const Sidebar = ({ className = "", ...props }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage("sidebar-collapsed", false);
  const { showNotification } = useNotificationContext();

  const handleCollapse = useCallback(() => {
    if (window.matchMedia("(max-width: 600px").matches) {
      showNotification({
        message: "Para uma experiência mais completa, recomendamos utilizar um computador para navegar.",
        variant: "info",
      });
      setIsCollapsed(true);
    }
  }, [setIsCollapsed, showNotification]);

  React.useEffect(() => {
    window.addEventListener("resize", handleCollapse);
    return () => window.removeEventListener("resize", handleCollapse);
  }, []);

  return (
    <aside
      className={cn(
        "group/sidebar flex h-full w-[12.5rem] flex-col items-center gap-8 px-4 py-9 text-black-100 transition-all duration-500 ease-in-out [&.is-collapsed]:w-[4.5rem]",
        "bg-black-700",
        "dark:bg-black-900",
        isCollapsed && "is-collapsed",
        className,
      )}
      {...props}
    >
      <SidebarLogo />
      <SidebarNav />
      <ThemeSwitcher />
      <SidebarControl setIsCollapsed={setIsCollapsed} />
    </aside>
  );
};

export default Sidebar;
