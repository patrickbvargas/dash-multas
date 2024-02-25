import { Link } from "react-router-dom";
import { Card, CardList, Loading, EmptyData, Tag, Error } from "@components";
import { fetchAppealsDetails } from "@services";
import { convertDateToLocaleFormat } from "@utils";
import { useQuery } from "react-query";
import { useAppContext } from "@contexts";
import { AppealStatusGroup } from "@types";

interface AppealListProps {
  statusGroup?: AppealStatusGroup | null;
}

const AppealList = ({ statusGroup = null }: AppealListProps) => {
  const { showNotification } = useAppContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-appeals", statusGroup],
    queryFn: () => fetchAppealsDetails(statusGroup),
  });

  const handleEditAction = (id: string) => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de edição. [AppealId: ${id}]`,
      "warning",
    );
  };

  const handleDeleteAction = (id: string) => {
    showNotification(
      `Quase lá! Estamos implementando funcionalidade de exclusão. [AppealId: ${id}]`,
      "warning",
    );
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
