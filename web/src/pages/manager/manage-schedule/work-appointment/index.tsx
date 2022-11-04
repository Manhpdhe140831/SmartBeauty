import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { Button, Divider, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import CalendarController from "./_partial/calendar-controller";
import AppointmentTimeline from "../../../../components/appointment-timeline/appointment.timeline";
import AppointmentHeaderTimeline from "../../../../components/appointment-timeline/appointment-header.timeline";

const ManageAppointmentSchedule: AppPageInterface = () => {
  return (
    <div className={"flex h-full flex-col space-y-4"}>
      <div className="flex justify-end space-x-2 px-4 pt-4">
        <Button color={"peal"} leftIcon={<IconPlus />}>
          Bed
        </Button>
      </div>

      <Divider my={8} mx={8} />

      <div className="flex-1">
        <div className="flex h-full w-full">
          <div className={"flex w-32 flex-col px-4"}>
            <div className="h-24 border-b"></div>
            <div className="flex flex-1 flex-col divide-y">
              <div className="flex h-16 select-none items-center justify-end text-right font-semibold">
                <Text className={"uppercase"}>Bed Number</Text>
              </div>
              <AppointmentHeaderTimeline
                title={"Slot 1"}
                timeFrame={"09:00 - 10:30"}
              />
              <AppointmentHeaderTimeline
                title={"Slot 2"}
                timeFrame={"10:30 - 12:00"}
              />
              <AppointmentHeaderTimeline
                title={"Slot 3"}
                timeFrame={"13:30 - 15:00"}
              />
              <AppointmentHeaderTimeline
                title={"Slot 4"}
                timeFrame={"15:00 - 16:30"}
              />
            </div>
          </div>
          <div className={"flex flex-1 flex-col"}>
            <div className="flex h-24 flex-col border-b">
              <CalendarController />
            </div>

            <AppointmentTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

ManageAppointmentSchedule.routerName = "Manage Appointment";

export default ManageAppointmentSchedule;
