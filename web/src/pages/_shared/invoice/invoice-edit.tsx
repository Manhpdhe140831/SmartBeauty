import {
  BillingProductCreateEntity,
  InvoiceModel,
} from "../../../model/invoice.model";
import CustomerInformationBlock from "./_partial/detail/customer-information";
import PurchaseItemInformation from "./_partial/detail/purchase-item-information";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AddonsListInformation from "./_partial/detail/addon-list-information";
import SearchBillingItems from "../../sale_staff/invoice/create/_partial/search-billing-items";
import ItemAddonEdit from "./_partial/detail/_item-edit.addon";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  invoiceCreateSchema,
  invoiceItemSchema,
} from "../../../validation/invoice.schema";
import { z } from "zod";
import { FormEventHandler } from "react";
import { Divider } from "@mantine/core";

type props = {
  onClose?: (data?: BillingProductCreateEntity[]) => void;
  data: InvoiceModel;

  footerSection: (
    formState: ReturnType<typeof useForm>["formState"]
  ) => JSX.Element;
};

const InvoiceCreate = ({ onClose, data, footerSection }: props) => {
  const editSchema = z.object({
    addons: z.array(invoiceItemSchema).min(1),
  });

  const { reset, control, formState, handleSubmit, getValues } = useForm<
    z.infer<typeof editSchema>
  >({
    resolver: zodResolver(editSchema),
    mode: "onBlur",
    defaultValues: {
      addons: data.addons.map((i) => ({
        item: i.item.id,
        quantity: i.quantity,
      })),
    },
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

  const onSubmit = (data: z.infer<typeof editSchema>) => {
    onClose && onClose(data.addons);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      className="mx-auto flex w-[90vw] max-w-[800px] flex-col space-y-10 rounded-lg bg-white p-4 shadow"
    >
      {/*   Customer section        */}
      <CustomerInformationBlock customerId={data.customer} />

      <PurchaseItemInformation item={data.item} itemType={data.itemType} />

      <div className="flex flex-col space-y-4">
        <AddonsListInformation
          removable
          data={itemsArray}
          renderItem={(item, index) => (
            <Controller
              key={`${item.id}-container`}
              control={control}
              render={({ field }) => (
                <ItemAddonEdit
                  itemNo={index}
                  itemId={item.item}
                  itemQuantity={item.quantity}
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

        <Divider my={16} />

        {/*<PricingInformation addons={watch("addons")} />*/}
      </div>
      {JSON.stringify(invoiceCreateSchema.safeParse(getValues()))}

      {footerSection && footerSection(formState)}
    </form>
  );
};

export default InvoiceCreate;
