import React from "react";
import { IDriver } from "@types";
import { fetchDriverById } from "@services";
import { DataField } from "@components";
import { useParams } from "react-router-dom";
import { convertDateFormat } from "@utils";
import { useAppContext } from "@contexts";

type DriverFieldGroup = "identificação" | "endereço" | "habilitação" | "contato";

// TODO: change header title to driver's name
const DriverInfo = () => {
  const [driver, setDriver] = React.useState<IDriver | null>(null);
  const { setPageTitle } = useAppContext();
  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDriverById(Number(id));
      setDriver(res);
    };
    fetchData();
  }, [id]);

  // TODO: change to component <NotData/>
  if (!driver) return <p>Not Found</p>;

  const driverFields: Record<DriverFieldGroup, { label: string; value: string | number }[]> = {
    identificação: [
      { label: "CPF", value: driver.cpf },
      { label: "RG", value: driver.identification },
      { label: "UF Emissor", value: driver.identificationState },
      { label: "Data Nascimento", value: convertDateFormat(driver.birthdate) },
      { label: "Estado Civil", value: driver.maritalStatus },
      { label: "Profissão", value: driver.profession },
    ],
    endereço: [
      { label: "Rua", value: driver.address.street },
      { label: "Número", value: driver.address.number },
      { label: "Complemento", value: driver.address.complement || "N/A" },
      { label: "CEP", value: driver.address.zipCode },
      { label: "Bairro", value: driver.address.neighborhood },
      { label: "Cidade", value: driver.address.city },
      { label: "Estado", value: driver.address.state },
    ],
    habilitação: [
      { label: "CNH", value: driver.license.licenseNumber },
      { label: "Categoria", value: driver.license.category },
      { label: "Tipo", value: "AJUSTAR!!" },
      { label: "Senha Acesso GOV", value: driver.license.governmentPassword },
    ],
    contato: [
      { label: "Email", value: driver.contact.email },
      { label: "Celular", value: driver.contact.phoneNumber },
    ],
  };

  const renderData = (groupName: DriverFieldGroup) => {
    const fields = driverFields[groupName];
    if (!fields) return null;

    return (
      <DataField.Group title={groupName}>
        {fields.map(({ label, value }) => (
          <DataField.Item key={label} label={label} value={value} />
        ))}
      </DataField.Group>
    );
  };

  setPageTitle(driver.fullName);

  return (
    <section className="flex h-full flex-col gap-2 overflow-x-hidden overflow-y-scroll rounded-lg bg-white px-4 py-3 dark:bg-black-700">
      <DataField.Wrapper>
        {renderData("identificação")}
        {renderData("endereço")}
        {renderData("habilitação")}
        {renderData("contato")}
      </DataField.Wrapper>
    </section>
  );
};

export default DriverInfo;
