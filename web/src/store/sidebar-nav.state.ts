import create from "zustand";
import { NavLinkItemProp } from "../interfaces/nav-item.interface";

type SidebarNavState = {
  config: NavLinkItemProp[];
  updateConfig: (config: NavLinkItemProp[]) => void;
};

const useSidebarNav = create<SidebarNavState>((set) => ({
  // TODO: mock
  config: [
    {
      label: "Quản lý Chi nhánh",
      nested: [
        {
          href: "/admin/manage-branches",
          label: "Chi Nhánh",
        },
        {
          href: "/admin/manage-manager",
          label: "Tài khoản",
        },
      ],
    },
    { href: "/admin/manage-treatment-courses", label: "Quản Lý Liệu Trình" },
    { href: "/admin/manage-services", label: "Quản Lý Dịch Vụ" },
    { href: "/admin/manage-products", label: "Quản Lý Sản Phẩm" },
    { href: "/admin/manage-providers", label: "Quản Lý Nhà Cung Cấp" },
    { href: "/admin/reports", label: "Báo Cáo" },
  ],
  updateConfig: (config) => set(() => ({ config: config })),
}));

export default useSidebarNav;
