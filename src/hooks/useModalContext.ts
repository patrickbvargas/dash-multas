import React from "react";
import { ModalContext } from "@contexts";

export function useModalContext() {
  const context = React.useContext(ModalContext);
  if (context === null) throw new Error("useContext must be inside Modal Provider");
  return context;
}
