import { Button, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
// import CreateStaff from "../_create-branch";

type BillModalProps = {
  onChanged: (updated?: boolean) => void;
};

const BillCreateModalBtn = ({ onChanged }: BillModalProps) => {
  const [newBillModal, setNewBillModal] = useState<boolean>(false);

  return (
    <>
      {/* Button add new branch -> trigger modal*/}
      <Button
        onClick={() => setNewBillModal(true)}
        color={"green"}
        leftIcon={<IconPlus />}
      >
        New Bill
      </Button>
      <Modal
        title={<h1 className="text-center font-thin capitalize">New Bill</h1>}
        opened={newBillModal}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          setNewBillModal(false);
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

export default BillCreateModalBtn;
