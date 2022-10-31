import { Button, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import CreateBranch from "../_create-branch";
import { BranchCreateEntity } from "../../../../model/branch.model";
import { useMutation } from "@tanstack/react-query";
import { createBranchJson } from "../../../../services/branch.service";
import { IErrorResponse } from "../../../../interfaces/api.interface";

type BranchModalProps = {
  onChanged: (updated?: boolean) => void;
};

const BranchCreateModalBtn = ({ onChanged }: BranchModalProps) => {
  const [newBranchModal, setNewBranchModal] = useState<boolean>(false);

  const branchMutation = useMutation<
    boolean,
    IErrorResponse,
    BranchCreateEntity
  >(["branch-mutation"], (entity) => createBranchJson(entity), {
    onSuccess: () => {
      onChanged(true);
      setNewBranchModal(false);
    },
    onError: () => {
      onChanged(false);
      setNewBranchModal(false);
    },
  });

  return (
    <>
      {/* Button add new branch -> trigger modal*/}
      <Button
        onClick={() => setNewBranchModal(true)}
        color={"green"}
        leftIcon={<IconPlus />}
      >
        New Branch
      </Button>
      <Modal
        title={<h1 className="text-center font-thin capitalize">New Branch</h1>}
        opened={newBranchModal}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          setNewBranchModal(false);
          onChanged();
        }}
      >
        <CreateBranch
          onSave={(e) => {
            if (e) {
              return branchMutation.mutate(e);
            }
            // close dialog and update to the list screen
            onChanged(false);
            setNewBranchModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default BranchCreateModalBtn;
