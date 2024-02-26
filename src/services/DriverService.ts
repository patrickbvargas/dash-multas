import { Driver, DriverDetailed } from "@types";
import { fetchTrafficViolationsByDriverId } from "@services";
import { getFirestoreUtils, isDriverData } from "@utils";

export const fetchDrivers = async (): Promise<Driver[] | null> => {
  try {
    const fb = getFirestoreUtils();
    const data = await fb.fetchAllDocs(fb.collectionNames.drivers);
    return Array.isArray(data) ? data.filter(isDriverData) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchDriverById = async (driverId: string): Promise<Driver | null> => {
  try {
    if (!driverId) throw new Error("Invalid driverId");
    const fb = getFirestoreUtils();
    const data = await fb.fetchDocById(fb.collectionNames.drivers, driverId);
    return isDriverData(data) ? data : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDriverDetails = async (driver: Driver): Promise<DriverDetailed> => {
  try {
    const trafficViolations = await fetchTrafficViolationsByDriverId(driver.id);
    return {
      driver,
      trafficViolations,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDriverDetailsById = async (driverId: string): Promise<DriverDetailed> => {
  try {
    const driver = await fetchDriverById(driverId);
    if (!driver) throw new Error(`Driver ${driverId} not found.`);

    const trafficViolations = await fetchTrafficViolationsByDriverId(driverId);
    return {
      driver,
      trafficViolations,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
