import { fetchAppealDetails, fetchAppeals } from "@services";
import { useQueries, useQuery } from "@tanstack/react-query";
import { AppealStatusGroup } from "@types";
import { isAppealDetailedData } from "@utils";

export function useAppealList(statusGroup: AppealStatusGroup | null) {
  const {
    data: appeals,
    isLoading: isAppealsLoading,
    isError: isAppealsError,
  } = useQuery({
    queryKey: ["get-appeals", statusGroup],
    queryFn: () => fetchAppeals(statusGroup),
  });

  const {
    data: appealsDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useQueries({
    queries:
      appeals?.map((appeal) => ({
        queryKey: ["get-appeal-details", appeal.id],
        queryFn: () => fetchAppealDetails(appeal),
      })) ?? [],
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter((data) => data !== null && data !== undefined)
          .filter(isAppealDetailedData),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });

  return {
    data: appealsDetails,
    isLoading: isAppealsLoading || isDetailsLoading,
    isError: isAppealsError || isDetailsError,
  };
}
