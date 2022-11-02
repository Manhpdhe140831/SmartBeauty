import { FC, useState } from "react";
import { Button } from "@mantine/core";
import { IconCheck, IconPlus, IconX } from "@tabler/icons";
import SupplierDetailDialog from "../_supplier-detail.dialog";
import { useMutation } from "@tanstack/react-query";
import { SupplierCreateEntity } from "../../../../model/supplier.model";
import { createSupplier } from "../../../../services/supplier.service";
import { showNotification } from "@mantine/notifications";
import { IErrorResponse } from "../../../../interfaces/api.interface";

type BtnProps = {
  onCreated?: () => void;
};

const SupplierCreateButton: FC<BtnProps> = ({ onCreated }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const createMutation = useMutation<
    boolean,
    IErrorResponse,
    SupplierCreateEntity
  >(["create-supplier"], (data: SupplierCreateEntity) => createSupplier(data), {
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "You have created a new supplier!",
        color: "teal",
        icon: <IconCheck />,
      });
      setOpenDialog(false);
      onCreated && onCreated();
    },
    onError: (e) => {
      console.error(e);
      showNotification({
        title: "Failed!",
        message: "Cannot create new supplier. Please try again!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  return (
    <>
      <Button onClick={() => setOpenDialog(true)} leftIcon={<IconPlus />}>
        Supplier
      </Button>
      <SupplierDetailDialog
        mode={"create"}
        opened={openDialog}
        onClosed={async (update) => {
          if (update) {
            console.log(update);
            await createMutation.mutateAsync(update);
            return;
          }
          setOpenDialog(false);
        }}
      />
    </>
  );
};

export default SupplierCreateButton;
