import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import FormStepIcon from "./FormStepIcon";
import { cn } from "@utils";

const formStepItemVariants = cva("text-sm font-medium leading-tight transition-colors duration-500", {
  variants: {
    variant: {
      enable: "text-black-50",
      disable: "text-black-200",
    },
  },
});

interface FormStepItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof formStepItemVariants> {
  label: string;
  index: number;
  currentPageIndex: number;
}
const FormStepItem = ({
  label = "",
  index = 0,
  currentPageIndex = 0,
  variant,
  className = "",
  ...props
}: FormStepItemProps) => {
  variant = index <= currentPageIndex ? "enable" : "disable";

  return (
    <li className={cn(formStepItemVariants({ variant }), className)} {...props}>
      <div className="flex items-center gap-2" key={label}>
        <FormStepIcon index={index} currentPageIndex={currentPageIndex} />
        {label}
      </div>
    </li>
  );
};

export default FormStepItem;
