import React from "react";
import { NotificationContext } from "@contexts";

export function useNotificationContext() {
  const context = React.useContext(NotificationContext);
  if (context === null) throw new Error("useContext must be inside Notification Provider");
  return context;
}
