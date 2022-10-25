import { BranchModel } from "../model/branch.model";
import { ManagerModel } from "../model/manager.model";
import { GENDER } from "../const/gender.const";
import { USER_ROLE } from "../const/user-role.const";
import { StaffModel } from "../model/staff.model";
import { BillModel } from "../model/bill.model";

const bill: BillModel[] = [{
    id: 1,
    code_bill: "7540",
    date_bill: "10/27/2021",
    provider: "Yodoo",
    cost: "$6.05"
  }, {
    id: 2,
    code_bill: "E8148",
    date_bill: "6/17/2022",
    provider: "Gigabox",
    cost: "$9.35"
  }, {
    id: 3,
    code_bill: "48801",
    date_bill: "4/20/2022",
    provider: "Katz",
    cost: "$4.07"
  }, {
    id: 4,
    code_bill: "1455",
    date_bill: "5/15/2022",
    provider: "Mita",
    cost: "$1.34"
  }, {
    id: 5,
    code_bill: "8781",
    date_bill: "3/10/2022",
    provider: "Yata",
    cost: "$7.68"
  }, {
    id: 6,
    code_bill: "65310",
    date_bill: "1/21/2022",
    provider: "Mybuzz",
    cost: "$5.20"
  }, {
    id: 7,
    code_bill: "37262",
    date_bill: "5/2/2022",
    provider: "Kamba",
    cost: "$6.80"
  }, {
    id: 8,
    code_bill: "6820",
    date_bill: "11/22/2021",
    provider: "Topicblab",
    cost: "$6.27"
  }, {
    id: 9,
    code_bill: "99699",
    date_bill: "2/19/2022",
    provider: "Tagpad",
    cost: "$2.91"
  }, {
    id: 10,
    code_bill: "72782",
    date_bill: "8/21/2022",
    provider: "Jaxworks",
    cost: "$2.15"
  }];

const mockBill = () =>
  new Promise<BillModel[]>((resolve) =>
    setTimeout(() => resolve(bill), 500)
  );

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockBill;
