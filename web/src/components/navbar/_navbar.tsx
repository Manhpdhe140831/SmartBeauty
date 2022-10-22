import { Divider, Navbar, ScrollArea } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { FC } from "react";
import { UserRole } from "../../const/user-role.const";
import ButtonNavbar from "./button.navbar";
import UserNavbar from "./user.navbar";
import MainLinksNavbar from "./main-links.navbar";
import useSidebarNav from "../../store/sidebar-nav.state";

/**
 * TODO: get user from Zustand store.
 * @param props
 * @constructor
 */
const CoreNavbar: FC<{
  userRole: UserRole;
  width?: Partial<Record<string, string | number>> | undefined;
}> = (props) => {
  // depends on the user role, the state here will be updated.
  const links = useSidebarNav((s) => s.config);

  return (
    <Navbar
      sx={(t) => ({
        backgroundColor: t.colors.gray[9],
        color: t.white,
      })}
      p="xs"
      width={props.width}
    >
      <Navbar.Section mt="xs">
        {/* TODO: User*/}
        <UserNavbar />
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mt="md">
        <MainLinksNavbar links={links}></MainLinksNavbar>
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
