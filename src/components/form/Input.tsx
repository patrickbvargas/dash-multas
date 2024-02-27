import React from "react";
import { cn } from "@utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Input = ({ id = "", label = "", required = false, className = "", ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="flex gap-2 font-medium text-gray-500 dark:text-black-100" htmlFor={id}>
        {label}
        {!required && <span className="text-gray-400 dark:text-black-200">(opcional)</span>}
      </label>
      <input
        className={cn(
          "rounded px-3.5 py-2 text-sm font-normal ring-1 focus:outline-none focus:ring-2",
          "bg-white text-gray-500 ring-gray-200 hover:ring-gray-300",
          "dark:bg-black-600 dark:text-black-100  dark:ring-black-500 dark:hover:ring-black-300",
          className,
        )}
        id={id}
        {...props}
      />
    </div>
  );
};

export default Input;
