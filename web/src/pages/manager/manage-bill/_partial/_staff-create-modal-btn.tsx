import { Button, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
// import CreateStaff from "../_create-branch";

type BranchModalProps = {
  onChanged: (updated?: boolean) => void;
};

const BranchCreateModalBtn = ({ onChanged }: BranchModalProps) => {
  const [newBranchModal, setNewBranchModal] = useState<boolean>(false);

  return (
    <>
      {/* Button add new branch -> trigger modal*/}
      <Button
        onClick={() => setNewBranchModal(true)}
        color={"green"}
        leftIcon={<IconPlus />}
      >
        New Staff
      </Button>
      <Modal
        title={<h1 className="text-center font-thin capitalize">New Bill</h1>}
        opened={newBranchModal}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          setNewBranchModal(false);
          onChanged();
        }}
      >
        {/* <CreateBranch
          onSave={async (e) => {
            //  TODO: handle API call
            console.log(e);
            // close dialog and update to the list screen
            onChanged(true);
            setNewBranchModal(false);
          }}
        /> */}
      </Modal>
    </>
  );
};

export default BranchCreateModalBtn;
