import { Link } from "react-router-dom";
import { Card, CardList, Loading, EmptyData, Error } from "@components";
import { fetchDriversDetails } from "@services";
import { useQuery } from "react-query";
import { convertCPFToLocaleFormat } from "@utils";
import { useAppContext } from "@contexts";

const DriverList = () => {
  const { showNotification } = useAppContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-drivers"],
    queryFn: fetchDriversDetails,
  });

  const handleEditAction = (id: string) => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de edição. [DriverId: ${id}]`,
      "warning",
    );
  };

  const handleDeleteAction = (id: string) => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de exclusão. [DriverId: ${id}]`,
      "warning",
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!data) return <EmptyData />;

  return (
    <div className="h-full">
      <CardList>
        {data.map(({ driver, trafficViolations }) => (
          <Link to={`/condutores/${driver.id}`} key={driver.id}>
            <Card.Root>
              <Card.Header
                title={driver.fullName}
                isPriority={trafficViolations?.some((tv) => tv.selfSuspensive) ?? false}
                editCallback={() => handleEditAction(driver.id)}
                deleteCallback={() => handleDeleteAction(driver.id)}
              />
              <Card.Divider />
              <Card.Content>
                <Card.Field label="CPF" value={convertCPFToLocaleFormat(driver.cpf)} />
                <Card.Field label="CNH" value={driver.license.licenseNumber} />
                <Card.Field label="Infrações" value={trafficViolations?.length ?? 0} variant="highlight" />
              </Card.Content>
            </Card.Root>
          </Link>
        ))}
      </CardList>
    </div>
  );
};

export default DriverList;
