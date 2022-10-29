import { z } from "zod";
import {
  addressSchema,
  descriptionSchema,
  emailSchema,
  fileUploadSchema,
  imageTypeSchema,
  nameSchema,
  phoneSchema,
  taxCodeSchema,
} from "./field.schema";

const SupplierModelSchema = z.object({
  name: nameSchema,
  taxCode: taxCodeSchema,
  description: descriptionSchema,
  phone: phoneSchema,
  email: emailSchema,
  address: addressSchema,
  supplierImage: fileUploadSchema
    .and(imageTypeSchema)
    .or(z.string().url())
    .optional(),
});

export default SupplierModelSchema;
