import { StaffModel } from "./staff.model";
import { UserModel } from "./user.model";
import { SpaBedModel } from "./spa-bed.model";
import { ServiceModel } from "./service.model";

type BaseScheduleModel = {
  id: number;
  slot: number;
  bed: SpaBedModel;
  sale_staff: StaffModel;
  tech_staff: StaffModel;
  customer: UserModel;
  status: ScheduleStatus;
  note: string;
};

export type ScheduleModel = BaseScheduleModel &
  (
    | {
        service: ServiceModel;
        course?: ServiceModel;
      }
    | {
        service?: ServiceModel;
        course: ServiceModel;
      }
  );

export enum ScheduleStatus {
  Cancel,
  Waiting,
  Finish,
}
