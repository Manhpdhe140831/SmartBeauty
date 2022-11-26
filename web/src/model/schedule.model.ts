import {StaffModel} from "./staff.model";
import {UserModel} from "./user.model";
import {SpaBedModel} from "./spa-bed.model";
import {ServiceModel} from "./service.model";

export interface BookingModel {
    id: number;
    slot: number;
    bed: SpaBedModel | undefined;
    sale_staff: StaffModel | undefined;
    tech_staff: StaffModel | undefined;
    customer: UserModel | undefined;
    service?: ServiceModel | undefined;
    course?: ServiceModel | undefined;
    status: string;
    note: string;
}

export enum ScheduleStatus {
    Cancel,
    Waiting,
    // OnGoing,
    Finish,
}
