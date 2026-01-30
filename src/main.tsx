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
import { AiChatPage } from '@/pages/AiChatPage'
import { BrowsePage } from '@/pages/BrowsePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { AndroidShell } from '@/components/layout/AndroidShell'
// Placeholder for future specialized tools
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
    <h2 className="text-2xl font-sketchy">{title}</h2>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Synchronizing edge nodes for the next-gen {title.toLowerCase()} module. Estimated availability: Phase 3.5.
    </p>
  </div>
);
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
    element: <AndroidShell><BrowsePage /></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/ai-chat",
    element: <AndroidShell><AiChatPage /></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/settings",
    element: <AndroidShell><SettingsPage /></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/calculator",
    element: <AndroidShell><PlaceholderPage title="Quota Calculator" /></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/quizzes",
    element: <AndroidShell><PlaceholderPage title="Technical Quiz" /></AndroidShell>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/templates",
    element: <AndroidShell><PlaceholderPage title="Code Lab" /></AndroidShell>,
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