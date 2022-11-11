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
  product: ProductModel;
};

export type BillServiceItem = BillItem & {
  type: "service";
  service: ServiceModel;
};

export type BillCourseItem = BillItem & {
  type: "course";
  course: CourseModel;
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

export type BillProductEntity = Omit<BillProductItem, "product"> & {
  productId: number;
};
export type BillServiceEntity = Omit<BillServiceItem, "service"> & {
  serviceId: number;
};
export type BillCourseEntity = Omit<BillCourseItem, "course"> & {
  courseId: number;
};

export type BillCreateEntity = Omit<
  InvoiceModel,
  "id" | "branch" | "staff" | "createdDate" | "items"
> & {
  items: BillProductEntity | BillServiceEntity | BillCourseEntity;
};

export type BillUpdateEntity = Pick<InvoiceModel, "id" | "status">;
