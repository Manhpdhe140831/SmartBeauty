/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */
import { ServiceModel } from "./service.model";
import { CourseModel } from "./course.model";
import { BillingItemData } from "./_price.model";

export type InvoiceStatus = "pending" | "approved" | "discarded";

export type BillingProductItem = {
  quantity: number;
  item: BillingItemData;
};

export interface InvoiceModel {
  id: number;
  branch: number;
  customer: number;
  staff: number;
  status: InvoiceStatus;
  createdDate: string;
  approvedDate: string;
  priceBeforeTax: number;
  priceAfterTax: number;
  item: ServiceModel | CourseModel;
  itemType: "service" | "course";
  addons: BillingProductItem[];
}

export type BillingProductCreateEntity = Omit<BillingProductItem, "item"> & {
  item: number;
};

export type InvoiceCreateEntity = Omit<
  InvoiceModel,
  | "id"
  | "branch"
  | "staff"
  | "createdDate"
  | "item"
  | "addons"
  | "status"
  | "approvedDate"
> & {
  item: number;
  addons: BillingProductCreateEntity[];
};

export type BillUpdateEntity = Pick<InvoiceModel, "id" | "status">;
