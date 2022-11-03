import { Button, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import StaffCreate from "../_create-staff";
// import CreateStaff from "../_create-branch";

type StaffModalProps = {
  onChanged: (updated?: boolean) => void;
};

const StaffCreateModalBtn = ({ onChanged }: StaffModalProps) => {
  const [newStaffModal, setNewStaffModal] = useState<boolean>(false);

  return (
    <>
      {/* Button add new  -> trigger modal*/}
      <Button
        onClick={() => setNewStaffModal(true)}
        color={"green"}
        leftIcon={<IconPlus />}
      >
        New Staff
      </Button>
      <Modal
        title={<h1 className="text-center font-thin capitalize">New Staff</h1>}
        opened={newStaffModal}
        size={"auto"}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          setNewStaffModal(false);
          onChanged();
        }}
      >
        <StaffCreate
          onClose={(e) => {
            //  TODO: handle API call
            console.log(e);
            // close dialog and update to the list screen
            onChanged && onChanged(true);
            setNewStaffModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default StaffCreateModalBtn;
