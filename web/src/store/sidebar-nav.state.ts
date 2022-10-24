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
  updateByRole: (userRole?: USER_ROLE) => void;
};

function decidingConfigByRole(userRole: USER_ROLE) {
  switch (userRole) {
    case USER_ROLE.admin:
      return branchAdminConfig;
    case USER_ROLE.manager:
      return branchManagerConfig;
    case USER_ROLE.employee:
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
