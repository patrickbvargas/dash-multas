export function convertCPFToLocaleFormat(inputCpf: string) {
  try {
    return inputCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } catch (error) {
    console.error(error);
    return inputCpf;
  }
}
