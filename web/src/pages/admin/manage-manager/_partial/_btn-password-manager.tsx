import { ManagerModel } from "../../../../model/manager.model";
import { FC, useState } from "react";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { IconPassword } from "@tabler/icons";
import UpdatePasswordManagerDialog from "./_update-password-manager";

type btnProps = {
  manager: ManagerModel;
  onChanged?: (newUpdate?: boolean) => void;
};

const BtnPasswordManager: FC<btnProps> = ({ manager, onChanged }) => {
  const [updatePassDialog, setUpdatePassDialog] = useState(false);

  return (
    <>
      {/*  Button view Manager -> trigger modal   */}
      <Tooltip
        onClick={() => setUpdatePassDialog(true)}
        label={"Change Password"}
      >
        <ActionIcon className="!inline-flex" color="orange" variant="filled">
          <IconPassword size={12} />
        </ActionIcon>
      </Tooltip>

      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Update Password</h1>
        }
        opened={updatePassDialog}
        size={"auto"}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          onChanged && onChanged();
          setUpdatePassDialog(false);
        }}
      >
        <UpdatePasswordManagerDialog
          manager={manager}
          onClosed={(e) => {
            // TODO: handle new data if having any
            onChanged && onChanged(!!e);
            setUpdatePassDialog(false);
          }}
        />
      </Modal>
    </>
  );
};

export default BtnPasswordManager;
