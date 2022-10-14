import { Divider, Navbar, ScrollArea } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { FC } from "react";
import { UserRole } from "../../const/user-role.const";
import ButtonNavbar from "./button.navbar";
import UserNavbar from "./user.navbar";
import MainLinksNavbar from "./main-links.navbar";
import { LinkNavbarProps } from "./link.navbar";

/**
 * TODO: get user from Zustand store.
 * @param props
 * @constructor
 */
const CoreNavbar: FC<{
  userRole: UserRole;
  width?: Partial<Record<string, string | number>> | undefined;
}> = (props) => {
  const linksOfAdmin: LinkNavbarProps[] = [
    { href: "/admin/manage-branches", label: "Quản Lý Chi Nhánh" },
    { href: "/admin/manage-treatment-courses", label: "Quản Lý Liệu Trình" },
    { href: "/admin/manage-services", label: "Quản Lý Dịch Vụ" },
    { href: "/admin/manage-products", label: "Quản Lý Sản Phẩm" },
    { href: "/admin/manage-providers", label: "Quản Lý Nhà Cung Cấp" },
    { href: "/admin/reports", label: "Báo Cáo" },
  ];

  return (
    <Navbar className="bg-base-200 text-white" p="xs" width={props.width}>
      <Navbar.Section mt="xs">
        {/* TODO: User*/}
        <UserNavbar />
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mt="md">
        <MainLinksNavbar links={linksOfAdmin}></MainLinksNavbar>
      </Navbar.Section>
      <Navbar.Section>
        {/*TODO: logout section*/}
        <Divider my={"1rem"}></Divider>
        <ButtonNavbar icon={<IconLogout />} label="Logout"></ButtonNavbar>
      </Navbar.Section>
    </Navbar>
  );
};

export default CoreNavbar;
