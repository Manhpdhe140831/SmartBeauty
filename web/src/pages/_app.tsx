import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarLayout from "../components/layout/sidebar.layout";
import { UserRole } from "../const/user-role.const";
import { AppPageInterface } from "../interfaces/app-page.interface";
import { Provider } from "jotai";
import { MantineProvider } from "@mantine/core";

// Create a react-query client
const queryClient = new QueryClient();

/**
 * TODO: managing state
 */
const MyApp: AppType = ({ Component, pageProps }) => {
  // safe parse the Component to correct type
  const renderPage = Component as AppPageInterface;
  const useLayout =
    renderPage.useLayout ??
    ((p: JSX.Element) => (
      <SidebarLayout role={UserRole.anonymous}>{p}</SidebarLayout>
    ));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            {useLayout(<Component {...pageProps} />)}
          </MantineProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
