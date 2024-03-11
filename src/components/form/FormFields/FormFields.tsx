import FormFieldRow from "./components/FormFieldsRow";
import { Heading } from "@components";
import { FormPage } from "@types";

interface FormFieldsProps {
  formPage: FormPage;
}

const FormFields = ({ formPage }: FormFieldsProps) => {
  const renderFormFields = () => {
    return (
      <div className="grid gap-4">
        <Heading title={formPage.title} />
        {formPage.fields.map((fields, index) => (
          <FormFieldRow key={index} fields={fields} />
        ))}
      </div>
    );
  };

  return <section className="grid w-full gap-4">{renderFormFields()}</section>;
};

export default FormFields;
