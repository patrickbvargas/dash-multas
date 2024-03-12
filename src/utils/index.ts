import { cn } from "./cn";
import { getFirestoreUtils } from "./firestoreUtils";
import { convertDateToLocaleFormat } from "./convertDateFormat";
import { convertCurrencyToLocaleFormat } from "./convertCurrencyFormat";
import { convertCPFToLocaleFormat } from "./convertCpfFormat";
import { convertPhoneNumberToLocaleFormat } from "./convertPhoneNumberFormat";
import { convertZipCodeToLocaleFormat } from "./convertZipCodeFormat";
import {
  isDriverDetailedData,
  isDriverData,
  isTrafficViolationDetailedData,
  isTrafficViolationData,
  isAppealDetailedData,
  isAppealData,
  isEmployeeData,
  isViaCepAddressData,
} from "./interfaceDataValidation";
import { isOverAge } from "./isOverAge";
import { getMaxBirthdateFor18YearsOld } from "./getMaxBirthdate";

export {
  cn,
  getFirestoreUtils,
  convertDateToLocaleFormat,
  convertCurrencyToLocaleFormat,
  convertCPFToLocaleFormat,
  convertPhoneNumberToLocaleFormat,
  convertZipCodeToLocaleFormat,
  isDriverDetailedData,
  isTrafficViolationDetailedData,
  isAppealDetailedData,
  isDriverData,
  isTrafficViolationData,
  isAppealData,
  isEmployeeData,
  isViaCepAddressData,
  isOverAge,
  getMaxBirthdateFor18YearsOld,
};
