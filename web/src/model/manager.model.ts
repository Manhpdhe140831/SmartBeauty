import { GENDER } from "../const/gender.const";

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
