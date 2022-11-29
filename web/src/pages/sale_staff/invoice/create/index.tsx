import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import InvoiceCreate from "../../../_shared/invoice/invoice-create";
import { Button, LoadingOverlay } from "@mantine/core";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../../const/user-role.const";
import SaleStaffInvoiceAction from "../../../_shared/invoice/_partial/detail/action.sale_staff";
import { InvoiceCreateEntity } from "../../../../model/invoice.model";
import { useScheduleDetailQuery } from "../../../../query/model-detail";
import { useMutation } from "@tanstack/react-query";
import { createInvoice } from "../../../../services/invoice.service";
import { showNotification } from "@mantine/notifications";

const SaleStaffInvoiceCreate: AppPageInterface = () => {
  const router = useRouter();
  const { previousUrl, schedule_id } = router.query;

  const { data: schedule, isLoading } = useScheduleDetailQuery(
    Number(schedule_id as string),
    {
      enabled: router.isReady,
    }
  );

  const { mutateAsync, isLoading: mutateLoading } = useMutation(
    ["create-invoice"],
    (payload: InvoiceCreateEntity) => createInvoice(payload),
    {
      onSuccess: (status) => {
        if (status) {
          showNotification({
            title: "Thành công!",
            message: "Đã tạo mới hóa đơn",
            color: "teal",
            icon: <IconCheck />,
          });
          return navigatePreviousPage();
        }
        showNotification({
          title: "Thất Bại!",
          message: "Không thể lưu thông tin, hãy thử lại",
          color: "red",
          icon: <IconX />,
        });
      },
    }
  );

  function navigatePreviousPage(previousUrl?: string): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.sale_staff}/invoice`;
    void router.push({
      pathname: mainPath,
    });
  }

  function onInvoiceClose(data?: InvoiceCreateEntity) {
    if (!data) {
      return;
    }

    void mutateAsync(data);
  }

  if (!schedule) {
    if (isLoading) {
      return <>loading...</>;
    }

    void router.replace("/404");
    return <>Navigating...</>;
  }

  return (
    <div className={"relative flex min-h-full flex-col bg-gray-100 p-4"}>
      <LoadingOverlay visible={isLoading || mutateLoading} overlayBlur={2} />
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
        scheduleId={schedule.id}
        customer={schedule.customer}
        item={(schedule.service ?? schedule.course)!}
        itemType={schedule.service ? "service" : "course"}
        footerSection={(a) => (
          <SaleStaffInvoiceAction status={-1} disable={!a.isValid} />
        )}
      />
    </div>
  );
};

export default SaleStaffInvoiceCreate;
