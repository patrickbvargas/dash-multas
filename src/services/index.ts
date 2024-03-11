import { queryClient } from "./queryClient";
import {
  fetchDrivers,
  fetchDriverById,
  fetchDriverDetails,
  fetchDriverDetailsById,
  createDriver,
  updateDriver,
  deleteDriver,
  isDriverExistent,
} from "./DriverService";
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
import { fetchAddressByZipCode } from "./ViaCepService";

export {
  queryClient,
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
  fetchAddressByZipCode,
  createDriver,
  updateDriver,
  deleteDriver,
  isDriverExistent,
};
