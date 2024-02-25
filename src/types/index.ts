import { Attachment } from "./attachment.interfaces";
import { Employee } from "./employee.interface";
import { Driver, DriverDetailed, Address, Contact, License } from "./driver.interfaces";
import { Appeal, AppealDetailed, AppealStatus, AppealStatusGroup } from "./appeal.interfaces";
import { DetailGroup, DetailField } from "./detailsDisplay.interfaces";
import { NotificationConfig, NotificationVariant } from "./notification.interfaces";
import {
  TrafficViolation,
  TrafficViolationDetailed,
  Deadlines,
  Vehicle,
} from "./trafficViolation.interfaces";

export type {
  Appeal,
  AppealDetailed,
  Driver,
  DriverDetailed,
  TrafficViolation,
  TrafficViolationDetailed,
  Address,
  Contact,
  License,
  Deadlines,
  Vehicle,
  DetailGroup,
  DetailField,
  NotificationConfig,
  NotificationVariant,
  Employee,
  Attachment,
  AppealStatus,
  AppealStatusGroup,
};
