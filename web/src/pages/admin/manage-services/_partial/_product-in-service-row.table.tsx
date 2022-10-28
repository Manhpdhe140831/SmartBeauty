import {
  FieldValues,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";

type NestedArrayRowProps<T extends FieldValues> = {
  field: Record<"id", string>;
  register: UseFormRegister<T>;
  parentName: keyof T;
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
}: NestedArrayRowProps<T>) => {
  //{...register(`${String(parentName)}.${index}.name` as Path<T>)}

  return (
    <tr key={field.id}>
      <td>{index}</td>
      <td>Image</td>
      <td>Name</td>
      <td>Dose</td>
      <td>Unit</td>
      <td>Uses</td>
      <td></td>
    </tr>
  );
};

export default ProductInServiceRowTable;
