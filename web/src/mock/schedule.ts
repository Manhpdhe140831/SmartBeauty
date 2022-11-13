import { BookingModel, ScheduleStatus } from "../model/schedule.model";
import { Beds } from "./bed";
import { USER_ROLE } from "../const/user-role.const";
import { GENDER } from "../const/gender.const";

export const Schedule: BookingModel[] = [
  {
    id: 1,
    slot: 1,
    schedule: [
      {
        id: 1,
        bedInfo: Beds[0],
        saleStaffInfo: {
          id: 1,
          name: "Ban hang 1",
          email: "banhang1@gmail.com",
          role: USER_ROLE.sale_staff,
          phone: "0123456789",
          gender: GENDER.male,
          address: "Namek",
          dateOfBirth: "23/12/2222",
        },
        techStaffInfo: {
          id: 1,
          name: "Ky thuat 1",
          email: "kythuat1@gmail.com",
          role: USER_ROLE.technical_staff,
          phone: "0987654321",
          gender: GENDER.female,
          address: "Namek",
          dateOfBirth: "23/12/2222",
        },
        customerInfo: {
          id: 1,
          name: "Customer 1",
          email: "customer1@gmail.com",
          phone: "0123456543",
          gender: GENDER.female,
          address: "Namek",
          dateOfBirth: "23/12/2222",
          role: USER_ROLE.anonymous,
        },
        services: "Chăm sóc da",
        status: ScheduleStatus.Finish,
        note: "something",
      },
    ],
  },
  {
    id: 2,
    slot: 2,
    schedule: [
      {
        id: 2,
        bedInfo: Beds[1],
        saleStaffInfo: {
          id: 2,
          name: "Ban hang 2",
          email: "banhang1@gmail.com",
          role: USER_ROLE.sale_staff,
          phone: "0123456789",
          gender: GENDER.male,
          address: "Namek",
          dateOfBirth: "23/12/2222",
        },
        techStaffInfo: {
          id: 2,
          name: "Ky thuat 2",
          email: "kythuat1@gmail.com",
          role: USER_ROLE.technical_staff,
          phone: "0987654321",
          gender: GENDER.female,
          address: "Namek",
          dateOfBirth: "23/12/2222",
        },
        customerInfo: {
          id: 2,
          name: "Customer 2",
          email: "customer1@gmail.com",
          phone: "0123456543",
          gender: GENDER.female,
          address: "Namek",
          dateOfBirth: "23/12/2222",
          role: USER_ROLE.anonymous,
        },
        services: "Chăm sóc da",
        status: ScheduleStatus.Finish,
        note: "something",
      },
    ],
  },
  {
    id: 3,
    slot: 3,
    schedule: [
      {
        id: 3,
        bedInfo: Beds[3],
        saleStaffInfo: {
          id: 3,
          name: "Ban hang 3",
          email: "banhang3@gmail.com",
          role: USER_ROLE.sale_staff,
          phone: "0123456789",
          gender: GENDER.male,
          address: "Namek",
          dateOfBirth: "23/12/2222",
        },
        techStaffInfo: {
          id: 3,
          name: "Ky thuat 3",
          email: "kythuat1@gmail.com",
          role: USER_ROLE.technical_staff,
          phone: "0987654321",
          gender: GENDER.female,
          address: "Namek",
          dateOfBirth: "23/12/2222",
        },
        customerInfo: {
          id: 3,
          name: "Customer 3",
          email: "customer1@gmail.com",
          phone: "0123456543",
          gender: GENDER.female,
          address: "Namek",
          dateOfBirth: "23/12/2222",
          role: USER_ROLE.anonymous,
        },
        services: "Chăm sóc da",
        status: ScheduleStatus.Cancel,
        note: "something",
      },
    ],
  },
  {
    id: 4,
    slot: 5,
    schedule: [
      {
        id: 4,
        bedInfo: Beds[2],
        saleStaffInfo: {
          id: 4,
          name: "Ban hang 4",
          email: "banhang4@gmail.com",
          role: USER_ROLE.sale_staff,
          phone: "0123456789",
          gender: GENDER.male,
          address: "Namek",
          dateOfBirth: "23/12/2222",
        },
        techStaffInfo: {
          id: 4,
          name: "Ky thuat 4",
          email: "kythuat4@gmail.com",
          role: USER_ROLE.technical_staff,
          phone: "0987654321",
          gender: GENDER.female,
          address: "Namek",
          dateOfBirth: "23/12/2222",
        },
        customerInfo: {
          id: 4,
          name: "Customer 4",
          email: "customer4@gmail.com",
          phone: "0123456543",
          gender: GENDER.female,
          address: "Namek",
          dateOfBirth: "23/12/2222",
          role: USER_ROLE.anonymous,
        },
        services: "Chăm sóc da",
        status: ScheduleStatus.Waiting,
        note: "something",
      },
    ],
  },
];

const mockSchedule = () =>
  new Promise<BookingModel[]>((resolve) =>
    setTimeout(() => resolve(Schedule), 500)
  );

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockSchedule;
