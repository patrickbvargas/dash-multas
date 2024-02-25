export function convertCurrencyToLocaleFormat(inputCurrency: number) {
  try {
    return inputCurrency.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } catch (error) {
    console.error(error);
    return inputCurrency;
  }
}
