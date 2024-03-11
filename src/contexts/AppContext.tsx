import React from "react";

interface AppContext {
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = React.createContext<AppContext | null>(null);

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [pageTitle, setPageTitle] = React.useState("");

  return (
    <AppContext.Provider
      value={{
        pageTitle,
        setPageTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
