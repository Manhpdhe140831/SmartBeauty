/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */
import { CustomerModel } from "./customer.model";
import { StaffModel } from "./staff.model";
import { SupplierModel } from "./supplier.model";

export interface BillModel<> {
  id: number;
  customer: CustomerModel;
  staff: StaffModel;
  supplier: SupplierModel;
  status: string;
  createdDate: string;
  price: number;
}

export interface BillCreateEntity
  extends Omit<
    BillModel,
    "id" | "customer" | "supplier" | "staff" | "createdDate"
  > {
  customer: number;
  supplier: number;
  createdDate: Date;
}

export interface BillUpdateEntity
  extends Omit<
    Partial<BillModel>,
    "id" | "customer" | "supplier" | "staff" | "createdDate"
  > {
  id: number;
  customer?: number;
  supplier?: number;
  createdDate?: Date;
}
