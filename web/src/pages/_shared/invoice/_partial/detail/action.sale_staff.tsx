import { InvoiceStatus } from "../../../../../model/invoice.model";
import { Button, Text } from "@mantine/core";
import TimeInvoiceInformation from "./time-invoice-information";

type props = {
  onReject?: () => void;
  disable?: boolean;
  loading?: boolean;
  approvedDate?: string;
} & (
  | {
      status?: InvoiceStatus;
      createdDate: string;
    }
  | {
      status?: "create";
      createdDate?: string;
    }
);

const SaleStaffInvoiceAction = ({
  status,
  onReject,
  loading,
  disable,
  createdDate,
  approvedDate,
}: props) => {
  if (!status) {
    return <></>;
  }
  if (status === "discarded" || status === "approved") {
    return (
      <div className={"mt-2 flex flex-col"}>
        <Text align={"center"} size={"lg"} color={"dimmed"}>
          {status === "discarded"
            ? "Hóa đơn đã bị hủy"
            : "Hóa đơn đã được xác nhận."}
        </Text>
        <Text align={"center"} size={"xs"} mb={16} color={"dimmed"}>
          Trạng thái của hóa đơn không thể thay đổi.
        </Text>

        {status === "approved" && (
          <TimeInvoiceInformation
            createdDate={createdDate}
            approvedDate={approvedDate}
          />
        )}
      </div>
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
