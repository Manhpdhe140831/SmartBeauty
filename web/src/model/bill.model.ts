/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */

export interface BillModel {
  id: number;
  branch: number;
  customer: number;
  staff: number;
  status: string;
  createdDate: string;
  approvedDate: string;
  priceBeforeTax: number;
  priceAfterTax: number;
  items: BillItems[];
}

export type BillItems = {
  id: number;
  type: "product" | "service" | "course";
};

export type BillCreateEntity = Omit<
  BillModel,
  "id" | "branch" | "staff" | "createdDate"
>;

export type BillUpdateEntity = Pick<BillModel, "id" | "status">;
