import { ScheduleModel, ScheduleStatus } from "../model/schedule.model";
import { slotWorkConst } from "../const/slot-work.const";

export const Schedule: ScheduleModel[] = [
  {
    id: 1,
    bed_name: "Bed 1",
    schedule: [
      {
        booking: "slot_1",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Cancel,
        note: "something",
      }
    ]
  },
  {
    id: 2,
    bed_name: "Bed 2",
    schedule: [
      {
        booking: "slot_2",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Cancel,
        note: "something",
      }
    ]
  },
  {
    id: 3,
    bed_name: "Bed 3",
    schedule: [
      {
        booking: "slot_5",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Cancel,
        note: "something",
      }
    ]
  },
  {
    id: 4,
    bed_name: "Bed 4",
    schedule: [
      {
        booking: "slot_3",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Cancel,
        note: "something",
      }
    ]
  },
]

const mockSchedule = () =>
  new Promise<ScheduleModel[]>((resolve) => setTimeout(() => resolve(Schedule), 500));

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockSchedule;
