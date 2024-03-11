import { TrafficViolation } from "@types";

export interface Address {
  street: string;
  houseNumber: string;
  complement: string;
  zipCode: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface License {
  licenseNumber: string;
  category: string;
  governmentPassword: string;
}

export interface Contact {
  email: string;
  phoneNumber: string;
}

export interface Driver {
  id: string;
  fullName: string;
  identification: string;
  identificationState: string;
  cpf: string;
  birthdate: string;
  maritalStatus: string;
  profession: string;
  address: Address;
  license: License;
  contact: Contact;
}

export interface DriverDetailed {
  driver: Driver;
  trafficViolations: TrafficViolation[] | null;
}
