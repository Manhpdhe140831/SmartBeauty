import AppointmentColTimeline from "./appointment-col.timeline";
import { Beds } from "../../mock/bed";

const AppointmentTimeline = () => {
  return (
    <div className="flex flex-1">
      {Beds.map((bed, i) => {
        return (
          <AppointmentColTimeline key={i} bedInformation={{ name: bed.name }} />
        );
      })}
    </div>
  );
};

export default AppointmentTimeline;
