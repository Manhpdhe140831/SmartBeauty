import { Text } from "@mantine/core";
import AppointmentSlot from "./appointment-slot";

type AppointmentBedProps = {
  bedInformation: {
    name: string;
  };
};

const AppointmentColTimeline = ({ bedInformation }: AppointmentBedProps) => {
  return (
    <div className="flex h-full w-64 shrink-0 flex-col divide-y">
      <div className="flex h-16 items-center justify-center bg-gray-100 font-semibold">
        <Text>{bedInformation.name}</Text>
      </div>

      <AppointmentSlot></AppointmentSlot>
      <AppointmentSlot></AppointmentSlot>
      <AppointmentSlot></AppointmentSlot>
      <AppointmentSlot></AppointmentSlot>
    </div>
  );
};

export default AppointmentColTimeline;
