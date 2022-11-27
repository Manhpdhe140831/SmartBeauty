import { z } from "zod";
import { idDbSchema, priceSchema } from "./field.schema";

export const invoiceItemTypeSchema = z.enum(["service", "course"]);

export const invoiceStatusSchema = z.enum(["pending", "approved", "discarded"]);

export const invoiceCreateItemSchema = z.object({
  quantity: z.number().min(1).max(100),
  item: idDbSchema,
});

export const invoiceCreateSchema = z.object({
  customerId: idDbSchema,
  priceBeforeTax: priceSchema,
  priceAfterTax: priceSchema,
  item: idDbSchema,
  itemType: invoiceItemTypeSchema,
  addons: z.array(invoiceCreateItemSchema).min(1),
});
