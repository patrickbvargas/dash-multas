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
