import React from "react";

interface IAppContext {
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = React.createContext<IAppContext | null>(null);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === null) throw new Error("useContext must be inside Provider");
  return context;
};

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [pageTitle, setPageTitle] = React.useState("");

  return <AppContext.Provider value={{ pageTitle, setPageTitle }}>{children}</AppContext.Provider>;
};
