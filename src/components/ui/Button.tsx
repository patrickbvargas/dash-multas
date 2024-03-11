import React from "react";
import { cn } from "@utils";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "border-transparent transition duration-300 inline-flex items-center justify-center gap-1 sm:gap-2 rounded-lg text-base font-medium focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-purple-50 focus:ring-purple-700 hover:bg-purple-500 disabled:opacity-60",
        ghost:
          "bg-none text-black-300 hover:bg-gray-200 focus:ring-gray-300 dark:text-black-50 dark:hover:bg-black-600 dark:focus:ring-black-500",
        theme: "bg-none text-black-50 hover:bg-black-600 focus:ring-black-500",
        sidebar: "text-black-100 hover:bg-black-600 hover:text-black-50",
        danger: "bg-red-600 hover:bg-red-700 dark:bg-red-700 text-white dark:hover:bg-red-800",
      },
      iconStyle: {
        default: "px-2 py-1 sm:px-4 sm:py-2",
        onlyIcon: "p-1 sm:p-2",
        startIcon: "pl-2 pr-3 py-1 sm:pl-3 sm:pr-4 sm:py-2",
        endIcon: "pl-3 pr-2 py-1 sm:pl-4 sm:pr-3 sm:py-2 flex-row-reverse",
      },
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: React.ReactNode;
}

const Button = ({
  label = "",
  icon = null,
  variant = "primary",
  iconStyle = "default",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, iconStyle }), className)} {...props}>
      {icon}
      {label}
    </button>
  );
};

export default Button;
