import { FC, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import CreateManager from "../_create-manager";

type BtnCreateManagerProps = {
  onChanged: (updated?: boolean) => void;
};

const BtnCreateManager: FC<BtnCreateManagerProps> = ({ onChanged }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button leftIcon={<IconPlus />} onClick={() => setDialogOpen(true)}>
        Tạo Tài Khoản
      </Button>

      <Modal
        opened={dialogOpen}
        onClose={() => {
          onChanged();
          setDialogOpen(false);
        }}
        title={
          <h1 className="text-center font-thin capitalize">Tạo tài khoản</h1>
        }
      >
        <CreateManager
          onSave={(manager) => {
            // TODO: handle the new manager
            console.log(manager);
            onChanged(!!manager);
            setDialogOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default BtnCreateManager;
