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
  { href: "/admin/manage-services", label: "Manage Services" },
  {
    href: "/admin/manage-treatment-courses",
    label: "Treatment Courses",
  },
  { href: "/admin/reports", label: "Báo Cáo" },
];

export const branchManagerConfig: NavLinkItemProp[] = [
  {
    label: "Manage Customer",
    href: "/manager/manage-customer",
  },
  {
    label: "Manage Schedule",
    nested: [
      {
        href: "/manager/manage-schedule/work-appointment",
        label: "Work Appointment",
      },
    ],
  },
  {
    href: "/manager/manage-invoice",
    label: "Manage Invoice",
  },
  {
    href: "/manager/manage-staff",
    label: "Quản lý nhân viên",
  },
];
export const branchEmployeeConfig: NavLinkItemProp[] = [];
