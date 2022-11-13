/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */
import { z } from "zod";
import { invoiceItemTypeSchema } from "../validation/invoice.schema";

export type BillItemType = z.infer<typeof invoiceItemTypeSchema>;

export type BillItemsModel = {
  quantity: number;
  type: BillItemType;
  item: number;
};

export interface InvoiceModel {
  id: number;
  branch: number;
  customer: number;
  staff: number;
  status: string;
  createdDate: string;
  approvedDate: string;
  priceBeforeTax: number;
  priceAfterTax: number;
  items: BillItemsModel[];
}

export type BillCreateEntity = Omit<
  InvoiceModel,
  "id" | "branch" | "staff" | "createdDate"
>;

export type BillUpdateEntity = Pick<InvoiceModel, "id" | "status">;
