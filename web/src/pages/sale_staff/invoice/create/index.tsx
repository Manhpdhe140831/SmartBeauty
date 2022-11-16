import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { useState } from "react";
import { Button } from "@mantine/core";
import { services } from "../../../../mock/service";
import { ServiceModel } from "../../../../model/service.model";
import { Customers } from "../../../../mock/customer";
import { CustomerModel } from "../../../../model/customer.model";
import CreateInvoiceDialog from "../../../_shared/invoice/create-invoice-dialog";

const SaleStaffInvoiceCreate: AppPageInterface = () => {
  const [open, setOpen] = useState(false);

  const mockPurchaseItem = services[4] as ServiceModel;
  const mockCustomer = Customers[0] as CustomerModel;

  return (
    <div className={"flex min-h-full flex-col bg-gray-100 p-4"}>
      <Button onClick={() => setOpen((s) => !s)}>Open Modal</Button>

      <CreateInvoiceDialog
        opened={open}
        purchasedItem={{
          item: mockPurchaseItem,
          item_type: "service",
        }}
        customerId={mockCustomer.id}
        footerSection={(a) => <></>}
      />
    </div>
  );
};

export default SaleStaffInvoiceCreate;
