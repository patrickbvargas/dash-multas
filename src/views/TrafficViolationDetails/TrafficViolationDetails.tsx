import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
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
import { fetchTrafficViolationsDetailsById } from "@services";
import { DetailGroup } from "@types";
import { convertCPFToLocaleFormat, convertDateToLocaleFormat } from "@utils";
import { useAppContext } from "@contexts";

const TrafficViolationDetails = () => {
  const { id: trafficViolationId } = useParams();
  const { showNotification } = useAppContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-traffic-violation-details", trafficViolationId],
    queryFn: () => {
      return trafficViolationId ? fetchTrafficViolationsDetailsById(trafficViolationId) : null;
    },
  });

  const handleEditAction = () => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de edição. [TrafficViolationId: ${trafficViolationId}]`,
      "warning",
    );
  };

  const handleDeleteAction = () => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de exclusão. [TrafficViolationId: ${trafficViolationId}]`,
      "warning",
    );
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
        { label: "Autuador", value: trafficViolation.infringementNotice },
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
