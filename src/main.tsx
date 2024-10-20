import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@fontsource-variable/public-sans"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Error from './page/error'
import Login from './page/login'
import Root from './page/root'

const router = createBrowserRouter([
  {
    path: '',
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <Root />
      },
      {
        path: 'login',
        element: <Login />
      },
    ],
    errorElement: <Error />,
  },
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
