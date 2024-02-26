import { fetchDrivers, fetchDriverById, fetchDriverDetails, fetchDriverDetailsById } from "./DriverService";
import {
  fetchTrafficViolations,
  fetchTrafficViolationById,
  fetchTrafficViolationDetails,
  fetchTrafficViolationDetailsById,
  fetchTrafficViolationsByDriverId,
  fetchTrafficViolationByAppealId,
} from "./TrafficViolationService";
import { fetchAppeals, fetchAppealById, fetchAppealDetails, fetchAppealDetailsById } from "./AppealService";
import { fetchEmployees, fetchEmployeeById } from "./EmployeeService";

export {
  fetchDrivers,
  fetchDriverById,
  fetchDriverDetails,
  fetchDriverDetailsById,
  fetchTrafficViolations,
  fetchTrafficViolationById,
  fetchTrafficViolationDetails,
  fetchTrafficViolationDetailsById,
  fetchTrafficViolationsByDriverId,
  fetchTrafficViolationByAppealId,
  fetchAppeals,
  fetchAppealById,
  fetchAppealDetails,
  fetchAppealDetailsById,
  fetchEmployees,
  fetchEmployeeById,
};
