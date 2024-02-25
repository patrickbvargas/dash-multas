import React from "react";
import { cn } from "@utils";
import { Heading, Tag } from "@components";
import { AppealStatusGroup } from "@types";

interface KpiProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  linkTo?: string | null;
  variant?: "tag" | "default";
  tagVariant?: AppealStatusGroup;
}

const Kpi = ({
  title = "",
  value = "",
  linkTo = null,
  variant = "default",
  tagVariant = "administrativo",
  className = "",
  ...props
}: KpiProps) => {
  const renderData = () => {
    return variant === "tag" ? (
      <Tag className="place-self-start" label={value} variant={tagVariant} />
    ) : (
      <p className="text-sm font-medium text-gray-600 dark:text-white">{value}</p>
    );
  };

  return (
    <div className={cn("flex max-w-full flex-col gap-2", className)} {...props}>
      <Heading title={title} linkTo={linkTo} />
      <div className="pl-3.5">{renderData()}</div>
    </div>
  );
};

export default Kpi;
