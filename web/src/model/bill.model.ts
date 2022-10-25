
/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */
export interface BillModel<> {
  id: number;
  code_bill: string;
  date_bill: string;
  provider: string;
  cost: string;
}

/**
 * Interface for the payload to register branch.
 * This payload interface will not have id field,
 * and dataType of the logo will be different.
 */
export interface BillPayload<> {
  // if the user does not update the logo,
  // the datatype will remain the same (as string)
  // otherwise the logo will be a File.
}
