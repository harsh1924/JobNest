import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/app-layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/onboarding'
import JobListing from './pages/job-listing'
import JobPage from './pages/job'
import PostJob from './pages/PostJob'
import SavedJobs from './pages/SavedJobs'
import MyJobs from './pages/my-jobs'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/protected-route'

// TS - 2:08:00

function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/onboarding',
          element:
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
        },
        {
          path: '/jobs',
          element:
            <ProtectedRoute>
              <JobListing />
            </ProtectedRoute>
        },
        {
          path: '/job/:id',
          element:
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
        },
        {
          path: '/post-job',
          element:
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
        },
        {
          path: '/saved-jobs',
          element:
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
        },
        {
          path: '/my-jobs',
          element:
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
        },
      ]
    }
  ])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>

  )
}

export default App
