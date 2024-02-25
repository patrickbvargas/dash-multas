export function convertDateToLocaleFormat(inputDate: string) {
  try {
    const dateSplited = inputDate.split("-");
    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
  } catch (error) {
    console.error(error);
    return inputDate;
  }
}
