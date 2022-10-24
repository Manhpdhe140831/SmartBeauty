import { z } from "zod";
import {
  addressSchema,
  ageSchemaFn, createPasswordSchema,
  emailSchema,
  fileUploadSchema,
  genderSchema, imageTypeSchema,
  mobileSchema,
  nameSchema
} from "./field.schema";

// validation schema.
export const accountInfo = z.object({
  name: nameSchema,
  mobile: mobileSchema,
  email: emailSchema,
  dateOfBirth: ageSchemaFn(),
  gender: genderSchema,
  address: addressSchema,
  avatar: fileUploadSchema.and(imageTypeSchema),
});

export const validateSchema = accountInfo
  .merge(createPasswordSchema)
  // refine to check confirmPassword and password match.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error,
  });
