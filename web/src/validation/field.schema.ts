import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../const/file.const";
import { GENDER } from "../const/gender.const";
import dayjs from "dayjs";

export const nameSchema = z.string().min(3).max(120);
export const emailSchema = z.string().email().max(120);
export const mobileSchema = z
  .string()
  .refine((p) => !!p && p.replace(/\s/g, "").match(/^0\d{9}$/), {
    message: "Mobile does not have correct format.",
  });

export const addressSchema = z.string().min(3).max(200);
export const fileUploadSchema = z
  .any()
  .refine((f) => !!f, { message: "A file is required" })
  .refine((f) => !!f && f.size <= 5000000, {
    message: "Max file size is 5MB",
  });

export const imageTypeSchema = z
  .any()
  .refine((f) => !!f && ACCEPTED_IMAGE_TYPES.includes(f.type), {
    message: "Only accept .jpg, .jpeg, .png and .webp",
  });

export const ageSchemaFn = (config?: { minAge?: number; maxAge?: number }) => {
  // the default limit the age to be manager is 18 years old.
  const dateOfAgeMin = dayjs(new Date()).subtract(
    config?.minAge ?? 18,
    "years"
  );
  // the default max the age to be manager is 64 years old.
  const dateOfAgeMax = dayjs(new Date()).subtract(
    config?.maxAge ?? 64,
    "years"
  );
  return z.date().min(dateOfAgeMax.toDate()).max(dateOfAgeMin.toDate());
};

export const genderSchema = z.nativeEnum(GENDER);

export const passwordSchema = z.string().min(3).max(32);

export const createPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});
