import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarLayout from "../components/layout/sidebar.layout";
import { USER_ROLE } from "../const/user-role.const";
import { AppPageInterface } from "../interfaces/app-page.interface";
import { Provider } from "jotai";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import BreadcrumbsLayout from "../components/layout/breadcrumbs.layout";
import { useAuthUser } from "../store/auth-user.state";
import { useRouter } from "next/router";

// Create a react-query client
const queryClient = new QueryClient();

/**
 * TODO: managing state
 */
const MyApp: AppType = ({ Component, pageProps }) => {
  const authState = useAuthUser();
  const router = useRouter();
  // safe parse the Component to correct type
  const RenderPage = Component as AppPageInterface;
  const pageLayout =
    RenderPage.useLayout ??
    ((p: JSX.Element) => (
      <SidebarLayout role={USER_ROLE.anonymous}>
        <BreadcrumbsLayout>{p}</BreadcrumbsLayout>
      </SidebarLayout>
    ));

  // Default all routes are guarded.
  const isGuarded: USER_ROLE = RenderPage.guarded ?? USER_ROLE.authenticated;
  // TODO: uncomment this when integrate with authentication API.
  // if (needRedirectedOnRole(router, isGuarded, authState)) {
  // return <>redirect...</>;
  // }

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
            {pageLayout(<Component {...pageProps} />)}
          </MantineProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
