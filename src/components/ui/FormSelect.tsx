import { cn } from "@utils";
import React from "react";
import FormLabel from "./FormLabel";
import FormFeedback from "./FormFeedback";
import { FieldError } from "react-hook-form";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  key: string;
  label: string;
  options: { value: string; label: string }[] | undefined;
  error: FieldError | undefined;
  isOpcional?: boolean;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label = "",
      options = undefined,
      error = undefined,
      isOpcional = false,
      className = "",
      ...props
    }: FormSelectProps,
    ref,
  ) => {
    return (
      <div className="grid flex-1 content-start gap-1.5 text-sm">
        <FormLabel id={label} label={label} isOpcional={isOpcional} />
        <select
          ref={ref}
          className={cn(
            "h-9 appearance-none truncate rounded px-3.5 py-2 text-sm font-normal ring-1 focus:outline-none focus:ring-2 disabled:cursor-not-allowed",
            "bg-white text-gray-500 ring-gray-200 hover:ring-gray-300",
            "dark:bg-black-600 dark:text-black-100 dark:ring-black-500 dark:hover:ring-black-300",
            error?.message && "ring-red-500  dark:ring-red-700",
            className,
          )}
          id={label}
          required={!isOpcional}
          defaultValue={""}
          {...props}
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          {options?.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        {error?.message && <FormFeedback message={error.message} />}
      </div>
    );
  },
);

export default FormSelect;
