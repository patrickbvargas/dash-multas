import { Modal } from "@components";
import { ModalProps } from "@types";
import React from "react";

interface ModalContext {
  openModal: (modalProps: ModalProps) => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<ModalContext | null>(null);

export const ModalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [modal, setModal] = React.useState<ModalProps | null>(null);

  const openModal = (modalProps: ModalProps) => setModal(modalProps);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      {modal && <Modal key="modal" {...modal} />}
    </ModalContext.Provider>
  );
};
