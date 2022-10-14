import { Avatar, NavLink, Text, useMantineTheme } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const UserNavbar = () => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Link href={"/profile"} passHref>
      <NavLink
        component={"a"}
        active={router.pathname.startsWith("/profile")}
        icon={
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
        }
        label={
          <Text size="sm" weight={500}>
            Amy Horsefighter
          </Text>
        }
        description={
          <Text color="dimmed" size="xs">
            ADMIN
          </Text>
        }
        rightSection={<IconChevronRight size={18} />}
        className="hover:bg-base-100"
        sx={{
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colors.dark[0],
        }}
      ></NavLink>
    </Link>
  );
};

export default UserNavbar;
