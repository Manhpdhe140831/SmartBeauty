import { Button, Divider, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { USER_ROLE } from "../../../const/user-role.const";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import mockBill from "../../../mock/bill";
import { useStaffDetailQuery } from "../../../query/model-detail";
import CustomerInformationBlock from "./_partial/detail/customer-information";
import StaffInformation from "./_partial/detail/staff-information";
import TimeInvoiceInformation from "./_partial/detail/time-invoice-information";
import PricingInformation from "./_partial/detail/pricing-information";
import PurchaseListInformation from "./_partial/detail/purchase-list-information";

type InvoiceDetailProps = {
  role?: USER_ROLE;
  id: number;
  onInfoChanged?: (mutateData: unknown) => void;
  onBackBtnClicked?: () => void;
};

const InvoiceDetail: FC<InvoiceDetailProps> = ({
  id,
  onInfoChanged,
  onBackBtnClicked,
}) => {
  const { data, isLoading } = useQuery(["invoice-detail", id], async () => {
    const mockInvoice = await mockBill();
    return mockInvoice.find((s) => s.id === id);
  });

  const { data: staffDetail } = useStaffDetailQuery(data?.staff);

  return (
    <div className={"flex h-full flex-col bg-gray-100 p-4"}>
      <div className="flex items-center space-x-4">
        <Button leftIcon={<IconArrowLeft />} onClick={onBackBtnClicked}>
          Back
        </Button>
        <h1 className={"flex flex-1 items-center space-x-4"}>
          <span>Invoice Details</span>
          <Text className={"inline select-none"} color={"dimmed"}>
            #{data?.id ?? "-"}
          </Text>
        </h1>
      </div>

      <Divider my={16} />

      <div className="flex items-start space-x-6">
        <div className="flex flex-1 flex-col space-y-6 rounded-lg bg-white p-4 shadow">
          {/*   Customer section    */}
          <CustomerInformationBlock customerId={data?.customer} />
          {/*   Invoice Datetime    */}
          <TimeInvoiceInformation data={data} />

          <PurchaseListInformation data={data} />
        </div>

        <div className="flex w-72 flex-col space-y-6">
          <StaffInformation data={staffDetail} />

          <PricingInformation data={data} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
