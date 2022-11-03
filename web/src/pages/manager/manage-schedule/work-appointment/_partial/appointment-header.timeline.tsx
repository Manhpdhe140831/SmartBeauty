import AppointmentSlot from "./appointment-slot";
import { Text } from "@mantine/core";
import { FC } from "react";

type SlotProps = {
  title: string;
  timeFrame: string;
};

const AppointmentHeaderTimeline: FC<SlotProps> = ({ title, timeFrame }) => {
  return (
    <AppointmentSlot className={"flex flex-col items-end"}>
      <Text className={"font-semibold"}>{title}</Text>
      <Text size={"sm"} color={"dimmed"}>
        {timeFrame}
      </Text>
    </AppointmentSlot>
  );
};

export default AppointmentHeaderTimeline;
