import React from "react";
import { useAppContext } from "@hooks";
import { cn } from "@utils";

interface DetailsPageWrapper extends React.HTMLAttributes<HTMLElement> {
  pageTitle: string;
  pageKpi: React.ReactNode;
  pageActions: React.ReactNode;
  pageData: React.ReactNode;
  pageTag?: React.ReactNode;
}

const DetailsPageWrapper = ({
  pageTitle = "",
  pageKpi = null,
  pageActions = null,
  pageData = null,
  pageTag = null,
}: DetailsPageWrapper) => {
  const { setPageTitle } = useAppContext();

  React.useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  return (
    <section
      className={cn(
        "flex h-full max-w-full flex-col gap-6 rounded-lg p-4 sm:px-6 sm:py-5",
        "bg-white",
        "dark:bg-black-700",
      )}
    >
      {pageTag ? <div className="pl-3.5">{pageTag}</div> : null}
      <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:gap-5">
        {pageKpi}
        {pageActions}
      </div>
      {pageData}
    </section>
  );
};

export default DetailsPageWrapper;
