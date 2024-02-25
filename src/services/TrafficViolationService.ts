import { TrafficViolation, TrafficViolationDetailed } from "@types";
import { fetchAppealById, fetchDriverById } from "@services";
import { getFirestoreUtils, isTrafficViolationData, isTrafficViolationDetailedData } from "@utils";

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
    return Array.isArray(data) ? data.filter(isTrafficViolationData)[0] : null; //TODO: refatore
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

// ? ---------------------------------

export const fetchTrafficViolationsDetails = async (): Promise<TrafficViolationDetailed[] | null> => {
  try {
    const trafficViolations = await fetchTrafficViolations();
    if (!trafficViolations) return null;

    const dataPromises = trafficViolations.map(async (trafficViolation) => {
      return await fetchTrafficViolationsDetailsById(trafficViolation.id);
    });
    const dataResolves = await Promise.all(dataPromises);
    return dataResolves.filter(isTrafficViolationDetailedData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrafficViolationsDetailsById = async (
  trafficViolationId: string,
): Promise<TrafficViolationDetailed | null> => {
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
