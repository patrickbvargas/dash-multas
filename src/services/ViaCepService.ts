import { ADDRESS_STATES } from "@constants";
import { Address } from "@types";
import { isViaCepAddressData } from "@utils";
import { VIA_CEP_API_BASE_URL } from "@environment";

export const fetchAddressByZipCode = async (zipCode: string): Promise<Address | null> => {
  try {
    const response = await fetch(`${VIA_CEP_API_BASE_URL}/${zipCode}/json`);
    const data = await response.json();

    if (!isViaCepAddressData(data)) return null;

    return {
      street: data.logradouro,
      houseNumber: "",
      complement: "",
      zipCode: zipCode,
      neighborhood: data.bairro,
      city: data.localidade,
      state: ADDRESS_STATES.find((state) => state.uf === data.uf)?.name ?? "",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
