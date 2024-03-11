import { Link } from "react-router-dom";
import { Driver, DriverDetailed } from "@types";
import { fetchDriverDetails, fetchDrivers } from "@services";
import { useDataListDetails, useEntityCrud, useModalContext } from "@hooks";
import { convertCPFToLocaleFormat, isDriverDetailedData } from "@utils";
import { Card, CardList, Loading, EmptyData, Error, DriverForm, DeleteDialog } from "@components";

const DriverList = () => {
  const { openModal } = useModalContext();
  const { deleteDriver } = useEntityCrud();
  const { data, isLoading, isError } = useDataListDetails<Driver, DriverDetailed>(
    ["driver"],
    fetchDrivers,
    fetchDriverDetails,
    isDriverDetailedData,
  );

  const handleEditAction = (driver: Driver) => {
    openModal({
      component: <DriverForm initialDriver={driver} />,
    });
  };

  const handleDeleteAction = (driver: Driver) => {
    openModal({
      component: (
        <DeleteDialog
          entity="driver"
          identification={driver.fullName}
          onConfirm={() => {
            deleteDriver(driver);
          }}
        />
      ),
    });
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
                editCallback={() => handleEditAction(driver)}
                deleteCallback={() => handleDeleteAction(driver)}
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
