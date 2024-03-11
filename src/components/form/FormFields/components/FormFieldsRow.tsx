import React from "react";

interface FormFieldRowProps {
  fields: React.ReactElement[];
}

const FormFieldRow = ({ fields }: FormFieldRowProps) => {
  return (
    <div className="flex gap-4">
      {fields.map((field) => (
        <React.Fragment key={field.key}>{field}</React.Fragment>
      ))}
    </div>
  );
};

export default FormFieldRow;
