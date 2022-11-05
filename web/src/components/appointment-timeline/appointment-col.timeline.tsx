import { Text } from "@mantine/core";
import AppointmentSlot from "./appointment-slot";
import { ScheduleModel } from "../../model/schedule.model";
import { slotWorkConst } from "../../const/slot-work.const";

type AppointmentBedProps = {
  bedInformation: {
    name: string;
  };
  bedSchedule?: ScheduleModel;
};

const AppointmentColTimeline = ({ bedInformation, bedSchedule }: AppointmentBedProps) => {
  return (
    <div className="flex h-full w-64 shrink-0 flex-col divide-y">
      <div className="flex h-16 items-center justify-center bg-gray-100 font-semibold">
        <Text>{bedInformation.name}</Text>
      </div>

      {
        Object.keys(slotWorkConst).map(key => {
          bedSchedule?.schedule.forEach(schedule => {
            if (schedule.booking === key) {
              return (<AppointmentSlot>
                <div className={"w-full h-full bg-black"}></div>
              </AppointmentSlot>)
            } else {
              return (<AppointmentSlot></AppointmentSlot>)
            }
          })
        })
      }
    </div>
  );
};

export default AppointmentColTimeline;
