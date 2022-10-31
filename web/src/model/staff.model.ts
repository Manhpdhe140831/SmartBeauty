import { UserModel } from "./user.model";
import { USER_ROLE } from "../const/user-role.const";

export interface StaffModel extends UserModel {
  role: USER_ROLE.employee;
  phone: string;
  dateOfBirth: string;
  address: string;
}

export interface StaffPayload extends Omit<StaffModel, "id"> {
  logo: File | string;
}
