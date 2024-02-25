import React from "react";
import { NotificationConfig, NotificationVariant } from "@types";

interface AppContext {
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
  notificationConfig: NotificationConfig;
  setNotificationConfig: React.Dispatch<React.SetStateAction<NotificationConfig>>;
  showNotification: (message: string, variant: NotificationVariant) => void;
}

export const AppContext = React.createContext<AppContext | null>(null);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === null) throw new Error("useContext must be inside Provider");
  return context;
};

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [pageTitle, setPageTitle] = React.useState("");
  const [notificationConfig, setNotificationConfig] = React.useState<NotificationConfig>({
    message: "",
    variant: "default",
  });

  const showNotification = (message: string, variant: NotificationVariant) => {
    setNotificationConfig({
      message,
      variant,
    });
  };

  return (
    <AppContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        notificationConfig,
        setNotificationConfig,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
