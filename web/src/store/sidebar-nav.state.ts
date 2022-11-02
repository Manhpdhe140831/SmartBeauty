import create from "zustand";
import { NavLinkItemProp } from "../interfaces/nav-item.interface";
import { USER_ROLE } from "../const/user-role.const";
import {
  branchAdminConfig,
  branchEmployeeConfig,
  branchManagerConfig,
} from "../const/sidebar-nav.const";

type SidebarNavState = {
  config: NavLinkItemProp[];
  // update the state with the sidebar config for the corresponding role.
  updateByRole: (userRole?: USER_ROLE) => void;
};

function decidingConfigByRole(userRole: USER_ROLE) {
  switch (userRole) {
    case USER_ROLE.admin:
      return branchAdminConfig;
    case USER_ROLE.manager:
      return branchManagerConfig;
    case USER_ROLE.employee_sale:
    // TODO create new menu for employee_tech
    case USER_ROLE.employee_tech:
      return branchEmployeeConfig;
  }
  console.warn(
    "Navigation config for this role cannot be found. Role:",
    userRole
  );
  return [];
}

const useSidebarNav = create<SidebarNavState>((set) => ({
  config: [],
  updateByRole: (role) =>
    set(() => ({ config: role ? decidingConfigByRole(role) : [] })),
}));

export default useSidebarNav;
