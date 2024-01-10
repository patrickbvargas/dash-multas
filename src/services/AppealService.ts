import { IAppealList } from "@types";
import { appeals, drivers, employees, trafficViolations } from "../data";

// TODO: conclude fetch data | use types
export const fetchAppeals = (): IAppealList[] | null => {
  const data = appeals.map(({ id, code, statusGroup, status, deadline, employeeId, trafficViolationsId }) => {
    const appealTrafficViolations = trafficViolations.filter((trafficViolation) =>
      trafficViolationsId.includes(trafficViolation.id),
    );
    const appealEmployee = employees.find((employee) => employee.id === employeeId);
    const appealDriver = drivers.find((driver) => driver.id === appealTrafficViolations[0].driverId);

    return {
      id,
      code,
      statusGroup,
      status,
      deadline,
      driver: {
        fullName: appealDriver ? appealDriver.fullName : "",
      },
      employee: {
        fullName: appealEmployee ? appealEmployee.fullName : "",
      },
      isPriority: appealTrafficViolations.some((trafficViolation) => trafficViolation.selfSuspensive),
    };
  });

  console.log(data);

  return data.length === 0 ? null : (data as IAppealList[]);
};
