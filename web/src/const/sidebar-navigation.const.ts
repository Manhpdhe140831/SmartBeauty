import { NavLinkItemProp } from "../interfaces/nav-item.interface";

// sidebar link config for admin.
export const branchAdminConfig: NavLinkItemProp[] = [
  { href: "/admin/manage-branches", label: "Quản Lý Chi Nhánh" },
  { href: "/admin/manage-manager", label: "Quản Lý Tài Khoản" },
  { href: "/admin/manage-supplier", label: "Quản Lý Nhà Cung Cấp" },
  { href: "/admin/manage-products", label: "Quản Lý Sản Phẩm" },
  { href: "/admin/manage-services", label: "Quản Lý Dịch Vụ" },
  {
    href: "/admin/manage-treatment-courses",
    label: "Quản Lý Liệu Trình",
  },
  { href: "/admin/reports", label: "Báo Cáo" },
];

export const branchManagerConfig: NavLinkItemProp[] = [
  {
    label: "Quản Lý Khách Hàng",
    href: "/manager/manage-customer",
  },
  {
    label: "Quản Lý Lịch Làm Việc",
    nested: [
      {
        href: "/manager/manage-schedule/work-appointment",
        label: "Quản Lý Cuộc Hẹn",
      },
    ],
  },
  {
    href: "/manager/manage-invoice",
    label: "Quản Lý Hoá Đơn",
  },
  {
    href: "/manager/manage-staff",
    label: "Quản lý nhân viên",
  },
];
export const branchEmployeeConfig: NavLinkItemProp[] = [];
