import { IAttachment } from "@types";

interface IAddress {
  street: string;
  number: string;
  complement: string;
  zipCode: string;
  neighborhood: string;
  city: string;
  state: string;
}

// TODO: include tipo
interface ILicense {
  licenseNumber: string;
  category: string;
  governmentPassword: string;
  // Tipo [Física | Digital]
}

interface IContact {
  email: string;
  phoneNumber: string;
}

export interface IDriver {
  id: number;
  fullName: string;
  identification: string;
  identificationState: string;
  cpf: string;
  birthdate: string;
  maritalStatus: string;
  profession: string;
  // trafficViolations: TrafficViolation[];
  trafficViolationsCount: number;
  address: IAddress;
  license: ILicense;
  contact: IContact;
  attachments?: IAttachment[];
}

export interface IDriverList {
  id: number;
  fullName: string;
  cpf: string;
  licenseNumber: string;
  isPriority: boolean;
  trafficViolationsCount: number;
}
