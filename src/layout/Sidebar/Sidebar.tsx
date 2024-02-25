import React from "react";
import SidebarLogo from "./components/SidebarLogo";
import SidebarNav from "./components/SidebarNav/SidebarNav";
import SidebarControl from "./components/SidebarControl";
import { cn } from "@utils";
import { useLocalStorage } from "@hooks";
import { useAppContext } from "@contexts";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const Sidebar = ({ className = "", ...props }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage("sidebar-collapsed", false);
  const { showNotification } = useAppContext();

  const handleCollapse = () => {
    if (window.matchMedia("(max-width: 600px").matches) {
      showNotification(
        "Para uma experiência mais completa, recomendamos utilizar um computador para navegar.",
        "info",
      );
      setIsCollapsed(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleCollapse);
    return () => window.removeEventListener("resize", handleCollapse);
  }, []);

  return (
    <aside
      className={cn(
        "group/sidebar flex h-full w-[12.5rem] flex-col items-center gap-8 bg-black-700 px-4 py-9 text-black-100 transition-all duration-500 ease-in-out dark:bg-black-900 [&.is-collapsed]:w-[4.5rem]",
        className,
        isCollapsed && "is-collapsed",
      )}
      {...props}
    >
      <SidebarLogo />
      <SidebarNav />

      <SidebarControl setIsCollapsed={setIsCollapsed} />
    </aside>
  );
};

export default Sidebar;
