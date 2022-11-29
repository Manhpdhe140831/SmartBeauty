import { InvoiceStatus } from "../../../../../model/invoice.model";
import { FC, useState } from "react";
import { ActionIcon, Button, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import DiscardInvoiceModal from "./_discard-invoice.modal";

type props = {
  status?: InvoiceStatus;
  onConfirm?: () => void;
  onReject?: () => void;
  disable?: boolean;
  loading?: boolean;
};

const ManagerInvoiceAction: FC<props> = ({
  status,
  onReject,
  disable,
  onConfirm,
  loading,
}) => {
  const [opened, setOpened] = useState(false);

  if (status) {
    return <></>;
  }

  return (
    <div className={"flex flex-col space-y-2"}>
      <Text className={"select-none text-justify"} color={"dimmed"} size={"xs"}>
        Bạn có thể xác nhận hóa đơn này đã được thanh toán, hoặc chọn hủy bỏ hóa
        đơn.
      </Text>
      <div className={"flex space-x-2"}>
        <ActionIcon
          disabled={disable}
          loading={loading}
          title={"Hủy hóa đơn"}
          color={"red"}
          variant={"filled"}
          size={50}
          onClick={() => setOpened(true)}
        >
          <IconX size={16} />
        </ActionIcon>

        <Button
          disabled={disable}
          loading={loading}
          title={"Xác nhận đã thanh toán"}
          onClick={onConfirm}
          className={"flex-1"}
          size={"lg"}
        >
          Xác Nhận
        </Button>
      </div>

      <DiscardInvoiceModal
        opened={opened}
        setOpened={setOpened}
        loading={loading}
        onReject={onReject}
      />
    </div>
  );
};

export default ManagerInvoiceAction;
