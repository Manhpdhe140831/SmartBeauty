import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import WorkAppointment from "../../../_shared/work-appointment/index";
import { USER_ROLE } from "../../../../const/user-role.const";

const ManageAppointmentSchedule: AppPageInterface = () => {
  // const userRole = useAuthUser((s) => s.user?.role);
  const userRole = USER_ROLE.sale_staff;

  return <WorkAppointment userRole={userRole!} />;
};

ManageAppointmentSchedule.routerName = "Manage Appointment";

export default ManageAppointmentSchedule;
