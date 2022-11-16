import { InvoiceStatus } from "../../../../../model/invoice.model";
import { Button, Text } from "@mantine/core";
import { useState } from "react";
import DiscardInvoiceModal from "./_discard-invoice.modal";

type props = {
  status?: InvoiceStatus | "create";
  onConfirm?: () => void;
  onReject?: () => void;
  disable?: boolean;
  loading?: boolean;
};

const SaleStaffInvoiceAction = ({
  status,
  onReject,
  onConfirm,
  loading,
  disable,
}: props) => {
  const [opened, setOpened] = useState(false);

  if (!status) {
    return <></>;
  }
  if (status === "discarded" || status === "approved") {
    return (
      <Text size={"xs"} color={"dimmed"}>
        Trạng thái của hóa đơn không thể thay đổi.
      </Text>
    );
  }

  if (status === "create") {
    return (
      <Button
        loading={loading}
        disabled={disable}
        title={"Xác nhận hóa đơn"}
        onClick={onConfirm}
        size={"lg"}
        fullWidth
      >
        Xuất Hóa Đơn
      </Button>
    );
  }

  return (
    <div className={"flex flex-col space-y-2"}>
      <Text className={"select-none text-justify"} color={"dimmed"} size={"xs"}>
        Bạn có thể hủy hóa đơn này nếu có sai sót. Một khi hủy, hành động không
        thể đảo ngược.
      </Text>
      <Button
        disabled={disable}
        loading={loading}
        title={"Hủy hóa đơn"}
        onClick={() => setOpened(true)}
        fullWidth
        size={"lg"}
        color={"red"}
      >
        Hủy Hóa Đơn
      </Button>

      <DiscardInvoiceModal
        opened={opened}
        setOpened={setOpened}
        loading={loading}
        onReject={onReject}
      />
    </div>
  );
};

export default SaleStaffInvoiceAction;
