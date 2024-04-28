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
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { WagmiProvider } from "wagmi";

import { config } from "./config";
import { HUB_URL } from "./libs/constants";

function App() {
  const queryClient = new QueryClient();

  const Container = (
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href={HUB_URL} />
        <meta
          name="description"
          content="Explore the hub, where everything happens over the Graphlinq ecosystem, through our app, connect and build around the Graphlinq chain: bridge, swap, launch a token, create and manage LP and much more!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={HUB_URL} />
        <meta property="og:title" content="Graphlinq Hub" />
        <meta
          property="og:description"
          content="Explore the hub, where everything happens over the Graphlinq ecosystem, through our app, connect and build around the Graphlinq chain: bridge, swap, launch a token, create and manage LP and much more!"
        />
        <meta
          property="og:image"
          content="https://assets-global.website-files.com/65de56ee9ed70741bfc4efc6/65e64a264313f5bc8aac595e_opengraph.webp"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={HUB_URL} />
        <meta property="twitter:title" content="Graphlinq Hub" />
        <meta
          property="twitter:description"
          content="Explore the hub, where everything happens over the Graphlinq ecosystem, through our app, connect and build around the Graphlinq chain: bridge, swap, launch a token, create and manage LP and much more!"
        />
        <meta
          property="twitter:image"
          content="https://assets-global.website-files.com/65de56ee9ed70741bfc4efc6/65e64a264313f5bc8aac595e_opengraph.webp"
        />
      </Helmet>
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
