import { USER_ROLE } from "../const/user-role.const";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: USER_ROLE;
  avatar?: string;
}
