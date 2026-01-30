import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react'
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
import { CalculatorPage } from '@/pages/CalculatorPage'
import { QuizPage } from '@/pages/QuizPage'
import { TemplatesPage } from '@/pages/TemplatesPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { NetworkMapPage } from '@/pages/NetworkMapPage'
import { SharePage } from '@/pages/SharePage'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <AndroidShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "topic/:topicId",
        element: <TopicViewer />,
      },
      {
        path: "browse",
        element: <BrowsePage />,
      },
      {
        path: "ai-chat",
        element: <AiChatPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "calculator",
        element: <CalculatorPage />,
      },
      {
        path: "quizzes",
        element: <QuizPage />,
      },
      {
        path: "templates",
        element: <TemplatesPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "network",
        element: <NetworkMapPage />,
      },
      {
        path: "share",
        element: <SharePage />,
      }
    ]
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