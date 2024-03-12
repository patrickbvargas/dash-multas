export interface FormPage {
  title: string;
  validationFn: () => Promise<boolean>;
  fields: React.ReactElement[];
}
