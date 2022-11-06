import { useQuery } from "@tanstack/react-query";
import { CourseModel } from "../../model/course.model";
import mockCourse from "../../mock/course";
import usePaginationHook from "../../hooks/pagination.hook";
import { PaginatedResponse } from "../../interfaces/api.interface";
import { BranchModel } from "../../model/branch.model";
import { ManagerModel } from "../../model/manager.model";
import { getAllBranch } from "../../services/branch.service";
import { getAllAccount } from "../../services/user.service";
import { USER_ROLE } from "../../const/user-role.const";
import { UserModel } from "../../model/user.model";
import { SupplierModel } from "../../model/supplier.model";
import { getListSupplier } from "../../services/supplier.service";
import { BillModel } from "../../model/bill.model";
import mockBill from "../../mock/bill";
import { ProductModel } from "../../model/product.model";
import { getListProduct } from "../../services/product.service";
import { ServiceModel } from "../../model/service.model";
import mockService from "../../mock/service";

type fnUpdatePagination = ReturnType<typeof usePaginationHook>["update"];

export const useListCourseQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<CourseModel[]>(["list-course", currentPage], () => mockCourse(), {
    onSuccess: (d) => updatePagination({ total: d.length }),
    onError: () => updatePagination({ total: 0, newPage: 1 }),
  });

export const useListServiceQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<PaginatedResponse<ServiceModel>>(
    ["list-service", currentPage],
    async () => {
      const serviceList = await mockService();
      return {
        data: serviceList,
        totalPage: 1,
        totalElement: serviceList.length,
        pageIndex: 1,
      };
    },
    {
      onSuccess: (res) => updatePagination({ total: res.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListProductQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<PaginatedResponse<ProductModel>>(
    ["list-product", currentPage],
    () => getListProduct(currentPage),
    {
      onSuccess: (res) => updatePagination({ total: res.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListBranchQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<PaginatedResponse<BranchModel<ManagerModel>>>(
    // dependencies
    ["list-branch", currentPage],
    // API caller
    () => getAllBranch(currentPage),
    // once API success
    {
      onSuccess: (res) => updatePagination({ total: res.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListUserQuery = <T extends UserModel>(
  type: USER_ROLE | "staff",
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<PaginatedResponse<T>>(
    [`list-${type}`, currentPage],
    () => getAllAccount<T>(currentPage),
    {
      onSuccess: (data) => updatePagination({ total: data.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListSupplierQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<PaginatedResponse<SupplierModel>>(
    ["list-supplier", currentPage],
    () => getListSupplier(currentPage),
    {
      onSuccess: (data) => updatePagination({ total: data.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListInvoiceQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<PaginatedResponse<BillModel>>(
    ["list-invoice", currentPage],
    async () => {
      const bills = await mockBill();
      return {
        pageIndex: 1,
        data: bills,
        totalElement: bills.length,
        totalPage: 1,
      };
    },
    {
      onSuccess: (data) => updatePagination({ total: data.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );
