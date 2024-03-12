import { Heading } from "@components";
import { FormPage } from "@types";
import React from "react";

interface FormPageWrapperProps {
  page: FormPage;
}

const FormPageWrapper = ({ page }: FormPageWrapperProps) => {
  return (
    <div className="flex w-full flex-col gap-4 p-4 sm:p-0 ">
      <Heading title={page.title} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {page.fields.map((field) => (
          <React.Fragment key={field.key}>{field}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormPageWrapper;
