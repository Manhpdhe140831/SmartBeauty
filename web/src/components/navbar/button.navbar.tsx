import { Group, Text, UnstyledButton } from "@mantine/core";
import React, { FC } from "react";

interface MainLinkProps {
  icon?: React.ReactNode;
  label: string;
}

const ButtonNavbar: FC<MainLinkProps> = ({ icon, label }) => {
  return (
    <UnstyledButton
      className="!text-white hover:!bg-gray-700"
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
      })}
    >
      <Group>
        {icon ? icon : <></>}
        <Text className="font-semibold" size="sm">
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

export default ButtonNavbar;
