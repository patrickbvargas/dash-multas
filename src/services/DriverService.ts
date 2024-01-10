import { IDriver, IDriverList } from "@types";
import { drivers, trafficViolations } from "../data";

// TODO: conclude fetch data | use types
export const fetchDrivers = (): IDriverList[] | null => {
  try {
    const data = drivers.map(({ id, fullName, cpf, license }) => {
      const driverTrafficViolations = trafficViolations.filter(
        (trafficViolation) => trafficViolation.driverId === id,
      );
      return {
        id,
        fullName,
        cpf,
        licenseNumber: license.licenseNumber,
        isPriority: driverTrafficViolations.some((trafficViolation) => trafficViolation.selfSuspensive),
        trafficViolationsCount: driverTrafficViolations.length,
      };
    });
    console.log(data);
    return data.length === 0 ? null : data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchDriverById = (id: number): IDriver | null => {
  try {
    const driver = drivers.find((driver) => driver.id === id);
    if (!driver) return null;
    const driverTrafficViolations = trafficViolations.filter(
      (trafficViolation) => trafficViolation.driverId === driver.id,
    );
    const data = {
      ...driver,
      trafficViolationsCount: driverTrafficViolations.length,
    };
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
