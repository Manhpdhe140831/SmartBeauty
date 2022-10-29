import { z } from "zod";
import {
  descriptionSchema,
  fileUploadSchema,
  idDbSchema,
  imageTypeSchema,
  nameSchema,
  saleSchema,
} from "./field.schema";
import { ProductInServiceModelSchema } from "./product-model.schema";

const BaseServiceModelSchema = z
  .object({
    nameService: nameSchema,
    description: descriptionSchema,
    duration: z.number().min(0),
    image: fileUploadSchema
      .and(imageTypeSchema)
      .or(z.string().url())
      .nullable(),
    products: ProductInServiceModelSchema.array().min(1),
  })
  .extend(saleSchema.shape);

export default BaseServiceModelSchema;

export function getServiceModelSchema(mode: "view" | "create") {
  const idSchema = mode === "create" ? idDbSchema.nullable() : idDbSchema;
  return BaseServiceModelSchema.merge(z.object({ id: idSchema }));
}
