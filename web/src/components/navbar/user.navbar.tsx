import { Avatar, NavLink, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthUser } from "../../store/auth-user.state";

const UserNavbar = () => {
  const user = useAuthUser((s) => s.user);
  const theme = useMantineTheme();
  const router = useRouter();

  if (!user) {
    return <></>;
  }

  return (
    <Link href={"/profile"} passHref>
      <NavLink
        component={"a"}
        active={router.pathname.startsWith("/profile")}
        icon={<Avatar src={user.avatar} radius="xl" />}
        label={
          <Tooltip label={user.email}>
            <Text size="sm" weight={500}>
              {user.name}
            </Text>
          </Tooltip>
        }
        description={
          <Text color="dimmed" className={"uppercase"} size="xs">
            {user.role}
          </Text>
        }
        rightSection={<IconChevronRight size={18} />}
        className="hover:!bg-gray-700"
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
