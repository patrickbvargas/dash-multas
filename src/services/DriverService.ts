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

// ? -------------

export const createDriver = async (driver: Driver): Promise<string> => {
  try {
    const fb = getFirestoreUtils();
    const uuid = crypto.randomUUID();
    const driverPayload = { ...driver, id: uuid, createdAt: fb.getTimestamp() };
    await fb.setDoc(fb.collectionNames.drivers, driverPayload, false);
    return uuid;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateDriver = async (driver: Driver): Promise<void> => {
  try {
    const fb = getFirestoreUtils();
    const driverPayload = { ...driver, updatedAt: fb.getTimestamp() };
    await fb.setDoc(fb.collectionNames.drivers, driverPayload, true);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDriver = async (driver: Driver): Promise<void> => {
  try {
    const fb = getFirestoreUtils();
    await fb.deleteDoc(fb.collectionNames.drivers, driver);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const isDriverExistent = async (cpf: string): Promise<boolean> => {
  try {
    const fb = getFirestoreUtils();
    const data = await fb.fetchDocsByQuery(fb.collectionNames.drivers, "cpf", cpf);
    return Array.isArray(data) && data.length > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
