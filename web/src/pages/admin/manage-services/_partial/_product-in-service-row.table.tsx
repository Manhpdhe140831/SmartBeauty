import {
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { getServiceModelSchema } from "../../../../validation/service-model.schema";
import { z } from "zod";
import { ActionIcon, Image, Text, Tooltip } from "@mantine/core";
import { IconX } from "@tabler/icons";

type ParentSchema = ReturnType<typeof getServiceModelSchema>;
type inferParentSchema = z.infer<ParentSchema>;

type NestedArrayRowProps = {
  field: FieldArrayWithId<inferParentSchema, "products">;
  register: UseFormRegister<inferParentSchema>;
  parentName: keyof inferParentSchema;
  index: number;
  errors?: FieldErrors;
  remove: UseFieldArrayRemove;
};

const ProductInServiceRowTable = <T extends FieldValues>({
  field,
  index,
  register,
  parentName,
  // errors,
  remove,
}: NestedArrayRowProps) => {
  //{...register(`${String(parentName)}.${index}.name` as Path<T>)}

  return (
    <tr key={field.id}>
      <td>{index + 1}</td>
      <td>
        <div className="aspect-square w-full overflow-hidden rounded shadow-lg">
          <Image
            width={"100%"}
            fit={"cover"}
            src={field.product.image}
            alt={field.product.name}
          />
        </div>
      </td>
      <td className={"overflow-hidden text-ellipsis whitespace-nowrap"}>
        <Tooltip label={field.product.name}>
          <Text>{field.product.name}</Text>
        </Tooltip>
      </td>
      <td className={"text-center"}>{field.product.dose}</td>
      <td
        className={
          "overflow-hidden text-ellipsis whitespace-nowrap text-center"
        }
      >
        {field.product.unit}
      </td>
      <td className={"text-center"}>{field.usage}</td>
      <td>
        <ActionIcon onClick={() => remove(index)} color={"red"}>
          <IconX size={18} />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default ProductInServiceRowTable;
