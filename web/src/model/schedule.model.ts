import {StaffModel} from "./staff.model";
import {UserModel} from "./user.model";
import {SpaBedModel} from "./spa-bed.model";
import {ServiceModel} from "./service.model";
import {SlotModal} from "./slot.model";

type BaseScheduleModel = {
    id: number;
    slot: SlotModal;
    bed: SpaBedModel;
    sale_staff: StaffModel;
    tech_staff: StaffModel;
    customer: UserModel;
    status: ScheduleStatus;
    note: string;
    isBill: boolean;
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

export type updateScheduleStatus = {
    id: number,
    status: ScheduleStatus
}

export type isBillStatus = {
    schedule_id: number,
    status: boolean
}

export enum ScheduleStatus {
    Cancel,
    Waiting,
    Finish,
}

export const ScheduleStatusMap = {
    "Hủy": ScheduleStatus.Cancel,
    "Chờ": ScheduleStatus.Waiting,
    "Hoàn tất": ScheduleStatus.Finish
}
