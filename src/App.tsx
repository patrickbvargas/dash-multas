import { Content, Header, Sidebar } from "@layout";
import { AppContextProvider } from "@contexts";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white p-4 dark:bg-black-950">
      <div className="grid-row grid h-full w-full max-w-[80rem] grid-cols-layout grid-rows-layout overflow-hidden rounded-2xl bg-gray-50 dark:bg-black-900">
        <AppContextProvider>
          <BrowserRouter>
            <Sidebar className="row-span-full" />
            <Header />
            <Content />
          </BrowserRouter>
        </AppContextProvider>
      </div>
    </div>
  );
}

export default App;
