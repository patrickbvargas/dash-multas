import { useQuery, useQueries } from "@tanstack/react-query";
import { Entity } from "@types";

interface ItemList {
  id: string;
}

type QueryKeysType = [Entity, (string | null)?];

export function useDataListDetails<T extends ItemList, D>(
  queryKeys: QueryKeysType,
  fetchListFn: () => Promise<T[] | null>,
  fetchDetailsFn: (item: T) => Promise<D>,
  isDetailedDataFn: (data: unknown) => data is D,
) {
  const {
    data: list,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: ["get-list", ...queryKeys],
    queryFn: fetchListFn,
  });

  const detailsQuery =
    list?.map((item) => ({
      queryKey: ["get-details", queryKeys[0], item.id],
      queryFn: () => fetchDetailsFn(item),
    })) ?? [];

  const {
    data: details,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useQueries({
    queries: detailsQuery,
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter((data) => data !== undefined)
          .filter(isDetailedDataFn),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });

  return {
    data: details.length > 0 ? details : null,
    isLoading: isListLoading || isDetailsLoading,
    isError: isListError || isDetailsError,
  };
}
