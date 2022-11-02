import {
  ManagerModel,
  ManagerUpdateEntity,
} from "../../../../model/manager.model";
import { FC, useState } from "react";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { IconCheck, IconSettings, IconX } from "@tabler/icons";
import ViewManagerDialog from "../_view-manager";
import { useMutation } from "@tanstack/react-query";
import { IErrorResponse } from "../../../../interfaces/api.interface";
import { updateUser } from "../../../../services/user.service";
import { showNotification } from "@mantine/notifications";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  managerData: ManagerModel;
};

const ManagerViewModal: FC<ModalProps> = ({ onChanged, managerData }) => {
  const [viewManager, setViewManager] = useState(false);

  const updateMutation = useMutation<
    boolean,
    IErrorResponse,
    ManagerUpdateEntity
  >(["update-manager-password"], (payload) => updateUser(payload), {
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "You have updated the manager!",
        color: "teal",
        icon: <IconCheck />,
      });
      setViewManager(false);
      onChanged && onChanged(true);
    },
    onError: (e) => {
      console.error(e);
      showNotification({
        title: "Failed!",
        message: "Cannot update the manager. Please try again!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

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
          onClosed={async (newData) => {
            if (newData) {
              // update the user.
              debugger;
              await updateMutation.mutateAsync(newData);
              return;
            }
            setViewManager(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ManagerViewModal;
