import { Appeal, AppealDetailed, AppealStatusGroup } from "@types";
import { fetchTrafficViolationByAppealId, fetchEmployeeById, fetchDriverById } from "@services";
import { getFirestoreUtils, isAppealData, isAppealDetailedData } from "@utils";

export const fetchAppeals = async (statusGroup: AppealStatusGroup | null): Promise<Appeal[] | null> => {
  try {
    const fb = getFirestoreUtils();
    const data = statusGroup
      ? await fb.fetchDocsByQuery(fb.collectionNames.appeals, "statusGroup", statusGroup)
      : await fb.fetchAllDocs(fb.collectionNames.appeals);
    const validData = Array.isArray(data) ? data.filter(isAppealData) : null;
    return validData;
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
    const validData = isAppealData(data) ? data : null;
    return validData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ? ---------------------------------

export const fetchAppealsDetails = async (
  statusGroup: AppealStatusGroup | null,
): Promise<AppealDetailed[] | null> => {
  try {
    const appeals = await fetchAppeals(statusGroup);
    if (!appeals) return null;

    const dataPromises = appeals.map(async (appeal) => {
      return await fetchAppealDetailsById(appeal.id);
    });
    const dataResolves = await Promise.all(dataPromises);
    const validData = dataResolves.filter(isAppealDetailedData);
    return validData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAppealDetailsById = async (appealId: string): Promise<AppealDetailed | null> => {
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
