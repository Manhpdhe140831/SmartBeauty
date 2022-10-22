import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../const/file.const";

export const nameSchema = z.string().min(3).max(120);
export const emailSchema = z.string().email().max(120);
export const phoneSchema = z
  .string()
  .refine((p) => !!p && p.replace(/\s/g, "").match(/^0\d{9}$/), {
    message: "Số điện thoại không đúng định dạng.",
  });

export const addressSchema = z.string().min(3).max(200);
export const fileUploadSchema = z
  .any()
  .refine((f) => !!f, { message: "Yêu cầu có file upload" })
  .refine((f) => !!f && f.size <= 5000000, {
    message: "Chỉ upload file tối đa 5MB",
  });

export const imageTypeSchema = z
  .any()
  .refine((f) => !!f && ACCEPTED_IMAGE_TYPES.includes(f.type), {
    message: "Chỉ chấp nhận các file có đuôi .jpg, .jpeg, .png and .webp",
  });
