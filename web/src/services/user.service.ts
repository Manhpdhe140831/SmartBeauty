import axios from "axios";
import { ILoginResponse } from "../interfaces/api.interface";

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
    console.error(e);
    throw e;
  }
}
