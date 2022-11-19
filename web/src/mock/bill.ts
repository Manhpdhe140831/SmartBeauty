import { InvoiceModel } from "../model/invoice.model";
import { products } from "./product";
import { RawServices } from "./service";
import { RawCourses } from "./course";

export const Invoices: InvoiceModel[] = [
  {
    id: 1,
    customer: 1,
    staff: 1,
    branch: 1,
    status: "pending",
    createdDate: "2022-08-11T05:49:08Z",
    approvedDate: "2022-10-11T05:49:08Z",
    priceBeforeTax: 40000,
    priceAfterTax: 35775,
    item: RawServices[0]!,
    itemType: "service",
    addons: [{ item: products[0]!, quantity: 20 }],
  },
  {
    id: 2,
    customer: 2,
    staff: 2,
    branch: 2,
    status: "approved",
    createdDate: "2022-07-24T20:32:31Z",
    approvedDate: "2022-10-24T20:32:31Z",
    priceBeforeTax: 21655,
    priceAfterTax: 21655,
    item: RawCourses[0]!,
    itemType: "course",
    addons: [{ item: products[2]!, quantity: 5 }],
  },
  {
    id: 3,
    customer: 3,
    staff: 3,
    branch: 3,
    status: "approved",
    createdDate: "2022-06-18T16:42:52Z",
    approvedDate: "2022-10-18T16:42:52Z",
    priceBeforeTax: 59649,
    priceAfterTax: 59649,
    item: RawCourses[2]!,
    itemType: "course",
    addons: [],
  },
  {
    id: 4,
    customer: 4,
    staff: 4,
    branch: 4,
    status: "pending",
    createdDate: "2022-04-07T06:49:16Z",
    approvedDate: "2022-10-07T06:49:16Z",
    priceBeforeTax: 67898,
    priceAfterTax: 67898,
    item: RawServices[2]!,
    itemType: "service",
    addons: [],
  },
  {
    id: 5,
    customer: 5,
    staff: 5,
    branch: 5,
    status: "pending",
    createdDate: "2022-02-03T04:44:14Z",
    approvedDate: "2022-10-03T04:44:14Z",
    priceBeforeTax: 94495,
    priceAfterTax: 94495,
    item: RawServices[1]!,
    itemType: "service",
    addons: [],
  },
];

const mockBill = () =>
  new Promise<InvoiceModel[]>((resolve) =>
    setTimeout(() => resolve(Invoices), 500)
  );

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockBill;
