import { FC, useState } from "react";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import SupplierDetailDialog from "../_supplier-detail.dialog";

type BtnProps = {
  onCreated?: () => void;
};

const SupplierCreateButton: FC<BtnProps> = ({ onCreated }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenDialog(true)} leftIcon={<IconPlus />}>
        Supplier
      </Button>
      <SupplierDetailDialog
        mode={"create"}
        opened={openDialog}
        onClosed={(update) => {
          if (update) {
            console.log(update);
            onCreated && onCreated();
          }
          setOpenDialog(false);
        }}
      />
    </>
  );
};

export default SupplierCreateButton;
