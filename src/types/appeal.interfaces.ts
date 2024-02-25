import { Attachment, Driver, Employee, TrafficViolation } from "@types";

export type AppealStatusGroup = "liberado" | "administrativo" | "judicial" | "juridico";

export type AppealStatus =
  | "liberado"
  | "nait"
  | "nip"
  | "cetran"
  | "instauração"
  | "imposição"
  | "ajuizar"
  | "ajuizado"
  | "recorrer"
  | "tutela concedida";

type PaymentType =
  | "Dinheiro"
  | "Boleto"
  | "Pix"
  | "Cartão de Crédito"
  | "Cartão de Débito"
  | "Transferência Bancária"
  | "Outro";

export interface Appeal {
  id: string;
  employeeId: string;
  code: string;
  statusGroup: AppealStatusGroup;
  status: AppealStatus;
  service: string;
  cost: number;
  paymentType: PaymentType;
  deadline: string;
  observation?: string;
  attachments?: Attachment[];
}

export interface AppealDetailed {
  appeal: Appeal;
  trafficViolation: TrafficViolation;
  driver: Driver;
  employee: Employee;
}
