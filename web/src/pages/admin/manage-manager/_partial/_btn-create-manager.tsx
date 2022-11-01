import { FC, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import CreateManager from "../_create-manager";
import { useMutation } from "@tanstack/react-query";
import { ManagerCreateEntity } from "../../../../model/manager.model";
import { IErrorResponse } from "../../../../interfaces/api.interface";
import { createUserJson } from "../../../../services/user.service";

type BtnCreateManagerProps = {
  onChanged: (updated?: boolean) => void;
};

const BtnCreateManager: FC<BtnCreateManagerProps> = ({ onChanged }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const createMutation = useMutation<
    boolean,
    IErrorResponse,
    ManagerCreateEntity
  >(
    (v: ManagerCreateEntity) => createUserJson<ManagerCreateEntity, boolean>(v),
    {
      onSuccess: (result) => {
        if (result) {
          setDialogOpen(false);
          return onChanged(true);
        }
        onChanged(false);
      },
      onError: (error) => {
        console.warn(error);
        // TODO better error system
        alert(error.message);
        debugger;
      },
    }
  );

  return (
    <>
      <Button
        leftIcon={<IconPlus />}
        color={"green"}
        onClick={() => setDialogOpen(true)}
      >
        New Account
      </Button>

      <Modal
        opened={dialogOpen}
        onClose={() => {
          onChanged();
          setDialogOpen(false);
        }}
        title={
          <h1 className="text-center font-thin capitalize">New Account</h1>
        }
        closeOnClickOutside={false}
      >
        <CreateManager
          onClosed={async (manager) => {
            if (manager) {
              // action and event will be handled by mutation process.
              await createMutation.mutate(manager);
              return;
            }
            // when user press cancel.
            onChanged(false);
            setDialogOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default BtnCreateManager;
