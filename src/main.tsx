import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { TopicViewer } from '@/pages/TopicViewer'
import { AndroidShell } from '@/components/layout/AndroidShell'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <AndroidShell><HomePage /></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/topic/:topicId",
    element: <AndroidShell><TopicViewer /></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/browse",
    element: <AndroidShell><div className="p-8 font-illustrative text-2xl">Browse Directory Coming Soon</div></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/ai-chat",
    element: <AndroidShell><div className="p-8 font-illustrative text-2xl">AI Tools Interface Coming Soon</div></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/settings",
    element: <AndroidShell><div className="p-8 font-illustrative text-2xl">App Settings Coming Soon</div></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)