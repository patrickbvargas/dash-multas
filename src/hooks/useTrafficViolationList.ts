import { fetchTrafficViolationDetails, fetchTrafficViolations } from "@services";
import { useQueries, useQuery } from "@tanstack/react-query";
import { isTrafficViolationDetailedData } from "@utils";

export function useTrafficViolationList() {
  const {
    data: trafficViolations,
    isLoading: isTrafficViolationsLoading,
    isError: isTrafficViolationsError,
  } = useQuery({
    queryKey: ["get-traffic-violations"],
    queryFn: fetchTrafficViolations,
  });

  const {
    data: trafficViolationsDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useQueries({
    queries:
      trafficViolations?.map((trafficViolation) => ({
        queryKey: ["get-traffic-violation-details", trafficViolation.id],
        queryFn: () => fetchTrafficViolationDetails(trafficViolation),
      })) ?? [],
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter((data) => data !== null && data !== undefined)
          .filter(isTrafficViolationDetailedData),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((results) => results.isError),
      };
    },
  });

  return {
    data: trafficViolationsDetails,
    isLoading: isTrafficViolationsLoading || isDetailsLoading,
    isError: isTrafficViolationsError || isDetailsError,
  };
}
