import AppRouterProvider from "./providers/route";
import AppQueryClientProvider from "./providers/query-client";

const App = () => {
  return (
    <AppQueryClientProvider>
      <AppRouterProvider />
    </AppQueryClientProvider>
  );
}

export default App