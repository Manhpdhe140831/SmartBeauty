import { BookingModel, ScheduleModel, ScheduleStatus } from "../model/schedule.model";
import { slotWorkConst } from "../const/slot-work.const";

export const Schedule: BookingModel[] = [
  {
    id: 1,
    booking: "slot_1",
    schedule: [
      {
        bed_name: "Bed 1",
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
    booking: "slot_2",
    schedule: [
      {
        bed_name: "Bed 2",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Waiting,
        note: "something",
      }
    ]
  },
  {
    id: 3,
    booking: "slot_5",
    schedule: [
      {
        bed_name: "Bed 3",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.OnGoing,
        note: "something",
      }
    ]
  },
  {
    id: 4,
    booking: "slot_3",
    schedule: [
      {
        bed_name: "Bed 4",
        sale_name: "Cong Vinh",
        technical_name: "Tan Truong",
        customer_name: "David Beckham",
        customer_phone: "0987896541",
        services: "Chăm sóc da",
        status: ScheduleStatus.Finish,
        note: "something",
      }
    ]
  },
]

const mockSchedule = () =>
  new Promise<BookingModel[]>((resolve) => setTimeout(() => resolve(Schedule), 500));

// export const mockBranchWithManager = () =>
//   new Promise<BranchModel<ManagerModel>[]>((resolve) =>
//     setTimeout(() => resolve(BranchWithManager), 500)
//   );

export default mockSchedule;
