import React from "react";
import { Card, CardList } from "@components";
import { fetchTrafficViolations } from "@services";
import { ITrafficViolationList } from "@types";

// TODO - check Appeal
const TrafficViolationList = () => {
  const [data, setData] = React.useState<ITrafficViolationList[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetchTrafficViolations();
      setData(res);
    };
    fetchData();
  }, []);

  // TODO: include NotData component
  if (!data) return;

  return (
    <div className="h-full">
      <CardList>
        {data.map((trafficViolation) => (
          <Card.Root key={trafficViolation.id}>
            <Card.Header
              title={trafficViolation.infringementNotice}
              isPriority={trafficViolation.selfSuspensive}
            />
            <Card.Divider />
            <Card.Content>
              <Card.Field label="Condutor" value={trafficViolation.driver.fullName} />
              <Card.Field label="Placa" value={trafficViolation.vehicle.plate} />
              <Card.Field label="Recurso" value={trafficViolation.appeal.code} variant="highlight" />
            </Card.Content>
          </Card.Root>
        ))}
      </CardList>
    </div>
  );
};

export default TrafficViolationList;
