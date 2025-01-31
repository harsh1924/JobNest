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
          element: <Onboarding />
        },
        {
          path: '/jobs',
          element: <JobListing />
        },
        {
          path: '/job/:id',
          element: <JobPage />
        },
        {
          path: '/post-job',
          element: <PostJob />
        },
        {
          path: '/saved-job',
          element: <SavedJobs />
        },
        {
          path: '/my-jobs',
          element: <MyJobs />
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router}>
      <div className="text-rose-600 text-6xl">
        Harsh
      </div>
    </RouterProvider>
  )
}

export default App
