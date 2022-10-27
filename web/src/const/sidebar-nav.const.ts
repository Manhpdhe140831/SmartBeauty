import { NavLinkItemProp } from "../interfaces/nav-item.interface";

// sidebar link config for admin.
export const branchAdminConfig: NavLinkItemProp[] = [
  {
    label: "Branch",
    nested: [
      {
        href: "/admin/manage-branches",
        label: "Manage Branch",
      },
      {
        href: "/admin/manage-manager",
        label: "Account Manager",
      },
    ],
  },
  { href: "/admin/manage-supplier", label: "Manager Supplier" },
  { href: "/admin/manage-products", label: "Manage Products" },
  {
    href: "/admin/manage-treatment-courses",
    label: "Treatment Courses",
  },
  { href: "/admin/manage-services", label: "Quản Lý Dịch Vụ" },
  { href: "/admin/reports", label: "Báo Cáo" },
];

export const branchManagerConfig: NavLinkItemProp[] = [
  {
    href: "/manager/manage-staff",
    label: "Quản lý nhân viên",
  },
  {
    href: "/manager/manage-bill",
    label: "Quản lý đơn hàng",
  },
  {
    href: "/manager/manage-guest",
    label: "Quản lý khách hàng",
  },
  {
    href: "/manager/manage-guest",
    label: "Quản lý kho ",
  },
];
export const branchEmployeeConfig: NavLinkItemProp[] = [];
