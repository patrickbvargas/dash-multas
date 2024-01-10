import React from "react";
import { Card, CardList } from "@components";
import { fetchDrivers } from "@services";
import { IDriverList } from "@types";
import { Link } from "react-router-dom";

// TODO: refatore code | include selfSuspensive check | include trafficViolationCount
const DriverList = () => {
  const [data, setData] = React.useState<IDriverList[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDrivers();
      setData(res);
    };
    fetchData();
  }, []);

  // TODO: create useFetch and get isLoading  - include Loading component - include <Error
  // TODO: include EmptyData component
  if (!data) return;

  return (
    <div className="h-full">
      <CardList>
        {data.map((driver) => (
          <Link to={`/condutores/${driver.id}`} key={driver.id}>
            <Card.Root>
              <Card.Header title={driver.fullName} isPriority={driver.isPriority} />
              <Card.Divider />
              <Card.Content>
                <Card.Field label="CPF" value={driver.cpf} />
                <Card.Field label="CNH" value={driver.licenseNumber} />
                <Card.Field label="Infrações" value={driver.trafficViolationsCount} variant="highlight" />
              </Card.Content>
            </Card.Root>
          </Link>
        ))}
      </CardList>
    </div>
  );
};

export default DriverList;
