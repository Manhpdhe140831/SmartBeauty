import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../../const/user-role.const";
import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import InvoiceDetail from "../../../_shared/invoice/invoice-detail";
import CustomerInformationBlock from "../../../_shared/invoice/_partial/detail/customer-information";
import PurchaseListInformation from "../../../_shared/invoice/_partial/detail/purchase-list-information";
import SearchBillingItems from "./_partial/search-billing-items";

const SaleStaffInvoiceCreate: AppPageInterface = () => {
  const router = useRouter();
  const { customerId, previousUrl, page } = router.query;

  function navigatePreviousPage(previousUrl?: string, page?: number): void {
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

  return (
    <div className={"flex h-full flex-col bg-gray-100 p-4"}>
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
          <span>Create Invoice</span>
        </h1>
      </div>

      <Divider my={16} />

      <InvoiceDetail
        context={() => (
          <>
            {/*   Customer section        */}
            <CustomerInformationBlock
              readOnly={false}
              onChange={(id) => console.log(id)}
              customerId={customerId ? Number(customerId as string) : undefined}
            />
            {/*   Invoice purchased items */}
            <PurchaseListInformation
              data={[]}
              render={(item, index) => {
                return <></>;
              }}
            />

            <SearchBillingItems />
          </>
        )}
        action={() => <></>}
      />
    </div>
  );
};

export default SaleStaffInvoiceCreate;
