import { IAppeal, IAttachment, IDriver } from "@types";

interface Vehicle {
  plate: string;
  renavam: string;
  brand: string;
}

export interface ITrafficViolation {
  id: number;
  infringementNotice: string; // [auto de infração]
  issuer: string; // [autuador]
  legalBasis: string; // [amparo legal]
  selfSuspensive: boolean;
  deadlines: {
    driverPresentation: string;
    defense: string;
    firstInstance: string;
  };
  driver: Pick<IDriver, "id" | "fullName" | "license" | "cpf" | "identification" | "birthdate">;
  appeal: Pick<IAppeal, "id" | "code" | "statusGroup" | "status"> | null;
  vehicle: Vehicle;
  attachments?: IAttachment[];
}

export interface ITrafficViolationList {
  id: number;
  infringementNotice: string; // [auto de infração]
  selfSuspensive: boolean;
  driver: {
    fullName: string;
  };
  vehicle: {
    plate: string;
  };
  appeal: {
    code: string;
  };
}

// Status ?
// violationType ?
