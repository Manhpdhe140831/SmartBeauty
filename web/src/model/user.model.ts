import { USER_ROLE } from "../const/user-role.const";

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
}
