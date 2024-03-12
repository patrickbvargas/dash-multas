import React from "react";
import { FormSteps, FormFields, FormControls } from "@components";
import { FormPage } from "@types";
import { cn } from "@utils";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title: string;
  formPages: FormPage[];
  isUpdate: boolean;
  isSubmitting: boolean;
  submitCallback: () => void;
}

const Form = ({
  title = "",
  formPages,
  isUpdate = false,
  isSubmitting = false,
  submitCallback,
}: FormProps) => {
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
      {/* <FormSteps
        currentPageIndex={currentPageIndex}
        title={title}
        labels={formPages.map((page) => page.title)}
      /> */}
      <form
        className={cn(
          "flex w-full flex-col items-end gap-4 overflow-auto px-8 pb-4 pt-12 sm:w-[30rem]",
          "bg-gray-50",
          "dark:bg-black-700",
        )}
      >
        <FormFields formPage={formPages[currentPageIndex]} />
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

export default Form;
