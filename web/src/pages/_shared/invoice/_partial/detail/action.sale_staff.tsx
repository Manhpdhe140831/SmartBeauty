import { InvoiceStatus } from "../../../../../model/invoice.model";
import { Button, Text } from "@mantine/core";

type props = {
  status?: InvoiceStatus | "create";
  onReject?: () => void;
  disable?: boolean;
  loading?: boolean;
};

const SaleStaffInvoiceAction = ({
  status,
  onReject,
  loading,
  disable,
}: props) => {
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
        type={"submit"}
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
        Bạn có thể xác nhận hóa đơn đã được thanh toán. Một khi xác nhận, hành
        động không thể đảo ngược và hóa đơn sẽ không được chỉnh sửa nữa.
      </Text>
      <Button
        disabled={disable}
        loading={loading}
        title={"Hủy hóa đơn"}
        fullWidth
        size={"lg"}
        color={"teal"}
        type={"submit"}
      >
        Xác nhận hóa đơn
      </Button>
    </div>
  );
};

export default SaleStaffInvoiceAction;
