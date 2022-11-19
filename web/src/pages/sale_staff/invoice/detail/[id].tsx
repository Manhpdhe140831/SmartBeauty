import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import InvoiceEdit from "../../../_shared/invoice/invoice-edit";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import SaleStaffInvoiceAction from "../../../_shared/invoice/_partial/detail/action.sale_staff";
import { USER_ROLE } from "../../../../const/user-role.const";
import { useRouter } from "next/router";
import {
  BillUpdateEntity,
  InvoiceModel,
} from "../../../../model/invoice.model";
import { Invoices } from "../../../../mock/bill";

const SaleStaffInvoiceDetail: AppPageInterface = () => {
  const router = useRouter();
  const { previousUrl } = router.query;

  const mockInvoice = Invoices[0] as InvoiceModel;

  function navigatePreviousPage(previousUrl?: string): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.sale_staff}/invoice`;
    void router.push({
      pathname: mainPath,
    });
  }

  function onInvoiceClose(data?: BillUpdateEntity) {
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

      <InvoiceEdit
        onAction={onInvoiceClose}
        data={mockInvoice}
        footerSection={(a) => (
          <SaleStaffInvoiceAction status={"create"} disable={!a.isValid} />
        )}
      />
    </div>
  );
};

export default SaleStaffInvoiceDetail;
