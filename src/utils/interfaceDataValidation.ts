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
  ViaCepAddress,
} from "@types";

export const isDriverDetailedData = (data: unknown): data is DriverDetailed => {
  if (data && typeof data === "object" && "driver" in data && isDriverData(data.driver)) {
    return true;
  } else {
    console.warn("Data not recognized as DriverDetailed interface.", data);
    return false;
  }
};

export const isTrafficViolationDetailedData = (data: unknown): data is TrafficViolationDetailed => {
  if (
    data &&
    typeof data === "object" &&
    "trafficViolation" in data &&
    "driver" in data &&
    isTrafficViolationData(data.trafficViolation) &&
    isDriverData(data.driver)
  ) {
    return true;
  } else {
    console.warn("Data not recognized as TrafficViolationDetailed interface.", data);
    return false;
  }
};

export const isAppealDetailedData = (data: unknown): data is AppealDetailed => {
  if (
    data &&
    typeof data === "object" &&
    "appeal" in data &&
    "trafficViolation" in data &&
    "driver" in data &&
    "employee" in data &&
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

export const isDriverData = (data: unknown): data is Driver => {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    "fullName" in data &&
    "identification" in data &&
    "identificationState" in data &&
    "cpf" in data &&
    "birthdate" in data &&
    "maritalStatus" in data &&
    "profession" in data &&
    "address" in data &&
    "license" in data &&
    "contact" in data &&
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

const isAddressData = (data: unknown): data is Address => {
  if (
    data &&
    typeof data === "object" &&
    "street" in data &&
    "houseNumber" in data &&
    "complement" in data &&
    "zipCode" in data &&
    "neighborhood" in data &&
    "city" in data &&
    "state" in data &&
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

const isLicenseData = (data: unknown): data is License => {
  if (
    data &&
    typeof data === "object" &&
    "licenseNumber" in data &&
    "category" in data &&
    "governmentPassword" in data &&
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

const isContactData = (data: unknown): data is Contact => {
  if (
    data &&
    typeof data === "object" &&
    "email" in data &&
    "phoneNumber" in data &&
    typeof data.email === "string" &&
    typeof data.phoneNumber === "string"
  ) {
    return true;
  } else {
    console.warn("Data not recognized as Contact interface.", data);
    return false;
  }
};

export const isTrafficViolationData = (data: unknown): data is TrafficViolation => {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    "driverId" in data &&
    "infringementNotice" in data &&
    "issuer" in data &&
    "legalBasis" in data &&
    "selfSuspensive" in data &&
    "deadlines" in data &&
    "vehicle" in data &&
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

const isVehicleData = (data: unknown): data is Vehicle => {
  if (
    data &&
    typeof data === "object" &&
    "plate" in data &&
    "renavam" in data &&
    "brand" in data &&
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

const isDeadlinesData = (data: unknown): data is Deadlines => {
  if (
    data &&
    typeof data === "object" &&
    "driverPresentation" in data &&
    "defense" in data &&
    "firstInstance" in data &&
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

export const isAppealData = (data: unknown): data is Appeal => {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    "employeeId" in data &&
    "code" in data &&
    "statusGroup" in data &&
    "status" in data &&
    "service" in data &&
    "cost" in data &&
    "paymentType" in data &&
    "deadline" in data &&
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

export const isEmployeeData = (data: unknown): data is Employee => {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    "fullName" in data &&
    "role" in data &&
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

export const isViaCepAddressData = (data: unknown): data is ViaCepAddress => {
  if (
    data &&
    typeof data === "object" &&
    "cep" in data &&
    "logradouro" in data &&
    "bairro" in data &&
    "localidade" in data &&
    "uf" in data &&
    typeof data.cep === "string" &&
    typeof data.logradouro === "string" &&
    typeof data.bairro === "string" &&
    typeof data.localidade === "string" &&
    typeof data.uf === "string"
  ) {
    return true;
  } else {
    console.warn("Data not recognized as ViaCepAddress interface.", data);
    return false;
  }
};
