import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarLayout from "../components/layout/sidebar.layout";
import { UserRole } from "../const/user-role.const";
import { AppPageInterface } from "../interfaces/app-page.interface";
import { Provider } from "jotai";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import BreadcrumbsLayout from "../components/layout/breadcrumbs.layout";

// Create a react-query client
const queryClient = new QueryClient();

/**
 * TODO: managing state
 */
const MyApp: AppType = ({ Component, pageProps }) => {
  // safe parse the Component to correct type
  const RenderPage = Component as AppPageInterface;
  const useLayout =
    RenderPage.useLayout ??
    ((p: JSX.Element) => (
      <SidebarLayout role={UserRole.anonymous}>
        <BreadcrumbsLayout>{p}</BreadcrumbsLayout>
      </SidebarLayout>
    ));

  /**
   * Allow Mantine to run after TailwindCSS load (prevent override the component CSS)
   */
  const appendCache = createEmotionCache({ key: "mantine", prepend: false });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <MantineProvider
            emotionCache={appendCache}
            withGlobalStyles
            withNormalizeCSS
          >
            {useLayout(<Component {...pageProps} />)}
          </MantineProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
