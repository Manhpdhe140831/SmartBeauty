import {
  Avatar,
  Group,
  MantineColor,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { forwardRef } from "react";

export interface CustomSelectItemProps extends SelectItemProps {
  color?: MantineColor;
  description?: string;
  image?: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, CustomSelectItemProps>(
  ({ description, label, image, ...others }: CustomSelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

AutoCompleteItem.displayName = "AutoCompleteItem";

export default AutoCompleteItem;
