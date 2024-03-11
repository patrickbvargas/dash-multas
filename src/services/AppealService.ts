import { Appeal, AppealDetailed, AppealStatusGroup } from "@types";
import { fetchTrafficViolationByAppealId, fetchEmployeeById, fetchDriverById } from "@services";
import { getFirestoreUtils, isAppealData } from "@utils";

export const fetchAppeals = async (statusGroup: AppealStatusGroup | null): Promise<Appeal[] | null> => {
  try {
    const fb = getFirestoreUtils();
    const data = statusGroup
      ? await fb.fetchDocsByQuery(fb.collectionNames.appeals, "statusGroup", statusGroup)
      : await fb.fetchAllDocs(fb.collectionNames.appeals);
    return Array.isArray(data) ? data.filter(isAppealData) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAppealById = async (appealId: string): Promise<Appeal | null> => {
  try {
    if (!appealId) throw new Error("Invalid appealId");
    const fb = getFirestoreUtils();
    const data = await fb.fetchDocById(fb.collectionNames.appeals, appealId);
    return isAppealData(data) ? data : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAppealDetails = async (appeal: Appeal): Promise<AppealDetailed> => {
  try {
    const trafficViolation = await fetchTrafficViolationByAppealId(appeal.id);
    if (!trafficViolation) throw new Error(`Traffic Violation for Appeal ${appeal.id} not found.`);

    const driver = await fetchDriverById(trafficViolation.driverId);
    if (!driver) throw new Error(`Driver ${trafficViolation.driverId} not found.`);

    const employee = await fetchEmployeeById(appeal.employeeId);
    if (!employee) throw new Error(`Employee ${appeal.employeeId} not found.`);

    return {
      appeal,
      trafficViolation,
      driver,
      employee,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAppealDetailsById = async (appealId: string): Promise<AppealDetailed> => {
  try {
    const appeal = await fetchAppealById(appealId);
    if (!appeal) throw new Error(`Appeal ${appealId} not found.`);

    const trafficViolation = await fetchTrafficViolationByAppealId(appeal.id);
    if (!trafficViolation) throw new Error(`Traffic Violation for Appeal ${appeal.id} not found.`);

    const driver = await fetchDriverById(trafficViolation.driverId);
    if (!driver) throw new Error(`Driver ${trafficViolation.driverId} not found.`);

    const employee = await fetchEmployeeById(appeal.employeeId);
    if (!employee) throw new Error(`Employee ${appeal.employeeId} not found.`);

    return {
      appeal,
      trafficViolation,
      driver,
      employee,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// TODO: remove
// async function createDoc() {
//   console.log("criando appeals");
//   const appeals = [
//     {
//       code: "202311013",
//       cost: 2000,
//       deadline: "2023-10-04",
//       employeeId: "07e1d02b-dcdc-4c6c-a02e-051175ff7db7",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Transferência Bancária",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "nip",
//       statusGroup: "administrativo",
//     },
//     {
//       code: "202311006",
//       cost: 4000,
//       deadline: "2023-10-04",
//       employeeId: "534b2715-53d6-4157-bc48-8d211400c8cd",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Transferência Bancária",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "imposição",
//       statusGroup: "judicial",
//     },
//     {
//       code: "202311005",
//       cost: 500,
//       deadline: "2023-10-04",
//       employeeId: "07e1d02b-dcdc-4c6c-a02e-051175ff7db7",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Cartão de Débito",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "instauração",
//       statusGroup: "judicial",
//     },
//     {
//       code: "202311010",
//       cost: 2500,
//       deadline: "2023-10-04",
//       employeeId: "534b2715-53d6-4157-bc48-8d211400c8cd",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Pix",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "recorrer",
//       statusGroup: "juridico",
//     },
//     {
//       code: "202311015",
//       cost: 1000,
//       deadline: "2023-10-04",
//       employeeId: "76f73964-f421-4320-9858-03bd98724ecc",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Dinheiro",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "instauração",
//       statusGroup: "judicial",
//     },
//     {
//       code: "202311003",
//       cost: 1200.8,
//       deadline: "2023-10-04",
//       employeeId: "76f73964-f421-4320-9858-03bd98724ecc",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Pix",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "nip",
//       statusGroup: "administrativo",
//     },
//     {
//       code: "202311008",
//       cost: 100,
//       deadline: "2023-10-04",
//       employeeId: "866cac9f-f5b8-415c-9c6b-a33f4a9328a4",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Dinheiro",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "ajuizar",
//       statusGroup: "juridico",
//     },
//     {
//       code: "202311001",
//       cost: 2500.1,
//       deadline: "2023-10-04",
//       employeeId: "07e1d02b-dcdc-4c6c-a02e-051175ff7db7",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Dinheiro",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "liberado",
//       statusGroup: "liberado",
//     },
//     {
//       code: "202311016",
//       cost: 200,
//       deadline: "2023-10-04",
//       employeeId: "866cac9f-f5b8-415c-9c6b-a33f4a9328a4",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Boleto",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "tutela concedida",
//       statusGroup: "juridico",
//     },
//     {
//       code: "202311002",
//       cost: 2500.1,
//       deadline: "2023-10-04",
//       employeeId: "534b2715-53d6-4157-bc48-8d211400c8cd",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Boleto",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "nait",
//       statusGroup: "administrativo",
//     },
//     {
//       code: "202311009",
//       cost: 300,
//       deadline: "2023-10-04",
//       employeeId: "07e1d02b-dcdc-4c6c-a02e-051175ff7db7",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Boleto",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "ajuizado",
//       statusGroup: "juridico",
//     },
//     {
//       code: "202311012",
//       cost: 0,
//       deadline: "2023-10-04",
//       employeeId: "866cac9f-f5b8-415c-9c6b-a33f4a9328a4",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Cartão de Débito",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "imposição",
//       statusGroup: "judicial",
//     },
//     {
//       code: "202311004",
//       cost: 500,
//       deadline: "2023-10-04",
//       employeeId: "866cac9f-f5b8-415c-9c6b-a33f4a9328a4",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Cartão de Crédito",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "cetran",
//       statusGroup: "administrativo",
//     },
//     {
//       code: "202311007",
//       cost: 600.6,
//       deadline: "2023-10-04",
//       employeeId: "76f73964-f421-4320-9858-03bd98724ecc",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Outro",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "cetran",
//       statusGroup: "judicial",
//     },
//     {
//       code: "202311014",
//       cost: 1300,
//       deadline: "2023-10-04",
//       employeeId: "534b2715-53d6-4157-bc48-8d211400c8cd",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Outro",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "liberado",
//       statusGroup: "liberado",
//     },
//     {
//       code: "202311011",
//       cost: 2500.1,
//       deadline: "2023-10-04",
//       employeeId: "76f73964-f421-4320-9858-03bd98724ecc",
//       observation: "Utilizar artigo X para defesa",
//       paymentType: "Cartão de Crédito",
//       service: "Suspensiva Exc. Veloc. 50%",
//       status: "tutela concedida",
//       statusGroup: "juridico",
//     },
//   ];
//   const fb = getFirestoreUtils();
//   appeals.forEach(async (appeal) => {
//     await fb.setDoc(fb.collectionNames.appeals, { ...appeal, id: crypto.randomUUID() }, false);
//   });
// }

// createDoc();
