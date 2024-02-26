import { Content, Header, Sidebar } from "@layout";
import { AppContextProvider } from "@contexts";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QUERY_STALE_TIME_IN_SECONDS = 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_IN_SECONDS * 1000,
    },
  },
});

function App() {
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="grid-row relative grid h-full w-full max-w-[80rem] grid-cols-layout grid-rows-layout overflow-hidden bg-gray-50 dark:bg-black-900 lg:rounded-2xl">
            <Sidebar className="row-span-full" />
            <Header />
            <Content />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </AppContextProvider>
  );
}

export default App;
