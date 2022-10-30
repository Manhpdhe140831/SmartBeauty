import { z } from "zod";
import {
  addressSchema,
  ageSchemaFn,
  createPasswordSchema,
  emailSchema,
  fileUploadSchema,
  genderSchema,
  imageTypeSchema,
  phoneSchema,
  nameSchema,
} from "./field.schema";
import { USER_ROLE } from "../const/user-role.const";

/**
 * base validation schema for user model.
 */
export const baseUserSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  dateOfBirth: ageSchemaFn(),
  gender: genderSchema,
  address: addressSchema,
  avatar: fileUploadSchema
    .and(imageTypeSchema)
    // or the avatar field can be url src of the image.
    .or(z.string().url())
    // this field is not required.
    .optional(),
});

/**
 * Validation schema for the manager model.
 * It extends from the baseUserSchema with role fixed to be 'manager'
 */
export const managerModelSchema = baseUserSchema;

/**
 * Validation schema for the employee model.
 * It extends from the baseUserSchema with role fixed to be 'employee'
 */
export const employeeModelSchema = baseUserSchema.merge(
  z.object({
    role: z.literal(USER_ROLE.employee),
  })
);

/**
 * Zod Validation schema for the form related to user-model
 * with password/confirm password field.
 * @param baseUserModelSchema
 */
export const userRegisterSchemaFn = <T extends typeof baseUserSchema.shape>(
  baseUserModelSchema: z.ZodObject<T>
) => {
  return (
    baseUserModelSchema
      .merge(createPasswordSchema)
      // refine to check confirmPassword and password match.
      .refine(
        (data) => {
          /**
           * Typescript was not able to detect a nested type in merge schema.
           * So we're manually parsing the type to silent the error.
           */
          const safeparseData = data as unknown as {
            password: string;
            confirmPassword: string;
          };
          return safeparseData.password === safeparseData.confirmPassword;
        },
        {
          message: "Passwords don't match",
          path: ["confirmPassword"], // path of error,
        }
      )
  );
};
