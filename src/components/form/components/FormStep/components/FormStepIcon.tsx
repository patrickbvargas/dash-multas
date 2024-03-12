import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils";

const formStepIconVariants = cva("h-5 w-1 rounded-e-md transition-all duration-500", {
  variants: {
    variant: {
      success: "bg-accent",
      enable: "bg-accent animate-pulse",
      disable: "bg-black-500",
    },
  },
});

interface FormStepIconProps extends VariantProps<typeof formStepIconVariants> {
  index: number;
  currentPageIndex: number;
}

const FormStepIcon = ({ index = 0, currentPageIndex = 0, variant }: FormStepIconProps) => {
  variant = index < currentPageIndex ? "success" : index === currentPageIndex ? "enable" : "disable";

  return <span className={cn(formStepIconVariants({ variant }))} />;
};

export default FormStepIcon;
