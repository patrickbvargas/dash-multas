import React from "react";
import { cn } from "@utils";
import { VariantProps, cva } from "class-variance-authority";

const tagVariants = cva(
  "rounded-md px-2.5 py-1 text-xs font-medium uppercase text-white place-self-end truncate",
  {
    variants: {
      variant: {
        default: [
          "outline outline-1 text-gray-500 outline-gray-400 dark:text-black-100 dark:outline-black-100",
        ],
        judicial: ["bg-judicial-light dark:bg-judicial-dark"],
        juridico: ["bg-juridico-light dark:bg-juridico-dark"],
        liberado: ["bg-liberado-light dark:bg-liberado-dark"],
        administrativo: ["bg-administrativo-light dark:bg-administrativo-dark"],
        autosuspensiva: ["bg-autosuspensiva-light dark:bg-autosuspensiva-dark"],
      },
    },
  },
);

interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  label: string;
}

const Tag = ({ label = "", variant = "default", className = "", ...props }: TagProps) => {
  return (
    <span className={cn(tagVariants({ variant }), className)} {...props}>
      {label}
    </span>
  );
};

export default Tag;
