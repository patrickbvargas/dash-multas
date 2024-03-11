import FormStepsItem from "./components/FormStepsItem";

interface FormStepsProps {
  currentPageIndex: number;
  title: string;
  labels: string[];
}

const FormSteps = ({ currentPageIndex = 0, title = "", labels = [] }: FormStepsProps) => {
  return (
    <div className="flex w-44 flex-col gap-8 bg-black-800 pl-6 pr-4 pt-12">
      <h2 className="text-base font-medium uppercase text-black-50">{title}</h2>
      <ul className="flex flex-col gap-6">
        {labels.map((label, index) => (
          <FormStepsItem index={index} currentPageIndex={currentPageIndex} label={label} key={label} />
        ))}
      </ul>
    </div>
  );
};

export default FormSteps;
