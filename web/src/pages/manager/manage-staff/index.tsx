import { Divider, Input, Pagination, Table } from "@mantine/core";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { IconSearch } from "@tabler/icons";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import TableHeader from "./_partial/_table-header";
import TableRecord from "./_partial/_table-record";
import StaffViewModalBtn from "./_partial/_staff-view-modal-btn";
import StaffCreateModalBtn from "./_partial/_staff-create-modal-btn";
import StaffDeleteModalBtn from "./_partial/_staff-delete-modal-btn";
import { useListUserQuery } from "../../../query/model-list";
import usePaginationHook from "../../../hooks/pagination.hook";
import { StaffModel } from "../../../model/staff.model";
import { useAuthUser } from "../../../store/auth-user.state";
import { USER_ROLE } from "../../../const/user-role.const";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import { ChangeEvent } from "react";
import {
  ShowFailedDelete,
  ShowSuccessDelete,
} from "../../../utilities/show-notification";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../../services/user.service";

const Index: AppPageInterface = () => {
  const { value: searchKey, onChange: setSearchWord } = useDebounceHook();
  const userRole = useAuthUser((s) => s.user?.role);

  const {
    currentPage,
    update: updatePagination,
    totalPage,
    pageSize,
  } = usePaginationHook();

  const {
    data: staffs,
    isLoading,
    refetch,
  } = useListUserQuery<StaffModel>("staff", currentPage, updatePagination, {
    pageSize,
    searchQuery: searchKey ? { name: searchKey } : undefined,
  });

  const deleteMutation = useMutation(
    ["delete-staff"],
    (id: number) => deleteUser(id),
    {
      onSuccess: (d) => {
        if (d) {
          ShowSuccessDelete();
          return refetch();
        }
        ShowFailedDelete();
      },
      onError: (e) => {
        console.error(e);
        ShowFailedDelete();
      },
    }
  );

  const arrBtn = (data: StaffModel) => {
    return (
      <div className="flex gap-1" key={data.id}>
        <StaffViewModalBtn onChanged={(d) => d && refetch()} staffData={data} />
        {/* <StaffDeleteModalBtn
          onChanged={(d) => d && deleteMutation.mutate(data.id)}
          staffData={data}
        /> */}
      </div>
    );
  };

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <StaffCreateModalBtn
          userRole={userRole!}
          onChanged={(u) => u && refetch()}
        />

        {/*Search by name*/}
        <Input
          icon={<IconSearch />}
          placeholder={"T??n nh??n vi??n..."}
          type={"text"}
          className="w-56"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.currentTarget.value)
          }
        />
      </div>
      <Divider my={8} />
      <div className="flex-1">
        <Table
          className="table-fixed"
          withBorder
          withColumnBorders
          highlightOnHover
        >
          <colgroup>
            <col className="w-4" />
            <col className="w-40" />
            <col className="w-24" />
            <col className="w-14" />
            <col className="w-16" />
          </colgroup>
          <TableHeader />
          <tbody>
            {isLoading ? (
              <RowPlaceholderTable
                colSpan={5}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : staffs && staffs.data.length > 0 ? (
              staffs.data.map((d, i) => (
                <TableRecord
                  key={d.id}
                  no={i + 1}
                  data={d}
                  action={arrBtn(d)}
                />
              ))
            ) : (
              <RowPlaceholderTable
                colSpan={5}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Kh??ng t???n t???i
                  </div>
                }
              />
            )}
          </tbody>
        </Table>
      </div>
      <Divider my={8} />
      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(p) => updatePagination({ newPage: p })}
        total={totalPage}
      ></Pagination>
    </div>
  );
};

Index.routerName = "List of Staff";
Index.guarded = USER_ROLE.manager;

export default Index;
