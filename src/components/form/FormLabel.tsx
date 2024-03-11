import { cn } from "@utils";
import React from "react";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  label: string;
  isOpcional: boolean;
}

const FormLabel = ({ id = "", label = "", isOpcional = false, className = "", ...props }: FormLabelProps) => {
  return (
    <label
      className={cn("flex gap-1.5 truncate font-medium", "text-gray-500", "dark:text-black-100")}
      htmlFor={id}
      {...props}
    >
      {label}
      {isOpcional && <span className="text-gray-400 dark:text-black-200">(opcional)</span>}
    </label>
  );
};

export default FormLabel;
