import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { cn } from "@utils";
import { Content, Header, Sidebar } from "@layout";
import { queryClient } from "@services";
import { AppContextProvider, ModalContextProvider, NotificationContextProvider } from "@contexts";

function App() {
  return (
    <div
      className={cn(
        "relative grid h-full w-full max-w-[80rem] grid-cols-layout grid-rows-layout overflow-hidden lg:rounded-2xl",
        "bg-gray-50",
        "dark:bg-black-900",
      )}
    >
      <BrowserRouter>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationContextProvider>
              <ModalContextProvider>
                <Sidebar className="row-span-full" />
                <Header />
                <Content />
              </ModalContextProvider>
            </NotificationContextProvider>
          </QueryClientProvider>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
