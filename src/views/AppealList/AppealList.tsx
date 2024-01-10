import React from "react";
import { Card, CardList, Tag } from "@components";
import { IAppealList } from "@types";
import { fetchAppeals } from "@services";
import { convertDateFormat } from "@utils";

const AppealList = () => {
  const [data, setData] = React.useState<IAppealList[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAppeals();
      setData(res);
    };
    fetchData();
  }, []);

  // TODO: create useFetch and get isLoading  - include Loading component - include <Error/>
  // TODO: include EmptyData component
  if (!data) return;

  return (
    <div className="h-full">
      <CardList>
        {data.map((appeal) => (
          <Card.Root key={appeal.id}>
            <Card.Header title={appeal.code} isPriority={appeal.isPriority} />
            <Card.Content>
              <Card.Field label="Condutor" value={appeal.driver.fullName} />
              <Card.Field label="Responsável" value={appeal.employee.fullName} />
              <Card.Field
                label="Prazo Fatal"
                value={convertDateFormat(appeal.deadline)}
                variant="highlight"
              />
              <Tag label={appeal.status} variant={appeal.statusGroup} />
            </Card.Content>
          </Card.Root>
        ))}
      </CardList>
    </div>
  );
};

export default AppealList;
