import { USER_ROLE } from "../const/user-role.const";
import { NextRouter } from "next/router";
import { UserModel } from "../model/user.model";

/**
 * If this function returns true, it needs to be redirected.
 * @param router
 * @param isGuarded
 * @param user
 * @constructor
 */
export function needRedirectedOnRole(
  router: NextRouter,
  isGuarded: USER_ROLE,
  user: UserModel | null
) {
  if (isGuarded !== USER_ROLE.all) {
    // the page is limited to specific role config.
    if (isGuarded !== USER_ROLE.anonymous) {
      if (!user) {
        // user doesn't login, we navigate to login page.
        void router.push("/login");
        return true;
      }

      if (isGuarded === USER_ROLE.authenticated) {
        // this page is guard for authenticated user only.
        // allow the user to access this page -> no need to redirect.
        return false;
      }

      // the page is protected by a role config
      // (must log in with the correct role).
      if (isGuarded !== user?.role) {
        void router.push("/401");
        return true;
      }
      // user challenges the page guard successfully.
      // proceed to render the page.
    } else {
      // the render page is for anonymous users.
      // (user must not login)
      if (user) {
        // if the user is authenticated -> move the user back home
        void router.push("/");
        return true;
      }
    }
  }
  return false;
}
