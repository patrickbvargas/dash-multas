import { IAttachment, IEmployee, ITrafficViolation } from "@types";

type TStatusGroup = "liberado" | "administrativo" | "judicial" | "juridico";

type TStatus =
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

type TPaymentType =
  | "Dinheiro"
  | "Boleto"
  | "Pix"
  | "Cartão de Crédito"
  | "Cartão de Débito"
  | "Transferência Bancária"
  | "Outro";

export interface IAppeal {
  id: number;
  code: string;
  statusGroup: TStatusGroup;
  status: TStatus;
  employee: IEmployee;
  service: string;
  cost: number;
  paymentType: TPaymentType;
  deadline: string;
  observation?: string;
  trafficViolations: Pick<ITrafficViolation, "id" | "infringementNotice" | "selfSuspensive" | "driver">[];
  attachments?: IAttachment[];
}

export interface IAppealList {
  id: number;
  code: string;
  statusGroup: TStatusGroup;
  status: TStatus;
  isPriority: boolean;
  driver: {
    fullName: string;
  };
  employee: {
    fullName: string;
  };
  deadline: string;
}
