import { ITrafficViolationList } from "@types";
import { trafficViolations, drivers, appeals } from "../data";

// TODO: conclude fetch data | use types
export const fetchTrafficViolations = (): ITrafficViolationList[] | null => {
  const data = trafficViolations.map(
    ({ id, infringementNotice, selfSuspensive, vehicle, appealId, driverId }) => {
      const trafficViolationAppeal = appeals.find((appeal) => appeal.id === appealId);
      const trafficViolationDriver = drivers.find((driver) => driver.id === driverId);
      return {
        id,
        infringementNotice,
        selfSuspensive,
        driver: {
          fullName: trafficViolationDriver ? trafficViolationDriver.fullName : "",
        },
        vehicle: {
          plate: vehicle.plate,
        },
        appeal: {
          code: trafficViolationAppeal ? trafficViolationAppeal.code : "N/A",
        },
      };
    },
  );

  console.log(data);

  return data.length === 0 ? null : data;
};
