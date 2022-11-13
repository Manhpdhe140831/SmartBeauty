import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../../const/user-role.const";
import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import InvoiceDetail from "../../../_shared/invoice/invoice-detail";
import CustomerInformationBlock from "../../../_shared/invoice/_partial/detail/customer-information";
import PurchaseListInformation from "../../../_shared/invoice/_partial/detail/purchase-list-information";
import SearchBillingItems from "./_partial/search-billing-items";
import { z } from "zod";
import { idDbSchema, priceSchema } from "../../../../validation/field.schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceItemTypeSchema } from "../../../../validation/invoice.schema";

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

  const invoiceItemSchema = z.object({
    quantity: z.number().min(1).max(100),
    item: idDbSchema,
    type: invoiceItemTypeSchema,
  });

  const schemaCreate = z.object({
    customer: idDbSchema,
    priceBeforeTax: priceSchema,
    priceAfterTax: priceSchema,
    items: z.array(invoiceItemSchema).min(1),
  });

  const {
    control,
    register,
    formState: { errors, dirtyFields, isValid },
    handleSubmit,
  } = useForm<z.infer<typeof schemaCreate>>({
    resolver: zodResolver(schemaCreate),
    mode: "onBlur",
  });

  const {
    fields: itemsArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "items",
  });

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
            <PurchaseListInformation data={itemsArray} />

            <SearchBillingItems />
          </>
        )}
        action={() => <></>}
      />
    </div>
  );
};

export default SaleStaffInvoiceCreate;
