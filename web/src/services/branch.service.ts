import axios, { AxiosError } from "axios";
import { BranchModel, BranchCreateEntity } from "../model/branch.model";
import { IErrorResponse, PaginatedResponse } from "../interfaces/api.interface";
import { jsonToFormData } from "../utilities/form-data.helper";
import { ManagerModel } from "../model/manager.model";

/**
 * Get all available branches in the system.
 * @param page
 * @param pageSize
 */
export async function getAllBranch(page: number, pageSize = 10) {
  try {
    const apiResult = await axios.get<
      PaginatedResponse<BranchModel<ManagerModel>>
    >("/branch", {
      params: {
        page,
        pageSize,
      },
    });

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

/**
 * @deprecated this is a sample API until the server support FormData with Multipart
 * @param payload
 */
export async function createBranchJson(payload: BranchCreateEntity) {
  try {
    const jsonified = structuredClone(payload);
    const apiResult = await axios.post<boolean>("/branch/save", jsonified);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
