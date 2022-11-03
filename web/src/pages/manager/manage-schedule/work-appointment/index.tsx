import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { Button, Divider } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

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
          <div className={"flex flex-col bg-gray-200 px-4"}>
            <div className="h-40"></div>
            <div className="flex flex-1 flex-col">
              <div className="flex-1">Slot 1</div>
              <div className="flex-1">Slot 2</div>
              <div className="flex-1">Slot 3</div>
              <div className="flex-1">Slot 4</div>
            </div>
          </div>
          <div className={"flex flex-1 flex-col"}>
            <div className="h-40">controller</div>

            <div className="overflow-x flex flex-1">context</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ManageAppointmentSchedule.routerName = "Manage Appointment";

export default ManageAppointmentSchedule;
