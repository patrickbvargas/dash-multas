import React from "react";
import { cn } from "@utils";
import { MainRoutes } from "@routes";
import { useNotificationContext } from "@hooks";

interface ContentProps extends React.HTMLAttributes<HTMLElement> {}

const Content = ({ className = "", ...props }: ContentProps) => {
  const { showNotification } = useNotificationContext();

  React.useEffect(() => {
    // TODO: implement welcome modal page
    showNotification({
      message:
        "Este site contém dados fictícios para fins de demonstração e não representa informações reais.",
      variant: "info",
    });
  }, []);

  return (
    <main
      className={cn(
        "flex h-full flex-col gap-5 overflow-hidden px-2 py-2 sm:pb-8 sm:pl-4 sm:pr-8 sm:pt-4",
        className,
      )}
      {...props}
    >
      <MainRoutes />
    </main>
  );
};

export default Content;
