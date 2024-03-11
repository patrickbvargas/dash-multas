import { cn } from "@utils";
import { Entity } from "@types";
import { Button } from "@components";
import { TrashIcon } from "@icons/mini";
import { useModalContext } from "@hooks";

interface DeleteDialogProps {
  entity: Entity;
  identification: string;
  onConfirm: () => void;
}

const entityAlias: Record<Entity, string> = {
  driver: "condutor",
  appeal: "recurso",
  trafficViolation: "infração",
};

const DeleteDialog = ({
  entity = "driver",
  identification = "",
  onConfirm = () => {},
}: DeleteDialogProps) => {
  const { closeModal } = useModalContext();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div
      className={cn(
        "flex max-w-[24rem] flex-col gap-4 rounded-lg p-5",
        "bg-gray-50 text-gray-600",
        "dark:bg-black-700 dark:text-black-100",
      )}
    >
      <p className="text-lg font-normal uppercase tracking-wider">Remover {entityAlias[entity]}</p>
      <p className="text-sm leading-6">
        Registro <span className={cn("uppercase", "text-red-500", "text-red-700")}>{identification}</span>{" "}
        será removido e não poderá ser restaurado.
      </p>
      <div className="flex justify-end gap-2">
        <Button label="Cancelar" variant="ghost" onClick={closeModal} />
        <Button
          label="Remover"
          icon={<TrashIcon className="h-4" />}
          variant="danger"
          className="rounded-md"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default DeleteDialog;
