import { USER_ROLE } from "../const/user-role.const";
import { waitForWindow } from "./ssr.helper";
import { NextRouter } from "next/router";
import { AuthenticateUserStore } from "../store/auth-user.state";

/**
 * If this function returns true, it needs to be redirected.
 * @param router
 * @param isGuarded
 * @param authState
 * @constructor
 */
export function needRedirectedOnRole(
  router: NextRouter,
  isGuarded: USER_ROLE,
  authState: AuthenticateUserStore
) {
  if (isGuarded !== USER_ROLE.all) {
    // the page is limited to specific role config.
    if (isGuarded !== USER_ROLE.anonymous) {
      // the page is protected by a role config
      // (must log in with the correct role).
      if (isGuarded !== authState.user?.role) {
        void waitForWindow(() => router.replace("/401"));
        return true;
      }
      // user challenges the page guard successfully.
      // proceed to render the page.
    } else {
      // the render page is for anonymous users.
      // (user must not login)
      if (authState.user) {
        // if the user is authenticated -> move the user back
        void waitForWindow(() => router.replace("/login"));
        return true;
      }
    }
  }
  return false;
}
