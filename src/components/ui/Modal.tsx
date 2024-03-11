import { cn } from "@utils";
import { ModalProps } from "@types";
import { XMarkIcon } from "@icons/mini";
import { useModalContext } from "@hooks";

const Modal = ({ component = null }: ModalProps) => {
  const { closeModal } = useModalContext();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950/50 p-2 backdrop-blur-sm">
      <div className="flex flex-col">
        <XMarkIcon
          className={cn(
            "absolute mr-3 mt-3 h-8 cursor-pointer place-self-end",
            "text-gray-500",
            "dark:text-black-400",
          )}
          onClick={closeModal}
        />
        {component}
      </div>
    </div>
  );
};

export default Modal;
