import Footer from "@components/Footer"
import Header from "@components/Header"
import { AppContextProvider } from "@context/AppContext"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom"
import HomePage from '@pages/Home'
import BridgePage from '@pages/Bridge'


function App() {

  const queryClient = new QueryClient()

  const Container = (
    <HelmetProvider>
      <AppContextProvider>
            <QueryClientProvider client={queryClient}>
              <Header />
              <main className='main'>
                <Outlet />
              </main>
              <Footer />
              <ScrollRestoration />
            </QueryClientProvider>
      </AppContextProvider>
    </HelmetProvider>
  )

  const router = createBrowserRouter([
    {
      element: Container,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/bridge",
          element: <BridgePage />
        },
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
