import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import serviceRouter from './routes';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={serviceRouter} />
    </QueryClientProvider>
  </StrictMode>,
)
