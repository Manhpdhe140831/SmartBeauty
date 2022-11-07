import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { Button, Divider, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import CalendarController from "./_partial/calendar-controller";
import AppointmentTimeline from "../../../../components/appointment-timeline/appointment.timeline";
import AppointmentHeaderTimeline from "../../../../components/appointment-timeline/appointment-header.timeline";
import { slotWorkConst } from "../../../../const/slot-work.const";
import { useQuery } from "@tanstack/react-query";
import mockSchedule from "../../../../mock/schedule";

const ManageAppointmentSchedule: AppPageInterface = () => {
  const { data: allSchedule} = useQuery(
    ["list-schedule"],
    async () => {
      const schedule = await mockSchedule();
      return schedule
    }
  );
  return (
    <div className={"flex h-full flex-col space-y-4"}>
      <div className="flex justify-end space-x-2 px-4 pt-4">
        <Button color={"peal"} leftIcon={<IconPlus />}>
          Bed
        </Button>
      </div>

      <Divider my={8} mx={8} />

      <div className="flex-1">
        <div className="flex flex-row h-24 border-b">
          <div className="w-32 h-24"></div>
          <CalendarController />
        </div>
        <div className="flex flex-col w-full">
          <div className={"flex w-full flex-row"}>
            <div className="min-w-32 max-w-32 select-none font-semibold border-x p-4 h-16">
              <Text className={"uppercase"}>Bed Number</Text>
            </div>
            <AppointmentTimeline />
          </div>
          <AppointmentHeaderTimeline
            title={"Slot 1"}
            timeFrame={slotWorkConst.slot_1.timeline}
            bedSchedule={allSchedule?.find(s => s.booking === slotWorkConst.slot_1.name)}
          />
          <AppointmentHeaderTimeline
            title={"Slot 2"}
            timeFrame={slotWorkConst.slot_2.timeline}
            bedSchedule={allSchedule?.find(s => s.booking === slotWorkConst.slot_2.name)}
          />
          <AppointmentHeaderTimeline
            title={"Slot 3"}
            timeFrame={slotWorkConst.slot_3.timeline}
            bedSchedule={allSchedule?.find(s => s.booking === slotWorkConst.slot_3.name)}
          />
          <AppointmentHeaderTimeline
            title={"Slot 4"}
            timeFrame={slotWorkConst.slot_4.timeline}
            bedSchedule={allSchedule?.find(s => s.booking === slotWorkConst.slot_4.name)}
          />
          <AppointmentHeaderTimeline
            title={"Slot 5"}
            timeFrame={slotWorkConst.slot_5.timeline}
            bedSchedule={allSchedule?.find(s => s.booking === slotWorkConst.slot_5.name)}
          />
        </div>
      </div>
    </div>
  );
};

ManageAppointmentSchedule.routerName = "Manage Appointment";

export default ManageAppointmentSchedule;
