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

export type InvoiceStatus = "pending" | "approved" | "discarded";

type BillingItemBase = {
  quantity: number;
};

export type BillingProductItem = BillingItemBase & {
  item: ProductModel;
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
  item_type: "service" | "course";
  addons: BillingProductItem[];
}

export type BillingProductCreateEntity = Omit<BillingProductItem, "item"> & {
  item: number;
};

export type InvoiceCreateEntity = Omit<
  InvoiceModel,
  "id" | "branch" | "staff" | "createdDate" | "items" | "status"
> & {
  items: BillingProductCreateEntity[];
};

export type BillUpdateEntity = Pick<InvoiceModel, "id" | "status">;
