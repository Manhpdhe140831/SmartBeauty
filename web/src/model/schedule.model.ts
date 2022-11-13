import { StaffModel } from "./staff.model";
import { UserModel } from "./user.model";
import { SpaBedModel } from "./spa-bed.model";

export interface BookingModel {
  id: number;
  slot: number;
  schedule: ScheduleModel[];
}

export interface ScheduleModel {
  id: number;
  bedInfo: SpaBedModel | undefined;
  saleStaffInfo: StaffModel | undefined;
  techStaffInfo: StaffModel | undefined;
  customerInfo: UserModel | undefined;
  services: string;
  status: ScheduleStatus;
  note: string;
}

export enum ScheduleStatus {
  Cancel,
  Waiting,
  // OnGoing,
  Finish,
}
