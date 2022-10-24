/**
 * Raw representation data from the server response.
 */
export interface BranchModel<managerType = number> {
  id: number;
  name: string;
  manager: managerType;
  mobile: string;
  address: string;
  email: string;
  logo: string;
}

/**
 * Interface for the payload to register branch.
 * This payload interface will not have id field,
 * and dataType of the logo will be different.
 */
export interface BranchPayload<managerType = number>
  extends Omit<BranchModel<managerType>, "id" | "logo"> {
  // if the user does not update the logo,
  // the datatype will remain the same (as string)
  // otherwise the logo will be a File.
  logo: File | string;
}
