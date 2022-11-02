import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  Path,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { getServiceModelSchema } from "../../../../validation/service-model.schema";
import { z } from "zod";
import { ActionIcon, Image, NumberInput } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { AutoCompleteItemProp } from "../../../../components/auto-complete-item";
import { useQuery } from "@tanstack/react-query";
import mockProduct from "../../../../mock/product";
import { formatPrice, rawToAutoItem } from "../../../../utilities/fn.helper";
import { ProductModel } from "../../../../model/product.model";
import FormErrorMessage from "../../../../components/form-error-message";
import DatabaseSearchSelect from "../../../../components/database-search.select";
import { useState } from "react";

type ParentSchema = ReturnType<typeof getServiceModelSchema>;
type inferParentSchema = z.infer<ParentSchema>;

type NestedArrayRowProps = {
  control: Control<inferParentSchema>;
  field: FieldArrayWithId<inferParentSchema, "products">;
  register: UseFormRegister<inferParentSchema>;
  index: number;
  errors?: FieldErrors;
  remove: UseFieldArrayRemove;
};

const ProductInServiceRowTable = ({
  control,
  field,
  index,
  errors,
  remove,
}: NestedArrayRowProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(field.product);

  const { data: viewingProduct, isLoading: viewLoading } =
    useQuery<ProductModel | null>(
      ["available-product", selectedId],
      async () => {
        if (selectedId === undefined || selectedId === null) {
          return null;
        }
        const p = await mockProduct();
        const f = p.find((p) => p.id === selectedId);
        return f ?? null;
      }
    );

  const fnHelper = (s: ProductModel) => ({
    id: s.id,
    name: s.name,
    description: `${formatPrice(s.price)} VND`,
  });

  // TODO transfer to service.
  async function searchProduct(
    productName: string
  ): Promise<AutoCompleteItemProp<ProductModel>[]> {
    const listProduct = await mockProduct();
    return listProduct
      .filter((p) => p.name.includes(productName))
      .map((i) => rawToAutoItem(i, fnHelper));
  }

  return (
    <tr key={field.id}>
      <td className={"text-center"}>{index + 1}</td>
      <td>
        <div className="aspect-square w-full overflow-hidden rounded shadow-lg">
          {viewingProduct && (
            <Image
              width={"100%"}
              fit={"cover"}
              src={viewingProduct.image}
              alt={viewingProduct.name}
            />
          )}
        </div>
      </td>
      <td className={"overflow-hidden text-ellipsis whitespace-nowrap"}>
        {viewLoading ? (
          <>loading...</>
        ) : (
          <Controller
            render={({ field: ControlledField }) => (
              <DatabaseSearchSelect
                value={selectedId ? String(selectedId) : null}
                displayValue={
                  viewingProduct
                    ? {
                        ...rawToAutoItem(viewingProduct, fnHelper),
                        disabled: true,
                      }
                    : null
                }
                onSearching={searchProduct}
                onSelected={(_id) => {
                  const id = _id ? Number(_id) : null;
                  ControlledField.onChange(id);
                  setSelectedId(id);
                }}
              />
            )}
            control={control}
            name={`products.${index}.product` as Path<inferParentSchema>}
          />
        )}

        <FormErrorMessage
          noPreHeight={true}
          errors={errors}
          name={`products.${index}.product`}
        />
      </td>
      <td className={"text-center"}>{viewingProduct?.dose}</td>
      <td
        className={
          "overflow-hidden text-ellipsis whitespace-nowrap text-center"
        }
      >
        {viewingProduct?.unit}
      </td>
      <td>
        <Controller
          name={`products.${index}.usage`}
          control={control}
          render={({ field }) => (
            <NumberInput
              placeholder={"amount of quantity per use"}
              defaultValue={field.value}
              onChange={(v) => field.onChange(v)}
              onBlur={field.onBlur}
              hideControls
            />
          )}
        ></Controller>
        <FormErrorMessage
          noPreHeight={true}
          errors={errors}
          name={`products.${index}.usage`}
        />
      </td>
      <td>
        <ActionIcon onClick={() => remove(index)} color={"red"}>
          <IconX size={18} />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default ProductInServiceRowTable;
