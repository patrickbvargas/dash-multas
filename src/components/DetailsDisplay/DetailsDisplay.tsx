import React from "react";
import { cn } from "@utils";
import { DetailGroup } from "@types";
import DataDisplayGroup from "./components/DetailsDisplayGroup";

interface DetailsDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DetailGroup[] | null;
}

const DetailsDisplay = ({ data = null, className = "", ...props }: DetailsDisplayProps) => {
  if (!data) return null;

  const renderData = () => {
    return data.map(({ title, linkTo, fields }) => (
      <DataDisplayGroup key={title} title={title} linkTo={linkTo} fields={fields} />
    ));
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 overflow-x-hidden overflow-y-scroll sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {renderData()}
    </div>
  );
};

export default DetailsDisplay;
