import FormStepItem from "./components/FormStepItem";

interface FormStepProps {
  currentPageIndex: number;
  title: string;
  labels: string[];
}

const FormStep = ({ currentPageIndex = 0, title = "", labels = [] }: FormStepProps) => {
  return (
    <div className="bg-black-800 p-4 sm:flex sm:w-44 sm:flex-col sm:gap-8 sm:pl-6 sm:pr-4 sm:pt-12">
      <h2 className="text-base font-medium uppercase text-black-50">{title}</h2>
      <ul className="hidden flex-col gap-6 sm:flex">
        {labels.map((label, index) => (
          <FormStepItem index={index} currentPageIndex={currentPageIndex} label={label} key={label} />
        ))}
      </ul>
    </div>
  );
};

export default FormStep;
