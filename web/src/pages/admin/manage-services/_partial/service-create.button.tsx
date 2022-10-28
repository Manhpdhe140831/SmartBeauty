import { FC, useState } from "react";
import { IconPlus } from "@tabler/icons";
import { Button } from "@mantine/core";

type BtnProps = {
  onCreated?: () => void;
};

const ServiceCreateButton: FC<BtnProps> = ({ onCreated }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenDialog(true)} leftIcon={<IconPlus />}>
        Product
      </Button>
    </>
  );
};

export default ServiceCreateButton;
