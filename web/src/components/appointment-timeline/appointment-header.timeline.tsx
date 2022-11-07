import AppointmentSlot from "./appointment-slot";
import { FC, useState } from "react";
import { Button, Modal, Text } from "@mantine/core";
import { BookingModel, ScheduleModel } from "../../model/schedule.model";
import { Beds } from "../../mock/bed";
import { mapStatusHelper } from "../../utilities/map-status.helper";
import { router } from "next/client";

type SlotProps = {
  title: string;
  timeFrame: string;
  bedSchedule?: BookingModel;
};

const AppointmentHeaderTimeline: FC<SlotProps> = ({ title, timeFrame, bedSchedule }) => {
  // const [opened, setOpened] = useState(false);
  // const [scheduleSelected, setScheduleSelected] = useState<ScheduleModel | null>(null);

  const moreInfo = (data: ScheduleModel) => {
    // setScheduleSelected(data);
    // setOpened(true);
    void router.push({
      pathname: '/manager/manage-schedule/work-appointment/booking-info',
      query: {
        scheduleId: data.id
      }
    })
  };

  return (
    <div className={"flex h-max"}>
      <AppointmentSlot className={"flex min-w-32 select-none flex-col justify-center"}>
        <Text className={"font-semibold"}>{title}</Text>
        <Text size={"sm"} color={"dimmed"}>
          {timeFrame}
        </Text>
      </AppointmentSlot>

      {
        Beds.map((bed, i) => {
          const appointed = bedSchedule?.schedule.find(s => s.bed_name === bed.name);
          if (appointed) {
            return <AppointmentSlot key={i} className={"min-w-64"}>
              <div className={"w-full h-max border-2 rounded-lg p-2 text-sm cursor-pointer"}
                   style={{ background: "#FA86BE" }}>
                <div className={"flex justify-between pb-1"}>
                  <span>Customer name</span>
                  <span>{appointed.customer_name}</span>
                </div>
                <div className={"flex justify-between pb-1"}>
                  <span>Sale technical</span>
                  <span>{appointed.technical_name}</span>
                </div>
                <div className={"flex justify-between pb-1"}>
                  <span>Service</span>
                  <span>{appointed.services}</span>
                </div>
                <div className={"flex justify-between pb-2"}>
                  <span>Status</span>
                  <span
                    className={mapStatusHelper(appointed.status).color}>{mapStatusHelper(appointed.status).status}</span>
                </div>
                <Button fullWidth compact color="gray" onClick={() => moreInfo(appointed)}>
                  More info
                </Button>
              </div>
            </AppointmentSlot>;
          }
          return <AppointmentSlot key={i} className={"min-w-64"}></AppointmentSlot>;
        })
      }

      {/*<Modal opened={opened}*/}
      {/*       onClose={() => {*/}
      {/*         setScheduleSelected(null);*/}
      {/*         setOpened(false);*/}
      {/*       }}*/}
      {/*       size="xl"*/}
      {/*       transition="fade"*/}
      {/*       transitionDuration={600}*/}
      {/*       transitionTimingFunction="ease"*/}
      {/*       title="Booking info">*/}
      {/*  <BookingInfo data={scheduleSelected} />*/}
      {/*</Modal>*/}
    </div>
  );
};

export default AppointmentHeaderTimeline;
