import { TrafficViolation, TrafficViolationDetailed } from "@types";
import { fetchAppealById, fetchDriverById } from "@services";
import { getFirestoreUtils, isTrafficViolationData } from "@utils";

export const fetchTrafficViolations = async (): Promise<TrafficViolation[] | null> => {
  try {
    const fb = getFirestoreUtils();
    const data = await fb.fetchAllDocs(fb.collectionNames.trafficViolations);
    return Array.isArray(data) ? data.filter(isTrafficViolationData) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrafficViolationsByDriverId = async (
  driverId: string,
): Promise<TrafficViolation[] | null> => {
  try {
    if (!driverId) throw new Error("Invalid driverId");
    const fb = getFirestoreUtils();
    const data = await fb.fetchDocsByQuery(fb.collectionNames.trafficViolations, "driverId", driverId);
    return Array.isArray(data) ? data.filter(isTrafficViolationData) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrafficViolationByAppealId = async (appealId: string): Promise<TrafficViolation | null> => {
  try {
    if (!appealId) throw new Error("Invalid appealId");
    const fb = getFirestoreUtils();
    const data = await fb.fetchDocsByQuery(fb.collectionNames.trafficViolations, "appealId", appealId);
    const firstData = Array.isArray(data) ? data.find(isTrafficViolationData) : null;
    return firstData ?? null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrafficViolationById = async (
  trafficViolationId: string,
): Promise<TrafficViolation | null> => {
  try {
    if (!trafficViolationId) throw new Error("Invalid trafficViolationId");
    const fb = getFirestoreUtils();
    const data = await fb.fetchDocById(fb.collectionNames.trafficViolations, trafficViolationId);
    return isTrafficViolationData(data) ? data : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrafficViolationDetails = async (
  trafficViolation: TrafficViolation,
): Promise<TrafficViolationDetailed> => {
  try {
    const driver = await fetchDriverById(trafficViolation.driverId);
    if (!driver) throw new Error(`Driver ${trafficViolation.driverId} not found.`);

    const appeal = trafficViolation.appealId ? await fetchAppealById(trafficViolation.appealId) : null;
    return {
      trafficViolation,
      driver,
      appeal,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrafficViolationDetailsById = async (
  trafficViolationId: string,
): Promise<TrafficViolationDetailed> => {
  try {
    const trafficViolation = await fetchTrafficViolationById(trafficViolationId);
    if (!trafficViolation) throw new Error(`Traffic Violation ${trafficViolationId} not found.`);

    const driver = await fetchDriverById(trafficViolation.driverId);
    if (!driver) throw new Error(`Driver ${trafficViolation.driverId} not found.`);

    const appeal = trafficViolation.appealId ? await fetchAppealById(trafficViolation.appealId) : null;
    return {
      trafficViolation,
      driver,
      appeal,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// TODO: remove
// async function createDoc() {
//   console.log("criando traffic violations");
//   const trafficViolations = [
//     {
//       driverId: "0ddc6ffd-1ace-44b8-8da4-c6478840654a",
//       appealId: "1745cc8e-39a2-4aaa-849d-34be36b642d0",
//       deadlines: {
//         defense: "2023-12-07",
//         driverPresentation: "2023-12-14",
//         firstInstance: "2023-12-19",
//       },
//       infringementNotice: "345678/E024324321",
//       issuer: "Pref. Mun. Minas Gerais",
//       legalBasis: "CTB 264, I",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "Kia",
//         plate: "YZA7890",
//         renavam: "01234567890",
//       },
//     },
//     {
//       driverId: "52c005b7-2934-4e6c-84df-2e8055c95e62",
//       appealId: "18a55b0a-be04-408f-8afa-7c585d598726",
//       deadlines: {
//         defense: "2024-07-15",
//         driverPresentation: "2024-07-22",
//         firstInstance: "2024-07-25",
//       },
//       infringementNotice: "567890/E024322345",
//       issuer: "Detran-PR",
//       legalBasis: "CTB 264, II",
//       selfSuspensive: false,
//       vehicle: {
//         brand: "Mitsubishi",
//         plate: "WXY9012",
//         renavam: "89012345678",
//       },
//     },
//     {
//       driverId: "635709c3-eabe-4b5d-8f31-307ab20eb219",
//       appealId: "1e608c15-6680-43c0-b346-d9fd7cbea656",
//       deadlines: {
//         defense: "2023-08-07",
//         driverPresentation: "2023-08-14",
//         firstInstance: "2023-08-18",
//       },
//       infringementNotice: "789012/E024321234",
//       issuer: "Pref. Mun. Caxias do Sul",
//       legalBasis: "CTB 185, I",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "Honda",
//         plate: "MNO1234",
//         renavam: "67890123456",
//       },
//     },
//     {
//       driverId: "64b149b0-0213-472d-ae76-509ef9bad672",
//       appealId: "2134210c-a05d-4c4b-87d1-2ea299ad2ff0",
//       deadlines: {
//         defense: "2023-05-15",
//         driverPresentation: "2023-05-20",
//         firstInstance: "2023-05-25",
//       },
//       infringementNotice: "543210/E024321234",
//       issuer: "Detran-RJ",
//       legalBasis: "CTB 181, XV",
//       selfSuspensive: false,
//       vehicle: {
//         brand: "Ford",
//         plate: "XYZ5678",
//         renavam: "23456789012",
//       },
//     },
//     {
//       driverId: "94eae57b-c412-45f0-9c40-66af13b903bd",
//       appealId: "28878595-7d05-4028-ac87-d10b70e15e64",
//       deadlines: {
//         defense: "2023-06-15",
//         driverPresentation: "2023-06-22",
//         firstInstance: "2023-06-25",
//       },
//       infringementNotice: "987654/E024327890",
//       issuer: "Pref. Mun. Rio de Janeiro",
//       legalBasis: "CTB 311, II",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "Fiat",
//         plate: "GHI3456",
//         renavam: "45678901234",
//       },
//     },
//     {
//       driverId: "94eae57b-c412-45f0-9c40-66af13b903bd",
//       appealId: "4ae5ef29-67cf-4844-8ec9-30289e3f5f85",
//       deadlines: {
//         defense: "2024-05-15",
//         driverPresentation: "2024-05-22",
//         firstInstance: "2024-05-25",
//       },
//       infringementNotice: "123456/E024322345",
//       issuer: "Detran-RJ",
//       legalBasis: "CTB 231, I",
//       selfSuspensive: false,
//       vehicle: {
//         brand: "Land Rover",
//         plate: "QRS1234",
//         renavam: "67890123456",
//       },
//     },
//     {
//       driverId: "9ccc9b13-b6ab-4d71-bf31-1cf73b1e9d75",
//       appealId: "6f27fbd7-e04c-4c87-9ce9-2109a2160e18",
//       deadlines: {
//         defense: "2024-06-07",
//         driverPresentation: "2024-06-14",
//         firstInstance: "2024-06-19",
//       },
//       infringementNotice: "789012/E024321234",
//       issuer: "Pref. Mun. São Paulo",
//       legalBasis: "CTB 208, II",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "Subaru",
//         plate: "TUV5678",
//         renavam: "78901234567",
//       },
//     },
//     {
//       driverId: "9cd8c11a-82aa-49bd-8a07-8a1c5e1f377b",
//       appealId: "a19d487a-7749-4875-853a-0c6b06a153b2",
//       deadlines: {
//         defense: "2023-10-07",
//         driverPresentation: "2023-10-14",
//         firstInstance: "2023-10-19",
//       },
//       infringementNotice: "234567/E024325432",
//       issuer: "Pref. Mun. São Paulo",
//       legalBasis: "CTB 287, I",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "Nissan",
//         plate: "STU9012",
//         renavam: "89012345678",
//       },
//     },
//     {
//       driverId: "aab0cf61-fa5b-4db7-bf25-27da6618e7f7",
//       appealId: "a4f80ab6-4581-452c-b70c-ee5c489cb7c7",
//       deadlines: {
//         defense: "2023-09-10",
//         driverPresentation: "2023-09-18",
//         firstInstance: "2023-09-22",
//       },
//       infringementNotice: "567890/E024328765",
//       issuer: "Detran-GO",
//       legalBasis: "CTB 208, III",
//       selfSuspensive: false,
//       vehicle: {
//         brand: "Hyundai",
//         plate: "PQR5678",
//         renavam: "78901234567",
//       },
//     },
//     {
//       driverId: "b18bffa2-b300-40d4-8cfe-75de3f7f3486",
//       appealId: "b6f4eaf7-0bb9-43a1-9199-0cb5500e10d4",
//       deadlines: {
//         defense: "2024-03-15",
//         driverPresentation: "2024-03-22",
//         firstInstance: "2024-03-25",
//       },
//       infringementNotice: "876543/E024322345",
//       issuer: "Detran-MG",
//       legalBasis: "CTB 201, II",
//       selfSuspensive: false,
//       vehicle: {
//         brand: "Audi",
//         plate: "HIJ9012",
//         renavam: "34567890123",
//       },
//     },
//     {
//       driverId: "bd9272c6-279b-4012-a399-23e30f8f552b",
//       appealId: "c657defe-1a2f-4509-82d1-944ba055ffac",
//       deadlines: {
//         defense: "2024-01-15",
//         driverPresentation: "2024-01-22",
//         firstInstance: "2024-01-25",
//       },
//       infringementNotice: "234567/E024323456",
//       issuer: "Detran-BA",
//       legalBasis: "CTB 156, III",
//       selfSuspensive: false,
//       vehicle: {
//         brand: "Mercedes-Benz",
//         plate: "BCD1234",
//         renavam: "12345678901",
//       },
//     },
//     {
//       driverId: "52c005b7-2934-4e6c-84df-2e8055c95e62",
//       appealId: "ceb27e78-bb4f-4990-9c91-3d517b9cd47b",
//       deadlines: {
//         defense: "2023-10-04",
//         driverPresentation: "2023-04-14",
//         firstInstance: "2023-19-04",
//       },
//       infringementNotice: "288410/E024320704",
//       issuer: "Pref. Mun. Curitiba",
//       legalBasis: "CTB 218, III",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "Chevrolet",
//         plate: "ABC1234",
//         renavam: "12345678901",
//       },
//     },
//     {
//       driverId: "b18bffa2-b300-40d4-8cfe-75de3f7f3486",
//       appealId: "d56b0e75-b93d-4a1f-b348-7c7c08095d7e",
//       deadlines: {
//         defense: "2024-04-07",
//         driverPresentation: "2024-04-14",
//         firstInstance: "2024-04-19",
//       },
//       infringementNotice: "987654/E024321234",
//       issuer: "Pref. Mun. Belo Horizonte",
//       legalBasis: "CTB 185, III",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "Volvo",
//         plate: "KLM3456",
//         renavam: "45678901234",
//       },
//     },
//     {
//       driverId: "94eae57b-c412-45f0-9c40-66af13b903bd",
//       appealId: null,
//       deadlines: {
//         defense: "2024-08-07",
//         driverPresentation: "2024-08-14",
//         firstInstance: "2024-08-19",
//       },
//       infringementNotice: "234567/E024321234",
//       issuer: "Pref. Mun. Rio de Janeiro",
//       legalBasis: "CTB 185, II",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "Peugeot",
//         plate: "ZAB3456",
//         renavam: "90123456789",
//       },
//     },
//     {
//       driverId: "52c005b7-2934-4e6c-84df-2e8055c95e62",
//       appealId: "d8d5586b-957e-4693-ac00-311549185ef6",
//       deadlines: {
//         defense: "2023-07-10",
//         driverPresentation: "2023-07-18",
//         firstInstance: "2023-07-22",
//       },
//       infringementNotice: "123456/E024329876",
//       issuer: "Detran-PR",
//       legalBasis: "CTB 253, I",
//       selfSuspensive: false,
//       vehicle: {
//         brand: "Toyota",
//         plate: "JKL7890",
//         renavam: "56789012345",
//       },
//     },
//     {
//       driverId: "9ccc9b13-b6ab-4d71-bf31-1cf73b1e9d75",
//       appealId: "ed6587f2-4699-4063-88fc-dacd71dd8fdc",
//       deadlines: {
//         defense: "2024-02-07",
//         driverPresentation: "2024-02-14",
//         firstInstance: "2024-02-19",
//       },
//       infringementNotice: "567890/E024321234",
//       issuer: "Pref. Mun. São Paulo",
//       legalBasis: "CTB 192, I",
//       selfSuspensive: true,
//       vehicle: {
//         brand: "BMW",
//         plate: "EFG5678",
//         renavam: "23456789012",
//       },
//     },
//     {
//       driverId: "dc09ac5c-f3ad-4f2a-b372-e8fa9d91b075",
//       appealId: "f2346bad-2401-4a9b-940e-c1f783d920fd",
//       deadlines: {
//         defense: "2023-11-15",
//         driverPresentation: "2023-11-22",
//         firstInstance: "2023-11-25",
//       },
//       infringementNotice: "876543/E024321234",
//       issuer: "Detran-SC",
//       legalBasis: "CTB 177, II",
//       selfSuspensive: false,
//       vehicle: {
//         brand: "Renault",
//         plate: "VWX3456",
//         renavam: "90123456789",
//       },
//     },
//   ];

//   const fb = getFirestoreUtils();
//   trafficViolations.forEach(async (tv) => {
//     await fb.setDoc(fb.collectionNames.trafficViolations, { ...tv, id: crypto.randomUUID() }, false);
//   });
// }

// createDoc();
