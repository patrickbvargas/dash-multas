import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ActionControls,
  DetailsDisplay,
  DetailsPageWrapper,
  Error,
  Kpi,
  Loading,
  NotFound,
  Tag,
} from "@components";
import { DetailGroup } from "@types";
import { useNotificationContext } from "@hooks";
import { fetchTrafficViolationDetailsById } from "@services";
import { convertCPFToLocaleFormat, convertDateToLocaleFormat } from "@utils";

const TrafficViolationDetails = () => {
  const { id: trafficViolationId } = useParams();
  const { showNotification } = useNotificationContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-details", "traffic-violation", trafficViolationId],
    queryFn: () => {
      return trafficViolationId ? fetchTrafficViolationDetailsById(trafficViolationId) : null;
    },
  });

  const handleEditAction = () => {
    showNotification({
      message: `Quase lá! Estamos implementando funcionalidade de edição. [TrafficViolationId: ${trafficViolationId}]`,
      variant: "warning",
    });
  };

  const handleDeleteAction = () => {
    showNotification({
      message: `Quase lá! Estamos implementando funcionalidade de exclusão. [TrafficViolationId: ${trafficViolationId}]`,
      variant: "warning",
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!data) return <NotFound />;

  const { driver, trafficViolation, appeal } = data;

  const trafficViolationDetails: DetailGroup[] = [
    {
      title: "Condutor",
      linkTo: `/condutores/${driver.id}`,
      fields: [
        { label: "Nome", value: driver.fullName },
        { label: "CNH", value: driver.license.licenseNumber },
        { label: "CPF", value: convertCPFToLocaleFormat(driver.cpf) },
        { label: "RG", value: driver.identification },
        { label: "Data Nascimento", value: convertDateToLocaleFormat(driver.birthdate) },
        { label: "Senha Acesso GOV", value: driver.license.governmentPassword, variant: "password" },
      ],
    },
    {
      title: "Veículo",
      linkTo: null,
      fields: [
        { label: "Placa", value: trafficViolation.vehicle.plate },
        { label: "Marca", value: trafficViolation.vehicle.brand },
        { label: "RENAVAM", value: trafficViolation.vehicle.renavam },
      ],
    },
    {
      title: "Detalhes",
      linkTo: null,
      fields: [
        { label: "Autuador", value: trafficViolation.issuer },
        { label: "Amparo Legal", value: trafficViolation.legalBasis },
      ],
    },
    {
      title: "Prazos",
      linkTo: null,
      fields: [
        {
          label: "Apresentação Condutor",
          value: convertDateToLocaleFormat(trafficViolation.deadlines.driverPresentation),
        },
        {
          label: "Defesa",
          value: convertDateToLocaleFormat(trafficViolation.deadlines.defense),
        },
        {
          label: "Recurso 1ª Instância",
          value: convertDateToLocaleFormat(trafficViolation.deadlines.firstInstance),
        },
      ],
    },
  ];

  return (
    <DetailsPageWrapper
      pageTitle={trafficViolation.infringementNotice}
      pageKpi={
        <Kpi
          title="Recurso"
          value={appeal ? appeal.code : "N/A"}
          linkTo={appeal ? `/recursos/${appeal?.id}` : null}
        />
      }
      pageTag={
        trafficViolation.selfSuspensive ? <Tag label="autosuspensiva" variant="autosuspensiva" /> : null
      }
      pageActions={<ActionControls editCallback={handleEditAction} deleteCallback={handleDeleteAction} />}
      pageData={<DetailsDisplay data={trafficViolationDetails} />}
    />
  );
};

export default TrafficViolationDetails;
