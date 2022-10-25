import { ManagerModel } from "./manager.model";

/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */
export interface StaffModel<
  managerType extends number | ManagerModel = number
> {
  id: number;
  name: string;
  Role: string;
  PhoneNumber: string;
}

/**
 * Interface for the payload to register branch.
 * This payload interface will not have id field,
 * and dataType of the logo will be different.
 */
export interface StaffPayload<
  managerType extends number | ManagerModel = number
> extends Omit<StaffModel<managerType>,"id"> {
  // if the user does not update the logo,
  // the datatype will remain the same (as string)
  // otherwise the logo will be a File.
  logo: File | string;
}
