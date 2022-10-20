import { Button, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import CreateBranch from "./_create-branch";
import { useState } from "react";

type BranchModalProps = {
  onChanged?: () => void;
};

const BranchModalBtn = ({ onChanged }: BranchModalProps) => {
  const [newBranchModal, setNewBranchModal] = useState<boolean>(false);

  return (
    <>
      {/* Button add new branch -> trigger modal*/}
      <Button
        onClick={() => setNewBranchModal((s) => !s)}
        leftIcon={<IconPlus />}
      >
        Tạo Chi Nhánh Mới
      </Button>
      <Modal
        opened={newBranchModal}
        onClose={() => {
          console.log("closed");
          setNewBranchModal(false);
          onChanged && onChanged();
        }}
      >
        <CreateBranch
          onSave={(branchData) => {
            console.log(branchData);
          }}
        />
      </Modal>
    </>
  );
};

export default BranchModalBtn;
