import { Appeal, Attachment, Driver } from "@types";

export interface Vehicle {
  plate: string;
  renavam: string;
  brand: string;
}

export interface Deadlines {
  driverPresentation: string;
  defense: string;
  firstInstance: string;
}

export interface TrafficViolation {
  id: string;
  appealId: string | null;
  driverId: string;
  infringementNotice: string;
  issuer: string;
  legalBasis: string;
  selfSuspensive: boolean;
  deadlines: Deadlines;
  vehicle: Vehicle;
  attachments?: Attachment[];
}

export interface TrafficViolationDetailed {
  trafficViolation: TrafficViolation;
  driver: Driver;
  appeal: Appeal | null;
}
