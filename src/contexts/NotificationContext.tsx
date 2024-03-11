import React from "react";
import { Notification } from "@components";
import { NotificationProps } from "@types";

interface NotificationContext {
  showNotification: (notificationProps: NotificationProps) => void;
  hideNotification: () => void;
}

export const NotificationContext = React.createContext<NotificationContext | null>(null);

export const NotificationContextProvider = ({ children }: React.PropsWithChildren) => {
  const [notification, setNotification] = React.useState<NotificationProps | null>(null);

  const showNotification = (notificationProps: NotificationProps) => setNotification(notificationProps);
  const hideNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
      }}
    >
      {children}
      {notification && <Notification key="notification" {...notification} />}
    </NotificationContext.Provider>
  );
};
