import axios, { AxiosError } from "axios";
import {
  IErrorResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import { CustomerCreateEntity, CustomerModel } from "../model/customer.model";
import mockCustomer, { Customers } from "../mock/customer";

/**
 * Get all customers in the branch.
 * @param page
 * @param size
 * @param searchParams
 */
export async function getAllCustomers(
  page: number,
  size = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<PaginatedResponse<CustomerModel>>(
      `/customer`,
      {
        params: {
          page,
          pageSize: size,
          ...(searchParams ?? {}),
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

export async function createCustomer(raw: CustomerCreateEntity) {
  try {
    const apiResult = await axios.post<boolean>("/customer/create", raw);

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function getCustomerById(id: number) {
  try {
    // TODO implement
    // const apiResult = await axios.get<CustomerModel>("/customer/getById", {
    //   params: {
    //     id,
    //   },
    // });
    //
    // return apiResult.data;
    return Customers[id];
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    if (error.status === 400 || error.status === 404) {
      return null;
    }
    console.error(error);
    throw error.response?.data;
  }
}
