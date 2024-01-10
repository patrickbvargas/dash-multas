import React from "react";
import { cn } from "@utils";
import { VariantProps, cva } from "class-variance-authority";

//focus:ring
// TODO: check focus style
const buttonVariants = cva(
  "border-transparent transition duration-300 inline-flex items-center justify-center gap-2 rounded-lg text-base font-medium focus:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gray-500 text-gray-100 hover:bg-gray-600 focus:ring-gray-300 dark:bg-accent dark:text-yellow-900 dark:hover:bg-yellow-500 dark:focus:ring-yellow-100",
        ghost:
          "bg-none text-black-600 hover:bg-gray-200 focus:ring-gray-300 dark:text-black-50 dark:hover:bg-black-600 dark:focus:ring-black-500",
        sidebar: "text-black-100 hover:bg-black-600 hover:text-black-50",
      },
      type: {
        default: "px-4 py-2",
        onlyIcon: "p-2",
        startIcon: "pl-3 pr-4 py-2",
        endIcon: "pl-4 pr-3 py-2 flex-row-reverse",
      },
    },
  },
);

// TODO: must required label or icon, at least one
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: React.ReactNode;
}

const Button = ({
  label = "",
  icon = null,
  variant = "primary",
  type = "default",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, type }), className)} {...props}>
      {icon}
      {label}
    </button>
  );
};

export default Button;
