import { Link } from "react-router-dom";
import { Card, CardList, Loading, EmptyData, Error } from "@components";
import { useAppContext } from "@contexts";
import { useDataListDetails } from "@hooks";
import { TrafficViolation, TrafficViolationDetailed } from "@types";
import { fetchTrafficViolationDetails, fetchTrafficViolations } from "@services";
import { isTrafficViolationDetailedData } from "@utils";

const TrafficViolationList = () => {
  const { showNotification } = useAppContext();
  const { data, isError, isLoading } = useDataListDetails<TrafficViolation, TrafficViolationDetailed>(
    ["traffic-violation"],
    fetchTrafficViolations,
    fetchTrafficViolationDetails,
    isTrafficViolationDetailedData,
  );

  const handleEditAction = (id: string) => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de edição. [TrafficViolationId: ${id}]`,
      "warning",
    );
  };

  const handleDeleteAction = (id: string) => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de exclusão. [TrafficViolationId: ${id}]`,
      "warning",
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!data) return <EmptyData />;

  return (
    <div className="h-full">
      <CardList>
        {data.map(({ trafficViolation, driver, appeal }) => (
          <Link to={`/infracoes/${trafficViolation.id}`} key={trafficViolation.id}>
            <Card.Root>
              <Card.Header
                title={trafficViolation.infringementNotice}
                isPriority={trafficViolation.selfSuspensive}
                editCallback={() => handleEditAction(trafficViolation.id)}
                deleteCallback={() => handleDeleteAction(trafficViolation.id)}
              />
              <Card.Divider />
              <Card.Content>
                <Card.Field label="Condutor" value={driver.fullName} />
                <Card.Field label="Placa" value={trafficViolation.vehicle.plate} />
                <Card.Field label="Recurso" value={appeal?.code ?? "N/A"} variant="highlight" />
              </Card.Content>
            </Card.Root>
          </Link>
        ))}
      </CardList>
    </div>
  );
};

export default TrafficViolationList;
