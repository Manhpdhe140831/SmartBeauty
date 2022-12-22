import {
  IErrorResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import axios, { AxiosError } from "axios";
import {
  InvoiceCreateEntity,
  InvoiceModel,
  InvoiceUpdateEntity,
} from "../model/invoice.model";

export async function getListInvoices(
  page = 1,
  pageSize = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<PaginatedResponse<InvoiceModel>>(
      "/bill",
      {
        params: {
          page,
          pageSize,
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

export async function getDetailInvoice(id: number) {
  try {
    const apiResult = await axios.get<InvoiceModel>("/bill/getById", {
      params: {
        id,
      },
    });

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function createInvoice(data: InvoiceCreateEntity) {
  try {
    const apiResult = await axios.post<InvoiceModel>("/bill/create", data);
    // console.log(apiResult.data.id);
    exportPdf(apiResult.data.id);
    return apiResult.data;

  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateInvoiceStatus(data: InvoiceUpdateEntity) {
  try {
    const apiResult = await axios.put<boolean>("/bill/update", data);

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function exportPdf(id: number) {
  try {
    axios({
      url: '/bill/pdf?id=' + id, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'bill_' + id + '.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export function exportBill(id: number) {
  fetch("http://localhost:8080/api/bill/pdf?id=" + id)
    .then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bill_" + id + ".pdf";
        a.click();
      });
    })
    .catch((rejected) => {
      console.log(rejected);
    });
}
