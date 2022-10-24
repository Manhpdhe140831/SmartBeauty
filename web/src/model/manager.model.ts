import { GENDER } from "../const/gender.const";

/**
 * Raw representation data from the server response.
 */
export interface ManagerModel {
  id: number;
  name: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: GENDER;
  address: string;
  avatar: string;
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
