import { ManagerModel } from "../../../../model/manager.model";
import { FC, useState } from "react";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import ViewManagerDialog from "../_view-manager";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  managerData: ManagerModel;
};

const ManagerViewModal: FC<ModalProps> = ({ onChanged, managerData }) => {
  const [viewManager, setViewManager] = useState(false);

  return (
    <>
      {/*  Button view Manager -> trigger modal   */}
      <Tooltip onClick={() => setViewManager(true)} label={"View / Edit"}>
        <ActionIcon className="!inline-flex" color="orange" variant="filled">
          <IconSettings size={12} />
        </ActionIcon>
      </Tooltip>
      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Manager Detail</h1>
        }
        opened={viewManager}
        size={"auto"}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          onChanged && onChanged();
          setViewManager(false);
        }}
      >
        <ViewManagerDialog
          manager={managerData}
          onClosed={(newData) => {
            // TODO: handle new data if having any
            onChanged && onChanged(!!newData);
            setViewManager(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ManagerViewModal;
