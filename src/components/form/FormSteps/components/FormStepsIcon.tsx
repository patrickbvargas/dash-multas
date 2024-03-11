import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils";

const formStepsIconVariants = cva("h-5 w-1 rounded-e-md transition-all duration-500", {
  variants: {
    variant: {
      success: "bg-accent",
      enable: "bg-accent animate-pulse",
      disable: "bg-black-500",
    },
  },
});

interface FormStepsIconProps extends VariantProps<typeof formStepsIconVariants> {
  index: number;
  currentPageIndex: number;
}

const FormStepsIcon = ({ index = 0, currentPageIndex = 0, variant }: FormStepsIconProps) => {
  variant = index < currentPageIndex ? "success" : index === currentPageIndex ? "enable" : "disable";

  return <span className={cn(formStepsIconVariants({ variant }))} />;
};

export default FormStepsIcon;
