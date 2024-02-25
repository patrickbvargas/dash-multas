import {
  Contact,
  Driver,
  License,
  Address,
  TrafficViolation,
  Vehicle,
  Deadlines,
  Appeal,
  Employee,
  DriverDetailed,
  TrafficViolationDetailed,
  AppealDetailed,
} from "@types";

export const isDriverDetailedData = (data: any): data is DriverDetailed => {
  if (isDriverData(data.driver)) {
    return true;
  } else {
    console.warn("Data not recognized as DriverDetailed interface.", data);
    return false;
  }
};

export const isTrafficViolationDetailedData = (data: any): data is TrafficViolationDetailed => {
  if (isTrafficViolationData(data.trafficViolation) && isDriverData(data.driver)) {
    return true;
  } else {
    console.warn("Data not recognized as TrafficViolationDetailed interface.", data);
    return false;
  }
};

export const isAppealDetailedData = (data: any): data is AppealDetailed => {
  if (
    isAppealData(data.appeal) &&
    isTrafficViolationData(data.trafficViolation) &&
    isDriverData(data.driver) &&
    isEmployeeData(data.employee)
  ) {
    return true;
  } else {
    console.warn("Data not recognized as AppealDetailed interface.", data);
    return false;
  }
};

export const isDriverData = (data: any): data is Driver => {
  if (
    typeof data === "object" &&
    typeof data.id === "string" &&
    typeof data.fullName === "string" &&
    typeof data.identification === "string" &&
    typeof data.identificationState === "string" &&
    typeof data.cpf === "string" &&
    typeof data.birthdate === "string" &&
    typeof data.maritalStatus === "string" &&
    typeof data.profession === "string" &&
    isAddressData(data.address) &&
    isLicenseData(data.license) &&
    isContactData(data.contact)
  ) {
    return true;
  } else {
    console.warn("Data not recognized as Driver interface.", data);
    return false;
  }
};

const isAddressData = (data: any): data is Address => {
  if (
    typeof data === "object" &&
    typeof data.street === "string" &&
    typeof data.houseNumber === "string" &&
    typeof data.complement === "string" &&
    typeof data.zipCode === "string" &&
    typeof data.neighborhood === "string" &&
    typeof data.city === "string" &&
    typeof data.state === "string"
  ) {
    return true;
  } else {
    console.warn("Data not recognized as Address interface.", data);
    return false;
  }
};

const isLicenseData = (data: any): data is License => {
  if (
    typeof data === "object" &&
    typeof data.licenseNumber === "string" &&
    typeof data.category === "string" &&
    typeof data.governmentPassword === "string"
  ) {
    return true;
  } else {
    console.warn("Data not recognized as License interface.", data);
    return false;
  }
};

const isContactData = (data: any): data is Contact => {
  if (typeof data === "object" && typeof data.email === "string" && typeof data.phoneNumber === "string") {
    return true;
  } else {
    console.warn("Data not recognized as Contact interface.", data);
    return false;
  }
};

export const isTrafficViolationData = (data: any): data is TrafficViolation => {
  if (
    typeof data === "object" &&
    typeof data.id === "string" &&
    typeof data.driverId === "string" &&
    typeof data.infringementNotice === "string" &&
    typeof data.issuer === "string" &&
    typeof data.legalBasis === "string" &&
    typeof data.selfSuspensive === "boolean" &&
    isDeadlinesData(data.deadlines) &&
    isVehicleData(data.vehicle)
  ) {
    return true;
  } else {
    console.warn("Data not recognized as TrafficViolations interface.", data);
    return false;
  }
};

const isVehicleData = (data: any): data is Vehicle => {
  if (
    typeof data === "object" &&
    typeof data.plate === "string" &&
    typeof data.renavam === "string" &&
    typeof data.brand === "string"
  ) {
    return true;
  } else {
    console.warn("Data not recognized as Vehicle interface.", data);
    return false;
  }
};

const isDeadlinesData = (data: any): data is Deadlines => {
  if (
    typeof data === "object" &&
    typeof data.driverPresentation === "string" &&
    typeof data.defense === "string" &&
    typeof data.firstInstance === "string"
  ) {
    return true;
  } else {
    console.warn("Data not recognized as Deadlines interface.", data);
    return false;
  }
};

export const isAppealData = (data: any): data is Appeal => {
  if (
    typeof data === "object" &&
    typeof data.id === "string" &&
    typeof data.employeeId === "string" &&
    typeof data.code === "string" &&
    typeof data.statusGroup === "string" &&
    typeof data.status === "string" &&
    typeof data.service === "string" &&
    typeof data.cost === "number" &&
    typeof data.paymentType === "string" &&
    typeof data.deadline === "string"
  ) {
    return true;
  } else {
    console.warn("Data not recognized as Appeal interface.", data);
    return false;
  }
};

export const isEmployeeData = (data: any): data is Employee => {
  if (
    typeof data === "object" &&
    typeof data.id === "string" &&
    typeof data.fullName === "string" &&
    typeof data.role === "string"
  ) {
    return true;
  } else {
    console.warn("Data not recognized as Employee interface.", data);
    return false;
  }
};
