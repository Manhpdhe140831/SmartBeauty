import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import InvoiceCreate from "../../../_shared/invoice/invoice-create";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../../const/user-role.const";
import SaleStaffInvoiceAction from "../../../_shared/invoice/_partial/detail/action.sale_staff";
import { InvoiceCreateEntity } from "../../../../model/invoice.model";
import { useScheduleDetailQuery } from "../../../../query/model-detail";

const SaleStaffInvoiceCreate: AppPageInterface = () => {
  const router = useRouter();
  const { previousUrl, schedule_id } = router.query;

  const { data: schedule, isLoading } = useScheduleDetailQuery(
    Number(schedule_id as string),
    {
      enabled: router.isReady,
    }
  );

  function navigatePreviousPage(previousUrl?: string): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.sale_staff}/invoice`;
    void router.push({
      pathname: mainPath,
    });
  }

  function onInvoiceClose(data?: InvoiceCreateEntity) {
    console.log(data);
  }

  if (!schedule) {
    if (isLoading) {
      return <>loading...</>;
    }

    void router.replace("/404");
    return <>Navigating...</>;
  }

  return (
    <div className={"flex min-h-full flex-col bg-gray-100 p-4"}>
      <div className="mb-8 flex items-center space-x-4">
        <Button
          onClick={() => navigatePreviousPage(previousUrl as string)}
          leftIcon={<IconArrowLeft />}
        >
          Quay lại
        </Button>
        <h1 className={"flex-1"}>Tạo thông tin hóa đơn</h1>
      </div>

      <InvoiceCreate
        onAction={onInvoiceClose}
        customerId={schedule.customer.id}
        itemId={(schedule.service ?? schedule.course)!.id}
        itemType={schedule.service ? "service" : "course"}
        footerSection={(a) => (
          <SaleStaffInvoiceAction status={"create"} disable={!a.isValid} />
        )}
      />
    </div>
  );
};

export default SaleStaffInvoiceCreate;
