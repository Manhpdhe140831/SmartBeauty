import { Modal } from "@mantine/core";
import {
  BillingProductCreateEntity,
  InvoiceModel,
} from "../../../model/invoice.model";
import CustomerInformationBlock from "./_partial/detail/customer-information";
import PurchaseItemInformation from "./_partial/detail/purchase-item-information";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import PurchaseListInformation from "./_partial/detail/addon-list-information";
import SearchBillingItems from "../../sale_staff/invoice/create/_partial/search-billing-items";
import ViewBillingItem from "../../sale_staff/invoice/create/_partial/_view-billing-item";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceCreateSchema } from "../../../validation/invoice.schema";
import { z } from "zod";
import { FormEventHandler } from "react";

type props = {
  opened: boolean;
  onClose?: (data?: z.infer<typeof invoiceCreateSchema>) => void;
  purchasedItem: Pick<InvoiceModel, "item" | "item_type">;
  customerId: number;

  footerSection: (
    formState: ReturnType<typeof useForm>["formState"]
  ) => JSX.Element;
};

const CreateInvoiceDialog = ({
  opened,
  onClose,
  purchasedItem,
  customerId,
  footerSection,
}: props) => {
  const { reset, control, formState, handleSubmit } = useForm<
    z.infer<typeof invoiceCreateSchema>
  >({
    resolver: zodResolver(invoiceCreateSchema),
    mode: "onBlur",
  });

  const {
    fields: itemsArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "addons",
  });

  const onNewItemAdded = (item: BillingProductCreateEntity) => append(item);

  const onRemoveBillingItem = (index: number) => remove(index);

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    reset();
  };

  const onSubmit = (data: z.infer<typeof invoiceCreateSchema>) => {
    onClose && onClose(data);
  };

  return (
    <Modal
      withCloseButton={false}
      closeOnClickOutside={false}
      size={"auto"}
      opened={opened}
      onClose={() => reset()}
      padding={0}
      radius={8}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}
        className="flex w-[90vw] max-w-[800px] flex-1 flex-col space-y-10 p-4 shadow"
      >
        {/*   Customer section        */}
        <CustomerInformationBlock customerId={customerId} />

        <PurchaseItemInformation {...purchasedItem} />

        <div className="flex flex-col space-y-4">
          <PurchaseListInformation
            removable
            data={itemsArray}
            renderItem={(item, index) => (
              <Controller
                key={`${item.id}-container`}
                control={control}
                render={({ field }) => (
                  <ViewBillingItem
                    itemNo={index}
                    itemId={item.item}
                    itemQuantity={item.quantity}
                    itemKey={item.id}
                    onRemove={(index) => onRemoveBillingItem(index)}
                    onQuantityChange={(q) => {
                      field.onChange(q);
                      field.onBlur();
                    }}
                  />
                )}
                name={`addons.${index}.quantity`}
              />
            )}
          />

          <SearchBillingItems onChange={onNewItemAdded} />
        </div>

        {footerSection && footerSection(formState)}
      </form>
    </Modal>
  );
};

export default CreateInvoiceDialog;
