import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const appQueryClient = new QueryClient()

const AppQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={appQueryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default AppQueryClientProvider