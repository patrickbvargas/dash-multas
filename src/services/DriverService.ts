import { Driver, DriverDetailed } from "@types";
import { fetchTrafficViolationsByDriverId } from "@services";
import { getFirestoreUtils, isDriverData, isDriverDetailedData } from "@utils";

export const fetchDrivers = async (): Promise<Driver[] | null> => {
  try {
    const fb = getFirestoreUtils();
    const data = await fb.fetchAllDocs(fb.collectionNames.drivers);
    const validData = Array.isArray(data) ? data.filter(isDriverData) : null;
    return validData;
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
    const validData = isDriverData(data) ? data : null;
    return validData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ? ---------------------------------

export const fetchDriversDetails = async (): Promise<DriverDetailed[] | null> => {
  try {
    const drivers = await fetchDrivers();
    if (!drivers) return null;

    const dataPromises = drivers.map(async (driver) => {
      return await fetchDriverDetailsById(driver.id);
    });
    const dataResolves = await Promise.all(dataPromises);
    const validData = dataResolves.filter(isDriverDetailedData);
    return validData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDriverDetailsById = async (driverId: string): Promise<DriverDetailed | null> => {
  try {
    const driver = await fetchDriverById(driverId);
    if (!driver) throw new Error(`Driver ${driverId} not found.`);

    const trafficViolations = await fetchTrafficViolationsByDriverId(driverId);
    return {
      driver: driver,
      trafficViolations: trafficViolations,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};