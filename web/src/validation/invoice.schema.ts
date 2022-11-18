import { z } from "zod";
import { idDbSchema, priceSchema } from "./field.schema";

export const invoiceItemTypeSchema = z.enum(["service", "course"]);

export const invoiceItemSchema = z.object({
  quantity: z.number().min(1).max(100),
  item: idDbSchema,
});

export const invoiceCreateSchema = z.object({
  customer: idDbSchema,
  priceBeforeTax: priceSchema,
  priceAfterTax: priceSchema,
  item: idDbSchema,
  itemType: invoiceItemTypeSchema,
  addons: z.array(invoiceItemSchema).min(1),
});
