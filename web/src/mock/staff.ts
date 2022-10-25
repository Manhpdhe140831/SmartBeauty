import { BranchModel } from "../model/branch.model";
import { ManagerModel } from "../model/manager.model";
import { GENDER } from "../const/gender.const";
import { USER_ROLE } from "../const/user-role.const";
import { StaffModel } from "../model/staff.model";

const staff: StaffModel[] = [{
    id: 1,
    name: "Desmond",
    PhoneNumber: "Magauran",
    Role: "Kỹ thuật viên"
  }, {
    id: 2,
    name: "Van",
    PhoneNumber: "Bruyntjes",
    Role: "Kỹ thuật viên"
  }, {
    id: 3,
    name: "Dody",
    PhoneNumber: "Korlat",
    Role: "Kỹ thuật viên"
  }, {
    id: 4,
    name: "Birk",
    PhoneNumber: "Pimley",
    Role: "Nhân viên"
  }, {
    id: 5,
    name: "Jeanette",
    PhoneNumber: "Beert",
    Role: "Nhân viên"
  }, {
    id: 6,
    name: "Robin",
    PhoneNumber: "Havesides",
    Role: "Nhân viên"
  }, {
    id: 7,
    name: "Gaspard",
    PhoneNumber: "Dunmore",
    Role: "Nhân viên"
  }, {
    id: 8,
    name: "Arabel",
    PhoneNumber: "Christoffels",
    Role: "Nhân viên"
  }, {
    id: 9,
    name: "Marleen",
    PhoneNumber: "Sommerton",
    Role: "Cố vấn viên"
  }, {
    id: 10,
    name: "Donny",
    PhoneNumber: "Cussons",
    Role: "Cố vấn viên"
  }]

const mockStaff = () =>
  new Promise<StaffModel[]>((resolve) =>
    setTimeout(() => resolve(staff), 500)
  );

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockStaff;
