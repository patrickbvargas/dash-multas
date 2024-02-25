import { DetailField } from "@types";
import { cn } from "@utils";
import { EyeSlashIcon } from "@icons/mini";

interface DetailsDisplayItemProps extends DetailField {}

const DetailsDisplayItem = ({ label = "", value = "", variant = "default" }: DetailsDisplayItemProps) => {
  const isPassword = variant === "password";

  return (
    <dl className="flex flex-col gap-1.5">
      <dt className="truncate text-sm font-medium text-gray-500 dark:text-black-100">{label}</dt>
      <div className="group/value flex gap-4 text-gray-500 dark:text-black-100">
        {isPassword && <EyeSlashIcon className="h-5" />}
        <dd
          className={cn(
            "truncate text-sm font-normal",
            isPassword && "opacity-0 transition-opacity duration-300 group-hover/value:opacity-100",
          )}
        >
          {value}
        </dd>
      </div>
    </dl>
  );
};

export default DetailsDisplayItem;
