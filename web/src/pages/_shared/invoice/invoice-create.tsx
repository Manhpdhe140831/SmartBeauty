import { BillingProductItem, InvoiceModel } from "../../../model/invoice.model";
import CustomerInformationBlock from "./_partial/detail/customer-information";
import PurchaseItemInformation from "./_partial/detail/purchase-item-information";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import SearchBillingItems from "../../sale_staff/invoice/create/_partial/search-billing-items";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceCreateSchema } from "../../../validation/invoice.schema";
import { z } from "zod";
import { FormEventHandler, useState } from "react";
import { Divider } from "@mantine/core";
import {
  useCourseDetailQuery,
  useServiceDetailQuery,
} from "../../../query/model-detail";
import PricingInformation from "./_partial/detail/pricing-information";
import { BillingItemData } from "../../../model/_price.model";
import AddonsListInformation from "./_partial/detail/addon-list-information";
import ItemAddonEdit from "./_partial/detail/_item-edit.addon";

type props = {
  onClose?: (data?: z.infer<typeof invoiceCreateSchema>) => void;
  customerId: number;
  itemId: number;
  itemType: InvoiceModel["itemType"];

  footerSection: (
    formState: ReturnType<typeof useForm>["formState"]
  ) => JSX.Element;
};

const InvoiceCreate = ({
  onClose,
  itemId,
  itemType,
  customerId,
  footerSection,
}: props) => {
  const [addons, setAddons] = useState<BillingProductItem[]>([]);
  const { reset, control, formState, handleSubmit, setValue } = useForm<
    z.infer<typeof invoiceCreateSchema>
  >({
    resolver: zodResolver(invoiceCreateSchema),
    mode: "onBlur",
    defaultValues: {
      item: itemId,
      itemType: itemType,
      customer: customerId,
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

  const useQueryFn =
    itemType === "course" ? useCourseDetailQuery : useServiceDetailQuery;
  const { data: item } = useQueryFn(itemId);

  const onNewItemAdded = (item: BillingItemData) => {
    const data = {
      item: item.id,
      quantity: 1,
    };
    append(data);
    setAddons((i) => [
      ...i,
      {
        item: item,
        quantity: 1,
      },
    ]);
  };

  const onRemoveBillingItem = (index: number) => {
    remove(index);
    setAddons((i) => {
      const cloneArr = [...i];
      // remove the item at position
      cloneArr.splice(index, 1);
      return cloneArr;
    });
  };

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    reset();
    onClose && onClose();
  };

  const onSubmit = (data: z.infer<typeof invoiceCreateSchema>) => {
    onClose && onClose(data);
  };

  const onPriceCalculation = ({
    priceAfterTax,
    priceBeforeTax,
  }: Pick<InvoiceModel, "priceAfterTax" | "priceBeforeTax">) => {
    setValue("priceBeforeTax", priceBeforeTax, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("priceAfterTax", priceAfterTax, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      className="mx-auto flex w-[90vw] max-w-[800px] flex-col space-y-10 rounded-lg bg-white p-4 shadow"
    >
      {/*   Customer section        */}
      <CustomerInformationBlock customerId={customerId} />

      {item && <PurchaseItemInformation item={item} itemType={itemType} />}

      <AddonsListInformation
        removable
        data={itemsArray}
        renderItem={(item, index) => (
          <Controller
            control={control}
            name={`addons.${index}.quantity`}
            render={({ field }) => (
              <ItemAddonEdit
                addon={addons[index]}
                itemNo={index}
                onRemove={onRemoveBillingItem}
                onQuantityChange={(quantity) => {
                  field.onChange(quantity);
                  field.onBlur();
                  setAddons((s) => {
                    const clone = [...s];
                    const itemToChange = clone.at(index);
                    if (itemToChange) {
                      itemToChange.quantity = quantity ?? 1;
                    }
                    return clone;
                  });
                }}
              />
            )}
            key={item.id}
          />
        )}
      />

      <div className="flex flex-col space-y-4">
        <SearchBillingItems onChange={onNewItemAdded} />

        <Divider my={16} />

        {item && (
          <PricingInformation
            item={item}
            addons={addons}
            onChange={onPriceCalculation}
          />
        )}
      </div>
      {footerSection && footerSection(formState)}
    </form>
  );
};

export default InvoiceCreate;