import AppointmentColTimeline from "./appointment-col.timeline";

const AppointmentTimeline = () => {
  return (
    <div className="relative flex h-[598px]">
      <div className="absolute inset-0 flex w-full flex-nowrap divide-x overflow-x-auto border">
        <AppointmentColTimeline bedInformation={{ name: "Bed 1" }} />
        <AppointmentColTimeline bedInformation={{ name: "Bed 2" }} />
        <AppointmentColTimeline bedInformation={{ name: "Bed 3" }} />
        <AppointmentColTimeline bedInformation={{ name: "Bed 4" }} />
      </div>
    </div>
  );
};

export default AppointmentTimeline;
