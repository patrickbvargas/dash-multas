export function convertZipCodeToLocaleFormat(inputZipCode: string) {
  try {
    return inputZipCode.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  } catch (error) {
    console.error(error);
    return inputZipCode;
  }
}
