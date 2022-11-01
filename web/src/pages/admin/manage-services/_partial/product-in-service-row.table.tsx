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
import { ActionIcon, Image, NumberInput, Select } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useEffect, useState } from "react";
import AutoCompleteItem, {
  AutoCompleteItemProp,
} from "../../../../components/auto-complete-item";
import { useQuery } from "@tanstack/react-query";
import mockProduct from "../../../../mock/product";
import { formatPrice } from "../../../../utilities/fn.helper";
import { ProductModel } from "../../../../model/product.model";
import FormErrorMessage from "../../../../components/form-error-message";

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
  const [selected, setSelected] = useState<ProductModel | null>();
  const [products, setProducts] = useState<ProductModel[]>([]);

  const { data: availableProducts, isLoading: productLoading } = useQuery<
    AutoCompleteItemProp<ProductModel>[]
  >(["available-product"], async () => {
    const p = await mockProduct();
    setProducts(p);
    return p.map((p) => ({
      // add fields of SelectItemGeneric
      value: String(p.id),
      label: p.name,
      data: {
        ...p,
        description: `${formatPrice(p.price)} VND`,
      },
    }));
  });

  useEffect(() => {
    // update selected product
    if (field.product === undefined || field.product === null) {
      setSelected(null);
      return;
    }
    setSelected(getProductById(field.product, products));
  }, [products, field.product]);

  function getProductById(id: number | null, fromList: ProductModel[]) {
    if (id === null) {
      return undefined;
    }
    return fromList.find((p) => p.id === id);
  }

  return (
    <tr key={field.id}>
      <td className={"text-center"}>{index + 1}</td>
      <td>
        <div className="aspect-square w-full overflow-hidden rounded shadow-lg">
          {selected && (
            <Image
              width={"100%"}
              fit={"cover"}
              src={selected.image}
              alt={selected.name}
            />
          )}
        </div>
      </td>
      <td className={"overflow-hidden text-ellipsis whitespace-nowrap"}>
        <Controller
          render={({ field: ControlledField }) => (
            <Select
              data={
                !availableProducts || productLoading ? [] : availableProducts
              }
              placeholder={"product's name..."}
              searchable
              itemComponent={AutoCompleteItem}
              nothingFound="No options"
              maxDropdownHeight={200}
              onChange={(id) => {
                // debugger;
                setSelected(getProductById(Number(id), products));
                ControlledField.onChange(id ? Number(id) : null);
              }}
              onBlur={ControlledField.onBlur}
              required
              defaultValue={field.product ? String(field.product) : null}
            />
          )}
          control={control}
          name={`products.${index}.product` as Path<inferParentSchema>}
        />
        <FormErrorMessage
          noPreHeight={true}
          errors={errors}
          name={`products.${index}.product`}
        />
      </td>
      <td className={"text-center"}>{selected?.dose}</td>
      <td
        className={
          "overflow-hidden text-ellipsis whitespace-nowrap text-center"
        }
      >
        {selected?.unit}
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
