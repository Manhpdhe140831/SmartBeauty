import { InvoiceModel } from "../model/invoice.model";
import { products } from "./product";
import { services } from "./service";

const Bill: InvoiceModel[] = [
  {
    id: 1,
    customer: 1,
    staff: 1,
    branch: 1,
    status: "false",
    createdDate: "2022-08-11T05:49:08Z",
    approvedDate: "2022-10-11T05:49:08Z",
    priceBeforeTax: 35775,
    priceAfterTax: 35775,
    items: [
      { type: "product", product: products[0]!, quantity: 20 },
      { type: "service", service: services[0]!, quantity: 1 },
    ],
  },
  {
    id: 2,
    customer: 2,
    staff: 2,
    branch: 2,
    status: "false",
    createdDate: "2022-07-24T20:32:31Z",
    approvedDate: "2022-10-24T20:32:31Z",
    priceBeforeTax: 21655,
    priceAfterTax: 21655,
    items: [],
  },
  {
    id: 3,
    customer: 3,
    staff: 3,
    branch: 3,
    status: "true",
    createdDate: "2022-06-18T16:42:52Z",
    approvedDate: "2022-10-18T16:42:52Z",
    priceBeforeTax: 59649,
    priceAfterTax: 59649,
    items: [],
  },
  {
    id: 4,
    customer: 4,
    staff: 4,
    branch: 4,
    status: "true",
    createdDate: "2022-04-07T06:49:16Z",
    approvedDate: "2022-10-07T06:49:16Z",
    priceBeforeTax: 67898,
    priceAfterTax: 67898,
    items: [],
  },
  {
    id: 5,
    customer: 5,
    staff: 5,
    branch: 5,
    status: "true",
    createdDate: "2022-02-03T04:44:14Z",
    approvedDate: "2022-10-03T04:44:14Z",
    priceBeforeTax: 94495,
    priceAfterTax: 94495,
    items: [],
  },
];

const mockBill = () =>
  new Promise<InvoiceModel[]>((resolve) =>
    setTimeout(() => resolve(Bill), 500)
  );

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockBill;
