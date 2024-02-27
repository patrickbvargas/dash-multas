import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DetailGroup } from "@types";
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
import { fetchAppealDetailsById } from "@services";
import { convertDateToLocaleFormat, convertCurrencyToLocaleFormat, convertCPFToLocaleFormat } from "@utils";
import { useAppContext } from "@contexts";

const AppealDetails = () => {
  const { id: appealId } = useParams();
  const { showNotification } = useAppContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-details", "appeal", appealId],
    queryFn: () => {
      return appealId ? fetchAppealDetailsById(appealId) : null;
    },
  });

  const handleEditAction = () => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de edição. [AppealId: ${appealId}]`,
      "warning",
    );
  };

  const handleDeleteAction = () => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de exclusão. [AppealId: ${appealId}]`,
      "warning",
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!data) return <NotFound />;

  const { appeal, driver, trafficViolation, employee } = data;

  const appealDetails: DetailGroup[] = [
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
      title: "Infração",
      linkTo: `/infracoes/${trafficViolation.id}`,
      fields: [
        { label: "Auto de Infração", value: trafficViolation.infringementNotice },
        { label: "Placa", value: trafficViolation.vehicle.plate },
        { label: "RENAVAM", value: trafficViolation.vehicle.renavam },
      ],
    },
    {
      title: "Detalhes",
      linkTo: null,
      fields: [
        { label: "Responsável", value: employee.fullName },
        { label: "Serviço", value: appeal.service },
        { label: "Valor", value: convertCurrencyToLocaleFormat(appeal.cost) },
        { label: "Forma Pagamento", value: appeal.paymentType },
        { label: "Prazo Fatal", value: convertDateToLocaleFormat(appeal.deadline) },
        { label: "Observação", value: appeal.observation ?? "N/A" },
      ],
    },
  ];

  return (
    <DetailsPageWrapper
      pageTitle={appeal.code}
      pageKpi={<Kpi title="Status" value={appeal.status} variant="tag" tagVariant={appeal.statusGroup} />}
      pageTag={
        trafficViolation.selfSuspensive ? <Tag label="autosuspensiva" variant="autosuspensiva" /> : null
      }
      pageActions={<ActionControls editCallback={handleEditAction} deleteCallback={handleDeleteAction} />}
      pageData={<DetailsDisplay data={appealDetails} />}
    />
  );
};

export default AppealDetails;
