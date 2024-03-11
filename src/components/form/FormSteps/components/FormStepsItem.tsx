import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import FormStepsIcon from "./FormStepsIcon";
import { cn } from "@utils";

const formStepsItemVariants = cva("text-sm font-medium leading-tight transition-colors duration-500", {
  variants: {
    variant: {
      enable: "text-black-50",
      disable: "text-black-200",
    },
  },
});

interface FormStepsItemProps extends React.LiHTMLAttributes<HTMLLIElement>, VariantProps<typeof formStepsItemVariants> {
  label: string;
  index: number;
  currentPageIndex: number;
}
const FormStepsItem = ({ label = "", index = 0, currentPageIndex = 0, variant, className = "", ...props }: FormStepsItemProps) => {
  variant = index <= currentPageIndex ? "enable" : "disable";

  return (
    <li className={cn(formStepsItemVariants({ variant }), className)} {...props}>
      <div className="flex items-center gap-2" key={label}>
        <FormStepsIcon index={index} currentPageIndex={currentPageIndex} />
        {label}
      </div>
    </li>
  );
};

export default FormStepsItem;
