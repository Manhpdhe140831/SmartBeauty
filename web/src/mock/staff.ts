import { USER_ROLE } from "../const/user-role.const";
import { StaffModel } from "../model/staff.model";

const staff: StaffModel[] = [{
  "id": 1,
  "name": "Saunderson Clover",
  "email": "sclover0@com.com",
  "password": "Oa96PB",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/233x100.png/cc0000/ffffff",
  "phone": "3778400979",
  "dateOfBirth": "2022-06-22T22:06:46Z",
  "gender": "Male",
  "address": "12165 Vernon Parkway"
}, {
  "id": 2,
  "name": "Antonio Scroxton",
  "email": "ascroxton1@gov.uk",
  "password": "oqUmCpSVn",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/123x100.png/5fa2dd/ffffff",
  "phone": "6842025711",
  "dateOfBirth": "2022-09-27T09:30:27Z",
  "gender": "Male",
  "address": "38144 Bellgrove Terrace"
}, {
  "id": 3,
  "name": "Peta Ludovici",
  "email": "pludovici2@acquirethisname.com",
  "password": "pyHIk23ZEes",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/143x100.png/dddddd/000000",
  "phone": "6269767140",
  "dateOfBirth": "2022-06-06T06:56:02Z",
  "gender": "Female",
  "address": "29 Ridgeview Park"
}, {
  "id": 4,
  "name": "Garrick O'Gavin",
  "email": "gogavin3@google.com.au",
  "password": "UthXlB",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/142x100.png/5fa2dd/ffffff",
  "phone": "7922713428",
  "dateOfBirth": "2022-08-27T19:39:32Z",
  "gender": "Male",
  "address": "47324 Oxford Pass"
}, {
  "id": 5,
  "name": "Karlis Neem",
  "email": "kneem4@independent.co.uk",
  "password": "xrWM6KsDCD7u",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/148x100.png/5fa2dd/ffffff",
  "phone": "5775262203",
  "dateOfBirth": "2022-07-04T12:12:58Z",
  "gender": "Polygender",
  "address": "89 Clemons Park"
}, {
  "id": 6,
  "name": "D'arcy Atkins",
  "email": "datkins5@cloudflare.com",
  "password": "F1xXcsLtE4",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/230x100.png/ff4444/ffffff",
  "phone": "4818576221",
  "dateOfBirth": "2022-05-21T21:54:27Z",
  "gender": "Male",
  "address": "4697 Service Center"
}, {
  "id": 7,
  "name": "Tobin Kirtland",
  "email": "tkirtland6@guardian.co.uk",
  "password": "BtmnZWZoH",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/195x100.png/ff4444/ffffff",
  "phone": "1789905975",
  "dateOfBirth": "2022-05-19T21:41:20Z",
  "gender": "Male",
  "address": "9 Bultman Park"
}, {
  "id": 8,
  "name": "Jacinda Wisdom",
  "email": "jwisdom7@exblog.jp",
  "password": "S06zpcrxiH",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/150x100.png/5fa2dd/ffffff",
  "phone": "8666095829",
  "dateOfBirth": "2022-05-04T13:55:59Z",
  "gender": "Female",
  "address": "376 Clove Trail"
}, {
  "id": 9,
  "name": "Karlens Cockton",
  "email": "kcockton8@thetimes.co.uk",
  "password": "cDawjzt",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/217x100.png/dddddd/000000",
  "phone": "1994645078",
  "dateOfBirth": "2022-09-19T05:38:45Z",
  "gender": "Male",
  "address": "04 Petterle Point"
}, {
  "id": 10,
  "name": "Enrichetta Everard",
  "email": "eeverard9@umn.edu",
  "password": "FbD9QcdJ",
  "role": USER_ROLE.employee,
  "avatar": "http://dummyimage.com/202x100.png/dddddd/000000",
  "phone": "6086552729",
  "dateOfBirth": "2022-08-26T01:31:19Z",
  "gender": "Female",
  "address": "5 Swallow Road"
}];

const mockStaff = () =>
  new Promise<StaffModel[]>((resolve) =>
    setTimeout(() => resolve(staff), 500)
  );

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockStaff;
