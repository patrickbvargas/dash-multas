export function convertPhoneNumberToLocaleFormat(inputPhoneNumber: string) {
  try {
    const areaCode = inputPhoneNumber.substring(0, 3);
    const restOfNumber = inputPhoneNumber.substring(3);
    return `(${areaCode}) ${restOfNumber.substring(0, 1)} ${restOfNumber.substring(
      1,
      5,
    )} ${restOfNumber.substring(5)}`;
  } catch (error) {
    console.error(error);
    return inputPhoneNumber;
  }
}
