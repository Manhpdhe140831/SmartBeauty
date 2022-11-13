import AppointmentSlot from "./appointment-slot";
import { FC } from "react";
import { Text } from "@mantine/core";
import { BookingModel, ScheduleModel } from "../../model/schedule.model";
import { Beds } from "../../mock/bed";
import { mapStatusHelper } from "../../utilities/map-status.helper";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../const/user-role.const";

type SlotProps = {
  title: string;
  timeFrame: string;
  bedSchedule?: BookingModel;
  userRole: string;
};

const AppointmentHeaderTimeline: FC<SlotProps> = ({
  title,
  timeFrame,
  bedSchedule,
  userRole,
}) => {
  const router = useRouter();
  const moreInfo = (data: ScheduleModel) => {
    void router.push({
      pathname: "/manager/manage-schedule/work-appointment/manage-booking",
      query: {
        scheduleId: data.id,
      },
    });
  };

  return (
    <div className={"flex h-max"}>
      <AppointmentSlot
        className={"flex min-w-32 select-none flex-col justify-center"}
      >
        <Text className={"font-semibold"}>{title}</Text>
        <Text size={"sm"} color={"dimmed"}>
          {timeFrame}
        </Text>
      </AppointmentSlot>

      {Beds.map((bed, i) => {
        const appointed = bedSchedule?.schedule.find(
          (s) => s.bedInfo?.id === bed.id
        );
        if (appointed) {
          return (
            <AppointmentSlot key={i} className={"min-w-64"}>
              <div
                className={
                  "h-max w-full cursor-pointer rounded-lg bg-yellow-300 p-2 text-sm shadow transition hover:shadow-xl"
                }
                onClick={() => moreInfo(appointed)}
              >
                <div className={"flex justify-between pb-1"}>
                  <span>Tên khách hàng</span>
                  <span>{appointed.customerInfo?.name}</span>
                </div>
                <div className={"flex justify-between pb-1"}>
                  <span>NV kỹ thuật</span>
                  <span>{appointed.techStaffInfo?.name}</span>
                </div>
                {userRole === USER_ROLE.manager && (
                  <div className={"flex justify-between pb-1"}>
                    <span>NV bán hàng</span>
                    <span>{appointed.saleStaffInfo?.name}</span>
                  </div>
                )}
                <div className={"flex justify-between pb-1"}>
                  <span>Dịch vụ</span>
                  <span>{appointed.services}</span>
                </div>
                <div className={"flex justify-between"}>
                  <span>Tình trạng</span>
                  <span className={mapStatusHelper(appointed.status).color}>
                    {mapStatusHelper(appointed.status).status}
                  </span>
                </div>
              </div>
            </AppointmentSlot>
          );
        }
        return (
          <AppointmentSlot key={i} className={"min-w-64"}></AppointmentSlot>
        );
      })}
    </div>
  );
};

export default AppointmentHeaderTimeline;
