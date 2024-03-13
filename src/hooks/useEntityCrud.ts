import { useNavigate } from "react-router-dom";
import { Driver } from "@types";
import { useNotificationContext } from "@hooks";
import {
  createDriver,
  updateDriver,
  deleteDriver,
  isDriverExistent,
  queryClient,
  fetchTrafficViolationsByDriverId,
} from "@services";

interface useEntityCrudOutput {
  createDriver: (driver: Driver) => Promise<void>;
  updateDriver: (driver: Driver) => Promise<void>;
  deleteDriver: (driver: Driver) => Promise<void>;
}

export function useEntityCrud(): useEntityCrudOutput {
  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();

  const invalidadeQueries = async () => {
    await queryClient.invalidateQueries(); // TODO: refatore
  };

  const handleCreateDriver = async (driver: Driver) => {
    try {
      if (await isDriverExistent(driver.cpf)) {
        showNotification({
          message: `CPF ${driver.cpf} já cadastrado!`,
          variant: "danger",
        });
        return;
      }

      const driverId = await createDriver(driver);
      await invalidadeQueries();
      navigate(`/condutores/${driverId}`);
      showNotification({
        message: `Condutor cadastrado com sucesso!`,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleUpdateDriver = async (driver: Driver) => {
    try {
      await updateDriver(driver);
      await invalidadeQueries();
      navigate(`/condutores/${driver.id}`);
      showNotification({
        message: `Condutor atualizado com sucesso!`,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDeleteDriver = async (driver: Driver) => {
    try {
      const trafficViolations = await fetchTrafficViolationsByDriverId(driver.id);
      if (Array.isArray(trafficViolations) && trafficViolations.length > 0) {
        showNotification({
          message: `Condutor possui infrações associadas. Por favor, remova-as antes de prosseguir.`,
          variant: "danger",
        });
        return;
      }

      await deleteDriver(driver);
      await invalidadeQueries();
      navigate("/condutores");
      showNotification({
        message: `Condutor removido com sucesso!`,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    createDriver: handleCreateDriver,
    updateDriver: handleUpdateDriver,
    deleteDriver: handleDeleteDriver,
  };
}
