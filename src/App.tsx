import Footer from "@components/Footer";
import Header from "@components/Header";
import TxProgress from "@components/TxProgress";
import { AppContextProvider } from "@context/AppContext";
import BridgePage from "@pages/Bridge";
import HomePage from "@pages/Home";
import PoolPage from "@pages/Pool";
import PoolNewPage from "@pages/PoolNew";
import PoolSinglePage from "@pages/PoolSingle";
import PoolSingleAddPage from "@pages/PoolSingleAdd";
import SwapPage from "@pages/Swap";
import WrapperPage from "@pages/Wrapper";
import RewardsPage from "@pages/Rewards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { WagmiProvider } from "wagmi";

import { config } from "./config";

function App() {
  const queryClient = new QueryClient();

  const Container = (
    <HelmetProvider>
      <AppContextProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <TxProgress />
            <main className="main">
              <Outlet />
            </main>
            <Footer />
            <ScrollRestoration />
          </QueryClientProvider>
        </WagmiProvider>
      </AppContextProvider>
    </HelmetProvider>
  );

  const router = createBrowserRouter([
    {
      element: Container,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/pool",
          element: <PoolPage />,
        },
        {
          path: "/pool/new",
          element: <PoolNewPage />,
        },
        {
          path: "/pool/:id",
          element: <PoolSinglePage />,
        },
        {
          path: "/pool/:id/add",
          element: <PoolSingleAddPage />,
        },
        {
          path: "/bridge",
          element: <BridgePage />,
        },
        {
          path: "/swap",
          element: <SwapPage />,
        },
        {
          path: "/wrapper",
          element: <WrapperPage />,
        },
        {
          path: "/rewards",
          element: <RewardsPage />,
        },
        {
          path: "*", // Route "catch-all"
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
