import { Text } from "@mantine/core";

type AppointmentBedProps = {
  bedInformation: {
    name: string;
  };
};

const AppointmentColTimeline = ({ bedInformation }: AppointmentBedProps) => {
  return (
    <div className="flex flex-col h-full w-64">
      <div className="flex h-16 items-center justify-center bg-gray-100 font-semibold border-x">
        <Text>{bedInformation.name}</Text>
      </div>
    </div>
  );
};

export default AppointmentColTimeline;
