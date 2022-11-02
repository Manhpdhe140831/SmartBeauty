import { z } from "zod";
import {
  descriptionSchema,
  fileUploadSchema,
  idDbSchema,
  imageTypeSchema,
  nameSchema,
  refineSaleSchema,
  saleSchema,
} from "./field.schema";

const BaseCourseModelSchema = refineSaleSchema(
  z
    .object({
      name: nameSchema,
      description: descriptionSchema,
      timeOfUse: z.number().min(1),
      expireIn: z.number().min(1),
      services: idDbSchema.array().min(1),
    })
    .extend(saleSchema.shape)
);

export default BaseCourseModelSchema;

export function getCourseModelSchema(mode: "view" | "create") {
  const idSchema = mode === "create" ? idDbSchema.nullable() : idDbSchema;
  const imageSchema =
    mode === "create"
      ? fileUploadSchema.and(imageTypeSchema).nullable()
      : fileUploadSchema.and(imageTypeSchema).or(z.string().url()).nullable();
  return BaseCourseModelSchema.extend({ id: idSchema, image: imageSchema });
}
