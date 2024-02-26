import { fetchDriverDetails, fetchDrivers } from "@services";
import { useQuery, useQueries } from "@tanstack/react-query";
import { isDriverDetailedData } from "@utils";

export function useDriverList() {
  const {
    data: drivers,
    isLoading: isDriversLoading,
    isError: isDriversError,
  } = useQuery({
    queryKey: ["get-drivers"],
    queryFn: fetchDrivers,
  });

  const {
    data: driversDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useQueries({
    queries:
      drivers?.map((driver) => ({
        queryKey: ["get-driver-details", driver.id],
        queryFn: () => fetchDriverDetails(driver),
      })) ?? [],
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter((data) => data !== null && data !== undefined)
          .filter(isDriverDetailedData),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });

  return {
    data: driversDetails,
    isLoading: isDriversLoading || isDetailsLoading,
    isError: isDriversError || isDetailsError,
  };
}
