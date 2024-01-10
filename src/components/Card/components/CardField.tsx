import React from "react";
import { cn } from "@utils";
import { VariantProps, cva } from "class-variance-authority";

const cardFieldVariants = cva(" text-xs truncate", {
  variants: {
    variant: {
      default: "font-normal",
      highlight: "font-semibold",
    },
  },
});

interface CardFieldProps
  extends React.HTMLAttributes<HTMLDListElement>,
    VariantProps<typeof cardFieldVariants> {
  label: string;
  value: string | number;
}

const CardField = ({
  label = "",
  value = "",
  variant = "default",
  className = "",
  ...props
}: CardFieldProps) => {
  return (
    <dl className={cn("flex flex-col gap-1 text-gray-500 dark:text-black-100", className)} {...props}>
      <dt className="truncate text-xs font-normal uppercase">{label}</dt>
      <dd className={cardFieldVariants({ variant })}>{value}</dd>
    </dl>
  );
};

export default CardField;
