import React from "react";
import { AppContext } from "@contexts";

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === null) throw new Error("useContext must be inside App Provider");
  return context;
}
