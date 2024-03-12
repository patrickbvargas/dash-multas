import React from "react";
import { cn } from "@utils";
import { FormPage } from "@types";
import FormControls from "./components/FormControls";
import FormStep from "./components/FormStep/FormStep";
import FormPageWrapper from "./components/FormPageWrapper";

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
    <section className="flex max-h-[98vh] w-[90vw] flex-col overflow-hidden rounded-lg sm:h-[32rem] sm:w-auto sm:flex-row">
      <FormStep
        currentPageIndex={currentPageIndex}
        title={title}
        labels={formPages.map((page) => page.title)}
      />
      <form
        className={cn(
          "flex w-full flex-col items-end gap-4 overflow-y-scroll pb-4 sm:w-[30rem] sm:px-8 sm:pt-12",
          "bg-gray-50",
          "dark:bg-black-700",
        )}
      >
        <FormPageWrapper page={formPages[currentPageIndex]} />
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
