import axios, { AxiosError } from "axios";
import {
  IErrorResponse,
  ILoginResponse,
  PaginatedResponse,
} from "../interfaces/api.interface";
import { UserEntity, UserModel } from "../model/user.model";
import { jsonToFormData } from "../utilities/form-data.helper";

export async function loginApi(
  email: string,
  password: string
): Promise<ILoginResponse> {
  try {
    const apiResult = await axios.post("/auth/signin", {
      email,
      password,
    });

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

/**
 * Get all the account based on the user role.
 * @param page
 * @param size
 */
export async function getAllAccount<modelType extends UserModel>(
  page: number,
  size = 10
) {
  try {
    const apiResult = await axios.get<PaginatedResponse<modelType>>(`/user`, {
      params: {
        page,
        pageSize: size,
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
 * TODO: pending server support Multipart content-type.
 * @param payload
 */
export async function createUser<payloadType extends UserEntity, result>(
  payload: payloadType
): Promise<result> {
  try {
    const formData = jsonToFormData(payload);
    const apiResult = await axios.post<result>("/user/save", formData);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

/**
 * @deprecated this is a sample API until the server support FormData with Multipart
 * content-type.
 * @param payload
 */
export async function createUserJson<payloadType extends UserEntity, result>(
  payload: payloadType
): Promise<result> {
  try {
    const jsonified = structuredClone(payload);
    for (const field of Object.keys(payload)) {
      const formKey = field as unknown as keyof payloadType;
      const valueField = payload[formKey];
      if (valueField instanceof Date) {
        // the field date will be converted to a string with ISO format.
        jsonified[formKey] = valueField.toISOString() as never;
      }
    }
    const apiResult = await axios.post<result>("/user/save", jsonified);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
