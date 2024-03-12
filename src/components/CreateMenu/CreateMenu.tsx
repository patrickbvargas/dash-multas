import React from "react";
import { cn } from "@utils";
import { PlusIcon } from "@icons/mini";
import { UserIcon } from "@icons/solid";
import { useModalContext } from "@hooks";
import { Button, DriverForm } from "@components";

interface Entitys {
  name: string;
  icon: React.ReactElement;
  onClick: () => void;
}

const CreateMenu = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { openModal } = useModalContext();
  let timer: number | null = null;

  const handleOpenMenu = () => {
    if (isVisible) return;
    setIsVisible(true);
    timer = window.setTimeout(() => {
      setIsVisible(false);
      if (timer) clearTimeout(timer);
    }, 3000);
  };

  const entitys: Entitys[] = [
    {
      name: "Condutor",
      icon: <UserIcon className="h-5" />,
      onClick: () => openModal({ component: <DriverForm initialDriver={null} /> }),
    },
  ];

  return (
    <div className="relative">
      <Button
        label="Criar"
        icon={<PlusIcon className="h-5" />}
        iconStyle="startIcon"
        onClick={handleOpenMenu}
      />
      <div
        className={cn(
          "pointer-events-none absolute top-12 rounded-lg p-2 opacity-0 ring-2 transition-opacity duration-300 sm:right-0",
          "bg-white shadow-sm ring-gray-200",
          "dark:bg-black-700 dark:ring-black-600",
          isVisible && "pointer-events-auto opacity-100",
        )}
      >
        <ul className="flex flex-col gap-2">
          {entitys.map((entity) => (
            <li
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg p-2 pr-4 text-sm font-normal transition-all duration-300",
                "text-gray-700 hover:bg-black-50",
                "dark:text-black-50 dark:hover:bg-black-600",
              )}
              key={entity.name}
              onClick={entity.onClick}
            >
              {entity.icon}
              {entity.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateMenu;
