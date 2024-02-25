import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils";

const controlActionVariants = cva("text-gray-400 dark:text-black-200", {
  variants: {
    variant: {
      default: "hover:text-gray-500 dark:hover:text-black-300",
      edit: "hover:text-sky-400 dark:hover:text-sky-400",
      delete: "hover:text-red-400 dark:hover:text-red-400",
    },
    size: {
      default: "h-5",
      large: "h-6",
    },
  },
});

interface ControlActionProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof controlActionVariants> {
  icon: React.ReactNode;
}

const ControlAction = ({
  icon = null,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ControlActionProps) => {
  return (
    <button
      className={cn("transition duration-300", controlActionVariants({ variant, size }), className)}
      {...props}
    >
      {icon}
    </button>
  );
};

export default ControlAction;
