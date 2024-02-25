export interface DetailField {
  label: string;
  value: string | number;
  variant?: "default" | "password";
}

export interface DetailGroup {
  title: string;
  linkTo: string | null;
  fields: DetailField[] | null;
}
