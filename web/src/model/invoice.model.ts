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

export type BillItem = {
  quantity: number;
};

export type BillProductItem = BillItem & {
  type: "product";
  item: ProductModel;
};

export type BillServiceItem = BillItem & {
  type: "service";
  item: ServiceModel;
};

export type BillCourseItem = BillItem & {
  type: "course";
  item: CourseModel;
};

export type BillItemsModel = BillCourseItem | BillServiceItem | BillProductItem;

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

export type BillProductEntity = Omit<BillProductItem, "item"> & {
  item: number;
};
export type BillServiceEntity = Omit<BillServiceItem, "item"> & {
  item: number;
};
export type BillCourseEntity = Omit<BillCourseItem, "item"> & {
  item: number;
};

export type BillCreateEntity = Omit<
  InvoiceModel,
  "id" | "branch" | "staff" | "createdDate" | "items"
> & {
  items: (BillProductEntity | BillServiceEntity | BillCourseEntity)[];
};

export type BillUpdateEntity = Pick<InvoiceModel, "id" | "status">;