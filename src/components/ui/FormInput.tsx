import React from "react";
import FormLabel from "./FormLabel";
import FormFeedback from "./FormFeedback";
import { cn } from "@utils";
import { FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  key: string;
  label: string;
  error: FieldError | undefined;
  isOpcional?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label = "", error = undefined, isOpcional = false, className = "", ...props }: FormInputProps, ref) => {
    return (
      <div className="grid flex-1 content-start gap-1.5 text-sm">
        <FormLabel id={label} label={label} isOpcional={isOpcional} />
        <input
          ref={ref}
          className={cn(
            "h-9 truncate rounded px-3.5 py-2 text-sm font-normal ring-1 focus:outline-none focus:ring-2 disabled:cursor-not-allowed",
            "bg-white text-gray-500 ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300",
            "dark:bg-black-600 dark:text-black-100 dark:ring-black-500 dark:placeholder:text-black-400 dark:read-only:text-black-300 dark:hover:ring-black-300",
            error?.message && "ring-red-500  dark:ring-red-700",
            className,
          )}
          id={label}
          required={!isOpcional}
          {...props}
        />
        {error?.message && <FormFeedback message={error.message} />}
      </div>
    );
  },
);

export default FormInput;
