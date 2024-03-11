import React from "react";
import { cn } from "@utils";
import { MainRoutes } from "@routes";
import { useModalContext } from "@hooks";
import { Welcome } from "@components";

interface ContentProps extends React.HTMLAttributes<HTMLElement> {}

const Content = ({ className = "", ...props }: ContentProps) => {
  const { openModal } = useModalContext();

  React.useEffect(() => {
    openModal({
      component: <Welcome />,
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
