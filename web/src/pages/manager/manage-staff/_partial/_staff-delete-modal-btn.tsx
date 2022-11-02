import { useState } from "react";
import { IconTrash } from "@tabler/icons";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import StaffInfo from "../_view-staff";
import { StaffModel } from "../../../../model/staff.model";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  staffData: StaffModel;
};

const StaffViewModalBtn = ({ onChanged, staffData }: ModalProps) => {
  const [viewBranch, setViewBranch] = useState<boolean>(false);

  return (
    <>
      {/* Button view branch -> trigger modal*/}
      <Tooltip onClick={() => setViewBranch(true)} label={"Delete"}>
        <ActionIcon className="!inline-flex" color="red" variant="filled">
          <IconTrash size={12} />
        </ActionIcon>
      </Tooltip>
      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Staff Delete</h1>
        }
        opened={viewBranch}
        size={"auto"}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          onChanged && onChanged();
          setViewBranch(false);
        }}
      >
        <StaffInfo
          onClose={(e) => {
            //  TODO: handle API call
            console.log(e);
            // close dialog and update to the list screen
            onChanged && onChanged(true);
            setViewBranch(false);
          }}
          staffData={staffData}
        />
      </Modal>
    </>
  );
};

export default StaffViewModalBtn;
