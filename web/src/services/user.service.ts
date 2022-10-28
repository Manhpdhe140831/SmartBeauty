import axios, { AxiosError } from "axios";
import { IErrorResponse, ILoginResponse } from "../interfaces/api.interface";

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
