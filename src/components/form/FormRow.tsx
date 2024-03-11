import React from "react";

interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormRow = ({}: FormRowProps) => {
  return <div className="flex gap-4" />;
};

export default FormRow;
