import { Button, Text } from "@mantine/core";
import CalendarController from "./_partial/calendar-controller";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AppointmentTimeline from "../../../components/appointment-timeline/appointment.timeline";
import { slotWorkConst } from "../../../const/slot-work.const";
import AppointmentHeaderTimeline from "../../../components/appointment-timeline/appointment-header.timeline";
import mockSchedule from "../../../mock/schedule";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../const/user-role.const";

type workAppointmentProps = {
  userRole: USER_ROLE;
};

/**
 * Manager xem được tất cả lịch
 * sale_staff: được create và khi mà status là khác chưa đến thì có thể edit lịch
 * technical_staff: read-only lịch của bản thân
 */

const WorkAppointment: AppPageInterface<workAppointmentProps> = ({
  userRole,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: allSchedule } = useQuery(
    ["list-schedule", selectedDate],
    async () => {
      console.log(selectedDate);
      // todo: Tìm kiếm API theo ngày
      const schedule = await mockSchedule();
      return schedule;
    }
  );

  const router = useRouter();

  const goToBooking = () => {
    void router.push({
      pathname: "/manager/manage-schedule/work-appointment/manage-booking",
    });
  };

  return (
    <div className={"flex h-full flex-col space-y-4"}>
      {/*<Divider my={8} mx={8} />*/}
      <div className="flex-1 pl-4">
        <div className="flex h-24 flex-row items-center justify-between border-b">
          {userRole === USER_ROLE.sale_staff && (
            <Button onClick={goToBooking}>Create</Button>
          )}
          <CalendarController
            dateData={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
        <div className="flex flex-col">
          <div className={"flex w-full flex-row"}>
            <div className="h-16 min-w-32 max-w-32 select-none border-x p-4 font-semibold">
              <Text className={"uppercase"}>Bed Number</Text>
            </div>
            <AppointmentTimeline />
          </div>
          {slotWorkConst &&
            Object.keys(slotWorkConst).map((slot: any, i) => {
              return (
                <AppointmentHeaderTimeline
                  key={slotWorkConst[slot].name}
                  title={slotWorkConst[slot].name}
                  timeFrame={slotWorkConst[slot].timeline}
                  bedSchedule={allSchedule?.find(
                    (s) => s.booking === slotWorkConst[slot].name
                  )}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WorkAppointment;
