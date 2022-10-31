import axios, { AxiosError } from "axios";
import { PaginatedResponse } from "../interfaces/api-core.interface";
import { BranchModel, BranchCreateEntity } from "../model/branch.model";
import { IErrorResponse } from "../interfaces/api.interface";
import { jsonToFormData } from "../utilities/form-data.helper";

/**
 * Get all available branches in the system.
 * @param page
 * @param pageSize
 */
export async function getAllBranch(page: number, pageSize = 10) {
  try {
    const apiResult = await axios.get<PaginatedResponse<BranchModel>>(
      "/branch/getAllbranch",
      {
        params: {
          page,
          pageSize,
        },
      }
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

/**
 * Create a new branch.
 * @param payload
 */
export async function createBranch(payload: BranchCreateEntity) {
  try {
    const formData = jsonToFormData(payload);
    const apiResult = await axios.post<boolean>("/branch/save", formData);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
