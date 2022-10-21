import { useState } from "react";
import { IconSettings } from "@tabler/icons";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import BranchInfo from "../_view-branch";

type ModalProps<T> = {
  onChanged?: (updated?: boolean) => void;
  branchData?: T;
};

const BranchViewModal = <T,>({ onChanged, branchData }: ModalProps<T>) => {
  const [viewBranch, setViewBranch] = useState<boolean>(false);

  return (
    <>
      {/* Button view branch -> trigger modal*/}
      <Tooltip
        onClick={() => setViewBranch((s) => !s)}
        label={"Chỉnh sửa / Xem chi tiết"}
      >
        <ActionIcon className="!inline-flex" color="orange" variant="filled">
          <IconSettings size={12} />
        </ActionIcon>
      </Tooltip>
      <Modal
        title={<h1 className="text-center font-thin capitalize">Chi tiết</h1>}
        opened={viewBranch}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          onChanged && onChanged();
          setViewBranch(false);
        }}
      >
        <BranchInfo
          onSave={(e) => {
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

export default BranchViewModal;
