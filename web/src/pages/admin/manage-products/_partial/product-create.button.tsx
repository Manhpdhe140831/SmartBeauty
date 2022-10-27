import { IconPlus } from "@tabler/icons";
import { Button } from "@mantine/core";
import { FC, useState } from "react";
import ProductDetailDialog from "../_product-detail-dialog";

type btnProps = {
  onCreated?: () => void;
};

const ProductCreateButton: FC<btnProps> = ({ onCreated }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenDialog(true)} leftIcon={<IconPlus />}>
        Product
      </Button>
      <ProductDetailDialog
        mode={"create"}
        opened={openDialog}
        onClosed={(update) => {
          if (update) {
            onCreated && onCreated();
          }
          setOpenDialog(false);
        }}
      />
    </>
  );
};

export default ProductCreateButton;
