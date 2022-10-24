import { GENDER } from "../const/gender.const";
import { USER_ROLE } from "../const/user-role.const";
import { UserModel } from "./user.model";

/**
 * Raw representation data from the server response.
 */
export interface ManagerModel extends UserModel {
  mobile: string;
  dateOfBirth: string;
  gender: GENDER;
  address: string;
  // this field is fixed to be manager role.
  role: USER_ROLE.manager;
}

/**
 * Interface for the payload to register manager.
 * This payload interface will not have id field,
 * and dataType of dateOfBirth and avatar will be different.
 */
export interface ManagerPayload
  extends Omit<ManagerModel, "id" | "dateOfBirth" | "avatar"> {
  dateOfBirth: Date;
  // if the user does not update the avatar,
  // the datatype will remain the same (as string)
  // otherwise the avatar will be a File.
  avatar: File | string;
}
