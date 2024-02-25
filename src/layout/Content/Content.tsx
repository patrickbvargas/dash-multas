import React from "react";
import { cn } from "@utils";
import { MainRoutes } from "@routes";
import { NotificationBanner } from "@components";
import { useAppContext } from "@contexts";

interface ContentProps extends React.HTMLAttributes<HTMLElement> {}

const Content = ({ className = "", ...props }: ContentProps) => {
  const { notificationConfig, showNotification } = useAppContext();

  React.useEffect(() => {
    showNotification(
      "Este site contém dados fictícios para fins de demonstração e não representa informações reais.",
      "info",
    );
  }, []);

  return (
    <main
      className={cn(
        "flex h-full flex-col gap-5 overflow-hidden px-2 py-2 sm:pb-8 sm:pl-4 sm:pr-8 sm:pt-4",
        className,
      )}
      {...props}
    >
      {notificationConfig.message ? <NotificationBanner /> : null}
      <MainRoutes />
    </main>
  );
};

export default Content;
