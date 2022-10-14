import { NavLink, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

export type LinkNavbarProps = {
  href: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  rightSection?: React.ReactNode;
  children?: React.ReactNode;
};

const LinkNavbar: FC<LinkNavbarProps> = ({
  href,
  label,
  rightSection,
  description,
  icon,
  children,
}) => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <NavLink
        component={"a"}
        color={"black"}
        active={router.pathname.startsWith(href)}
        icon={icon}
        label={label}
        description={description}
        rightSection={rightSection}
        className="hover:bg-base-100"
        sx={{
          fontWeight: 600,
          padding: theme.spacing.md,
          borderRadius: theme.radius.sm,
          color: theme.colors.dark[0],
        }}
      >
        {children}
      </NavLink>
    </Link>
  );
};

export default LinkNavbar;
