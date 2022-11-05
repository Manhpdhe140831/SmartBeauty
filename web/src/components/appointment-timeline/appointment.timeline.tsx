import AppointmentColTimeline from "./appointment-col.timeline";
import { useQuery } from "@tanstack/react-query";
import mockSchedule from "../../mock/schedule";

const AppointmentTimeline = () => {
  // query to get the list of the manager
  const { data: allSchedule} = useQuery(
    ["list-schedule"],
    async () => {
      const schedule = await mockSchedule();
      return schedule
    }
  );

  return (
    <div className="relative flex h-[598px]">
      <div className="absolute inset-0 flex w-full flex-nowrap divide-x overflow-x-auto border">
        <AppointmentColTimeline bedInformation={{ name: "Bed 1" }}
                                bedSchedule={allSchedule?.find(schedule =>
                                  schedule.bed_name === "Bed 1")}
        />
        <AppointmentColTimeline bedInformation={{ name: "Bed 2" }}
                                bedSchedule={allSchedule?.find(schedule =>
                                  schedule.bed_name === "Bed 2")}
        />
        <AppointmentColTimeline bedInformation={{ name: "Bed 3" }}
                                bedSchedule={allSchedule?.find(schedule =>
                                  schedule.bed_name === "Bed 3")}
        />
        <AppointmentColTimeline bedInformation={{ name: "Bed 4" }}
                                bedSchedule={allSchedule?.find(schedule =>
                                  schedule.bed_name === "Bed 4")}
        />
      </div>
    </div>
  );
};

export default AppointmentTimeline;
