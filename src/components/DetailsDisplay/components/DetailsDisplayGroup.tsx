import { Heading } from "@components";
import { DetailGroup } from "@types";
import DetailsDisplayItem from "./DetailsDisplayItem";

interface DetailsDisplayGroupProps extends DetailGroup {}

const DetailsDisplayGroup = ({ title = "", linkTo = "", fields = null }: DetailsDisplayGroupProps) => {
  if (!fields) return null;

  return (
    <div className="flex max-w-[16rem] flex-1 flex-col gap-4">
      <Heading title={title} linkTo={linkTo} />
      <div className="flex flex-col gap-3.5 pl-3.5">
        {fields.map(({ label, value, variant }) => (
          <DetailsDisplayItem key={label} label={label} value={value} variant={variant} />
        ))}
      </div>
    </div>
  );
};

export default DetailsDisplayGroup;
