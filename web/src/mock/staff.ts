import { BranchModel } from "../model/branch.model";
import { ManagerModel } from "../model/manager.model";
import { GENDER } from "../const/gender.const";
import { USER_ROLE } from "../const/user-role.const";
import { StaffModel } from "../model/staff.model";

const staff: StaffModel[] = [{
    id: 1,
    name: "Desmond",
    PhoneNumber: "Magauran",
    Role: "dmagauran0@apple.com"
  }, {
    id: 2,
    name: "Van",
    PhoneNumber: "Bruyntjes",
    Role: "vbruyntjes1@nps.gov"
  }, {
    id: 3,
    name: "Dody",
    PhoneNumber: "Korlat",
    Role: "dkorlat2@qq.com"
  }, {
    id: 4,
    name: "Birk",
    PhoneNumber: "Pimley",
    Role: "bpimley3@nsw.gov.au"
  }, {
    id: 5,
    name: "Jeanette",
    PhoneNumber: "Beert",
    Role: "jbeert4@multiply.com"
  }, {
    id: 6,
    name: "Robin",
    PhoneNumber: "Havesides",
    Role: "rhavesides5@ucla.edu"
  }, {
    id: 7,
    name: "Gaspard",
    PhoneNumber: "Dunmore",
    Role: "gdunmore6@slate.com"
  }, {
    id: 8,
    name: "Arabel",
    PhoneNumber: "Christoffels",
    Role: "achristoffels7@amazonaws.com"
  }, {
    id: 9,
    name: "Marleen",
    PhoneNumber: "Sommerton",
    Role: "msommerton8@t.co"
  }, {
    id: 10,
    name: "Donny",
    PhoneNumber: "Cussons",
    Role: "dcussons9@xrea.com"
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
