import { Link } from "react-router-dom";
import { fetchAppealDetails, fetchAppeals } from "@services";
import { Appeal, AppealDetailed, AppealStatusGroup } from "@types";
import { useDataListDetails, useNotificationContext } from "@hooks";
import { convertDateToLocaleFormat, isAppealDetailedData } from "@utils";
import { Card, CardList, Loading, EmptyData, Tag, Error } from "@components";

interface AppealListProps {
  statusGroup?: AppealStatusGroup | null;
}

const AppealList = ({ statusGroup = null }: AppealListProps) => {
  const { showNotification } = useNotificationContext();
  const { data, isLoading, isError } = useDataListDetails<Appeal, AppealDetailed>(
    ["appeal", statusGroup],
    () => fetchAppeals(statusGroup),
    fetchAppealDetails,
    isAppealDetailedData,
  );

  const handleEditAction = (id: string) => {
    showNotification({
      message: `Quase lá! Estamos implementando funcionalidade de edição. [AppealId: ${id}]`,
      variant: "warning",
    });
  };

  const handleDeleteAction = (id: string) => {
    showNotification({
      message: `Quase lá! Estamos implementando funcionalidade de exclusão. [AppealId: ${id}]`,
      variant: "warning",
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!data) return <EmptyData />;

  return (
    <div className="h-full">
      <CardList>
        {data.map(({ appeal, trafficViolation, driver, employee }) => (
          <Link to={`/recursos/${appeal.id}`} key={appeal.id}>
            <Card.Root key={appeal.id}>
              <Card.Header
                title={appeal.code}
                isPriority={trafficViolation.selfSuspensive}
                editCallback={() => handleEditAction(appeal.id)}
                deleteCallback={() => handleDeleteAction(appeal.id)}
              />
              <Card.Divider />
              <Card.Content>
                <Card.Field label="Condutor" value={driver.fullName} />
                <Card.Field label="Responsável" value={employee.fullName} />
                <Card.Field
                  label="Prazo Fatal"
                  value={convertDateToLocaleFormat(appeal.deadline)}
                  variant="highlight"
                />
                <Tag label={appeal.status} variant={appeal.statusGroup} />
              </Card.Content>
            </Card.Root>
          </Link>
        ))}
      </CardList>
    </div>
  );
};

export default AppealList;
