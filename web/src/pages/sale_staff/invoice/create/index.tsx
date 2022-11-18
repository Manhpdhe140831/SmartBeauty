import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { RawServices } from "../../../../mock/service";
import { ServiceModel } from "../../../../model/service.model";
import { Customers } from "../../../../mock/customer";
import { CustomerModel } from "../../../../model/customer.model";
import InvoiceCreate from "../../../_shared/invoice/invoice-create";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../../const/user-role.const";
import SaleStaffInvoiceAction from "../../../_shared/invoice/_partial/detail/action.sale_staff";
import { InvoiceCreateEntity } from "../../../../model/invoice.model";

const SaleStaffInvoiceCreate: AppPageInterface = () => {
  const router = useRouter();
  const { previousUrl } = router.query;

  const mockPurchaseItem = RawServices[4] as ServiceModel;
  const mockCustomer = Customers[0] as CustomerModel;

  function navigatePreviousPage(previousUrl?: string): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.sale_staff}/invoice`;
    void router.push({
      pathname: mainPath,
    });
  }

  function onInvoiceClose(data?: InvoiceCreateEntity) {
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
        <h1 className={"flex-1"}>Tạo thông tin hóa đơn</h1>
      </div>

      <InvoiceCreate
        onClose={onInvoiceClose}
        customerId={mockCustomer.id}
        itemId={mockPurchaseItem.id}
        itemType={"service"}
        footerSection={(a) => (
          <SaleStaffInvoiceAction status={"create"} disable={!a.isValid} />
        )}
      />
    </div>
  );
};

export default SaleStaffInvoiceCreate;
