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

type fnUpdatePagination = ReturnType<typeof usePaginationHook>["update"];

export const useListCourseQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<CourseModel[]>(["list-course", currentPage], () => mockCourse(), {
    onSuccess: (d) => updatePagination({total: d.length}),
    onError: () => updatePagination({total: 0, newPage: 1}),
  });

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
      onSuccess: (res) => updatePagination({total: res.totalElement}),
      onError: () => updatePagination({total: 0, newPage: 1}),
    }
  );

export const useListUser = <T extends UserModel>(
  type: USER_ROLE | "staff",
  currentPage: number,
  updatePagination: fnUpdatePagination
) =>
  useQuery<PaginatedResponse<T>>(
    [`list-${type}`, currentPage],
    () => getAllAccount<T>(currentPage),
    {
      onSuccess: (data) => updatePagination({total: data.totalElement}),
      onError: () => updatePagination({total: 0, newPage: 1}),
    }
  );
