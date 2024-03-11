import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DetailGroup } from "@types";
import { useEntityCrud, useModalContext } from "@hooks";
import {
  ActionControls,
  DetailsDisplay,
  DetailsPageWrapper,
  Kpi,
  Loading,
  Error,
  NotFound,
  DriverForm,
  DeleteDialog,
} from "@components";
import { fetchDriverDetailsById } from "@services";
import {
  convertCPFToLocaleFormat,
  convertDateToLocaleFormat,
  convertPhoneNumberToLocaleFormat,
  convertZipCodeToLocaleFormat,
} from "@utils";

const DriverDetails = () => {
  const { id: driverId } = useParams();
  const { openModal } = useModalContext();
  const { deleteDriver } = useEntityCrud();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-details", "driver", driverId],
    queryFn: () => {
      return driverId ? fetchDriverDetailsById(driverId) : null;
    },
  });

  const handleEditAction = () => {
    if (!data) return;
    openModal({
      component: <DriverForm initialDriver={data.driver} />,
    });
  };

  const handleDeleteAction = () => {
    if (!data) return;
    openModal({
      component: (
        <DeleteDialog
          entity="driver"
          identification={data.driver.fullName}
          onConfirm={() => {
            deleteDriver(data.driver);
          }}
        />
      ),
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!data) return <NotFound />;

  const { driver, trafficViolations } = data;

  const driverDetails: DetailGroup[] = [
    {
      title: "Identificação",
      linkTo: null,
      fields: [
        { label: "CPF", value: convertCPFToLocaleFormat(driver.cpf) },
        { label: "RG", value: driver.identification },
        { label: "UF Emissor", value: driver.identificationState },
        { label: "Data Nascimento", value: convertDateToLocaleFormat(driver.birthdate) },
        { label: "Estado Civil", value: driver.maritalStatus },
        { label: "Profissão", value: driver.profession },
      ],
    },
    {
      title: "Endereço",
      linkTo: null,
      fields: [
        { label: "Logradouro", value: driver.address.street },
        { label: "Número", value: driver.address.houseNumber },
        { label: "Complemento", value: driver.address.complement || "N/A" },
        { label: "CEP", value: convertZipCodeToLocaleFormat(driver.address.zipCode) },
        { label: "Bairro", value: driver.address.neighborhood },
        { label: "Cidade", value: driver.address.city },
        { label: "Estado", value: driver.address.state },
      ],
    },
    {
      title: "Habilitação",
      linkTo: null,
      fields: [
        { label: "CNH", value: driver.license.licenseNumber },
        { label: "Categoria", value: driver.license.category },
        { label: "Senha Acesso GOV", value: driver.license.governmentPassword, variant: "password" },
      ],
    },
    {
      title: "Contato",
      linkTo: null,
      fields: [
        { label: "Email", value: driver.contact.email },
        { label: "Celular", value: convertPhoneNumberToLocaleFormat(driver.contact.phoneNumber) },
      ],
    },
  ];

  return (
    <DetailsPageWrapper
      pageTitle={driver.fullName}
      pageKpi={<Kpi title="Infrações" value={trafficViolations?.length ?? 0} />}
      pageActions={<ActionControls editCallback={handleEditAction} deleteCallback={handleDeleteAction} />}
      pageData={<DetailsDisplay data={driverDetails} />}
    />
  );
};

export default DriverDetails;
