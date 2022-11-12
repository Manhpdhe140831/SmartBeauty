import { BookingModel, ScheduleStatus } from "../model/schedule.model";

export const Schedule: BookingModel[] = [
  {
    id: 1,
    slot: 1,
    schedule: [
      {
        id: 1,
        bed_name: "Bed 1",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Cancel,
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
        bed_name: "Bed 2",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Waiting,
        note: "something",
      },
    ],
  },
  {
    id: 3,
    slot: 5,
    schedule: [
      {
        id: 3,
        bed_name: "Bed 3",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Waiting,
        note: "something",
      },
    ],
  },
  {
    id: 4,
    slot: 4,
    schedule: [
      {
        id: 4,
        bed_name: "Bed 4",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Finish,
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
