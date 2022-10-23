import { useState } from "react";
import { IconSettings } from "@tabler/icons";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import BranchInfo from "../_view-branch";
import { BranchModel } from "../../../../model/branch.model";
import { ManagerModel } from "../../../../model/manager.model";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  branchData: BranchModel<ManagerModel>;
};

const BranchViewModalBtn = ({ onChanged, branchData }: ModalProps) => {
  const [viewBranch, setViewBranch] = useState<boolean>(false);

  return (
    <>
      {/* Button view branch -> trigger modal*/}
      <Tooltip onClick={() => setViewBranch(true)} label={"View / Edit"}>
        <ActionIcon className="!inline-flex" color="orange" variant="filled">
          <IconSettings size={12} />
        </ActionIcon>
      </Tooltip>
      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Branch Detail</h1>
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
        <BranchInfo
          onClose={(e) => {
            //  TODO: handle API call
            console.log(e);
            // close dialog and update to the list screen
            onChanged && onChanged(true);
            setViewBranch(false);
          }}
          branchData={branchData}
        />
      </Modal>
    </>
  );
};

export default BranchViewModalBtn;
