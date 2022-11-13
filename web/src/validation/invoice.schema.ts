import { z } from "zod";

export const invoiceItemTypeSchema = z.enum(["product", "service", "course"]);
