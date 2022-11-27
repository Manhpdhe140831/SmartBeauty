import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import InvoiceEdit from "../../../_shared/invoice/invoice-edit";
import { Button, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import SaleStaffInvoiceAction from "../../../_shared/invoice/_partial/detail/action.sale_staff";
import { USER_ROLE } from "../../../../const/user-role.const";
import { useRouter } from "next/router";
import { InvoiceUpdateEntity } from "../../../../model/invoice.model";
import { useInvoiceDetailQuery } from "../../../../query/model-detail";
import useWindowPathname from "../../../../hooks/window-pathname.hook";

const SaleStaffInvoiceDetail: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const { previousUrl, page } = router.query;

  const id = Number(paths.at(-1));

  const { data, isLoading } = useInvoiceDetailQuery(id, {
    enabled: id !== undefined && !isNaN(id),
  });

  if (isNaN(id) || id <= 0 || (!isLoading && !data)) {
    void router.replace("/404");
    return <>redirecting</>;
  }

  function navigatePreviousPage(previousUrl?: string): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.sale_staff}/invoice`;
    void router.push({
      pathname: mainPath,
      query: page
        ? {
            page: String(page),
          }
        : undefined,
    });
  }

  function onInvoiceClose(data?: InvoiceUpdateEntity) {
    console.log(data);
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
        <h1 className={"flex-1"}>
          <span>Chi tiết Hóa Đơn</span>
          <Text className={"inline select-none"} color={"dimmed"}>
            #{data?.id ?? "-"}
          </Text>
        </h1>
      </div>

      {data && (
        <InvoiceEdit
          onAction={onInvoiceClose}
          data={data}
          footerSection={(a) => (
            <SaleStaffInvoiceAction
              status={data.status}
              disable={!a.isValid}
              createdDate={data.createdDate}
              approvedDate={data.approvedDate}
            />
          )}
        />
      )}
    </div>
  );
};

export default SaleStaffInvoiceDetail;
