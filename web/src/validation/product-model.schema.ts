import { z } from "zod";
import {
  amountPerUnitSchema,
  descriptionSchema,
  fileUploadSchema,
  idDbSchema,
  imageTypeSchema,
  nameSchema,
  saleSchema,
  unitProductSchema,
} from "./field.schema";
import SupplierModelSchema from "./supplier-model.schema";

const ProductModelSchema = z
  .object({
    name: nameSchema,
    description: descriptionSchema,
    image: fileUploadSchema
      .and(imageTypeSchema)
      // or the avatar field can be url src of the image.
      .or(z.string().url())
      // this field is not required.
      .optional(),
    unit: unitProductSchema,
    dose: amountPerUnitSchema,
  })
  .merge(
    z.object({
      supplier: SupplierModelSchema.or(idDbSchema),
    })
  )
  .extend(saleSchema.shape);

export const ProductInServiceModelSchema = z.object({
  usage: z.number().min(1),
  product: idDbSchema,
});

export default ProductModelSchema;
