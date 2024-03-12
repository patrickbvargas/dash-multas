import React from "react";

interface FormFieldRowProps {
  fields: React.ReactElement[];
}

const FormFieldRow = ({ fields }: FormFieldRowProps) => {
  return (
    <div className="gap-4 sm:flex">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-2">
          {field}
        </div>
      ))}
    </div>
  );
};

export default FormFieldRow;
