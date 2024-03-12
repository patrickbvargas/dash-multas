import React from "react";
import FormStep from "./FormStep/FormStep";
import FormControls from "./FormControls";
import { cn } from "@utils";
import { FormPage } from "@types";

interface FormRootProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title: string;
  formPages: FormPage[];
  isUpdate: boolean;
  isSubmitting: boolean;
  submitCallback: () => void;
}

const FormRoot = ({
  title = "",
  formPages,
  isUpdate = false,
  isSubmitting = false,
  submitCallback,
}: FormRootProps) => {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  const handleNextPage = async () => {
    const isPageFieldValid = await formPages[currentPageIndex].validationFn();
    if (isPageFieldValid) setCurrentPageIndex((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPageIndex((prev) => prev - 1);
  };

  return (
    <section className="flex w-fit overflow-hidden rounded-lg sm:h-[32rem]">
      <FormStep
        currentPageIndex={currentPageIndex}
        title={title}
        labels={formPages.map((page) => page.title)}
      />
      <form
        className={cn(
          "flex w-full flex-col items-end gap-4 overflow-auto px-8 pb-4 pt-12 sm:w-[30rem]",
          "bg-gray-50",
          "dark:bg-black-700",
        )}
      >
        {formPages[currentPageIndex].component}
        <FormControls
          currentPageIndex={currentPageIndex}
          lastPageIndex={formPages.length - 1}
          isUpdate={isUpdate}
          isSubmitting={isSubmitting}
          previousCallback={handlePreviousPage}
          nextCallback={handleNextPage}
          submitCallback={submitCallback}
        />
      </form>
    </section>
  );
};

export default FormRoot;
