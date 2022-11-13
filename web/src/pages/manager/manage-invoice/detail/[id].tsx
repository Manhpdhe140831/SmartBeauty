import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import useWindowPathname from "../../../../hooks/window-pathname.hook";
import InvoiceDetail from "../../../_shared/invoice/invoice-detail";
import { USER_ROLE } from "../../../../const/user-role.const";
import { Button, Divider, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import mockBill from "../../../../mock/bill";
import CustomerInformationBlock from "../../../_shared/invoice/_partial/detail/customer-information";
import TimeInvoiceInformation from "../../../_shared/invoice/_partial/detail/time-invoice-information";
import PurchaseListInformation from "../../../_shared/invoice/_partial/detail/purchase-list-information";
import StaffInformation from "../../../_shared/invoice/_partial/detail/staff-information";
import PricingInformation from "../../../_shared/invoice/_partial/detail/pricing-information";
import ItemInvoiceTable from "../../../_shared/invoice/_partial/detail/_item-invoice.table";

const ManageInvoiceDetail: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const { previousUrl, page } = router.query;

  const id = Number(paths.at(-1));

  const { data, isLoading } = useQuery(
    ["invoice-detail", id],
    async () => {
      const mockInvoice = await mockBill();
      return mockInvoice.find((s) => s.id === id);
    },
    {
      enabled: id !== undefined && !isNaN(id),
    }
  );

  if (isNaN(id) || id <= 0) {
    void router.replace("/404");
    return <>redirecting</>;
  }

  function navigatePreviousPage(previousUrl?: string, page?: number): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.manager}/manage-invoice`;
    void router.push({
      pathname: mainPath,
      query: page
        ? {
            page: String(page),
          }
        : undefined,
    });
  }

  return (
    <div className={"flex min-h-full flex-col bg-gray-100 p-4"}>
      <div className="flex items-center space-x-4">
        <Button
          leftIcon={<IconArrowLeft />}
          onClick={() =>
            navigatePreviousPage(
              previousUrl as string,
              page ? Number(page as string) : undefined
            )
          }
        >
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

      {isLoading ? (
        <Text>Loading...</Text>
      ) : !data ? (
        <Text>No Invoice found...</Text>
      ) : (
        <InvoiceDetail
          invoice={data}
          context={(invoice) => (
            <>
              {/*   Customer section        */}
              <CustomerInformationBlock customerId={invoice?.customer} />
              {/*   Invoice Datetime        */}
              <TimeInvoiceInformation data={invoice} />
              {/*   Invoice purchased items */}
              <PurchaseListInformation data={invoice?.items ?? []} />
            </>
          )}
          action={(invoice) => (
            <>
              <StaffInformation staffId={invoice?.staff} />

              <PricingInformation data={invoice} />
            </>
          )}
        />
      )}
    </div>
  );
};

export default ManageInvoiceDetail;
