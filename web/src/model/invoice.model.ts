/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */
import { ProductModel } from "./product.model";
import { ServiceModel } from "./service.model";
import { CourseModel } from "./course.model";
import { z } from "zod";
import { invoiceItemTypeSchema } from "../validation/invoice.schema";

type BillingItemBase = {
  quantity: number;
};

export type BillingItemType = z.infer<typeof invoiceItemTypeSchema>;

export type BillingProductItem = BillingItemBase & {
  type: Extract<BillingItemType, "product">;
  item: ProductModel;
};

export type BillingServiceItem = BillingItemBase & {
  type: Extract<BillingItemType, "service">;
  item: ServiceModel;
};

export type BillingCourseItem = BillingItemBase & {
  type: Extract<BillingItemType, "course">;
  item: CourseModel;
};

export type InvoiceItemsModel =
  | BillingCourseItem
  | BillingServiceItem
  | BillingProductItem;

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
  items: InvoiceItemsModel[];
}

export type InvoiceItemsCreateEntity = Omit<InvoiceItemsModel, "item"> & {
  item: number;
};

export type InvoiceCreateEntity = Omit<
  InvoiceModel,
  "id" | "branch" | "staff" | "createdDate" | "items"
> & {
  items: InvoiceItemsCreateEntity[];
};

export type BillUpdateEntity = Pick<InvoiceModel, "id" | "status">;
