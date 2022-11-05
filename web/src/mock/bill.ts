import { BillModel } from "../model/bill.model";
import { Customer } from "./customer";
import { Staff } from "./staff";
import { Supplier } from "./supplier";

const Bill: BillModel[] = [
  {
    id: 1,
    customer: Customer.at(1)!,
    staff: Staff.at(1)!,
    supplier: Supplier.at(1)!,
    status: "false",
    createdDate: "2022-08-11T05:49:08Z",
    price: 35775,
  },
  {
    id: 2,
    customer: Customer.at(2)!,
    staff: Staff.at(2)!,
    supplier: Supplier.at(2)!,
    status: "false",
    createdDate: "2022-07-24T20:32:31Z",
    price: 21655,
  },
  {
    id: 3,
    customer: Customer.at(3)!,
    staff: Staff.at(3)!,
    supplier: Supplier.at(3)!,
    status: "true",
    createdDate: "2022-06-18T16:42:52Z",
    price: 59649,
  },
  {
    id: 4,
    customer: Customer.at(4)!,
    staff: Staff.at(4)!,
    supplier: Supplier.at(4)!,
    status: "true",
    createdDate: "2022-04-07T06:49:16Z",
    price: 67898,
  },
  {
    id: 5,
    customer: Customer.at(5)!,
    staff: Staff.at(5)!,
    supplier: Supplier.at(5)!,
    status: "true",
    createdDate: "2022-02-03T04:44:14Z",
    price: 94495,
  },
];

const mockBill = () =>
  new Promise<BillModel[]>((resolve) => setTimeout(() => resolve(Bill), 500));

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockBill;
