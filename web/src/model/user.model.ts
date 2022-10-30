import { USER_ROLE } from "../const/user-role.const";
import { GENDER } from "../const/gender.const";

/**
 * Base model for the user in the system.
 *
 * All users must have these fields included.
 */
export interface UserModel {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: USER_ROLE;
  avatar?: string;
  dateOfBirth: string;
  phone: string;
  gender: GENDER;
  address: string;
}

export interface UserEntity {
  name: string;
  email: string;
  password?: string;
  role?: USER_ROLE;
  // if the user does not update the avatar,
  // the datatype will remain the same (as string)
  // otherwise the avatar will be a File.
  avatar?: File | string;
  dateOfBirth: Date;
}
