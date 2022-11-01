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
    name: nameSchema,
    description: descriptionSchema,
    duration: z.number().min(0),
    products: ProductInServiceModelSchema.array().min(1),
  })
  .extend(saleSchema.shape);

export default BaseServiceModelSchema;

export function getServiceModelSchema(mode: "view" | "create") {
  const idSchema = mode === "create" ? idDbSchema.nullable() : idDbSchema;
  const imageSchema =
    mode === "create"
      ? fileUploadSchema.and(imageTypeSchema).nullable()
      : fileUploadSchema.and(imageTypeSchema).or(z.string().url()).nullable();
  return BaseServiceModelSchema.merge(
    z.object({ id: idSchema, image: imageSchema })
  );
}
