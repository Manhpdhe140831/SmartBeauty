import { Divider, Input, Pagination, Table } from "@mantine/core";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { IconSearch } from "@tabler/icons";
import TableHeader from "./_partial/_table-header";
import TableRecord from "./_partial/_table-record";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import BranchCreateModalBtn from "./_partial/_branch-create-modal-btn";
import BranchViewModalBtn from "./_partial/_branch-view-modal-btn";
import { USER_ROLE } from "../../../const/user-role.const";
import usePaginationHook from "../../../hooks/pagination.hook";
import { useListBranchQuery } from "../../../query/model-list";

const Index: AppPageInterface = () => {
  const {
    pageSize,
    currentPage: page,
    totalRecord,
    update: updatePagination,
  } = usePaginationHook();

  const {
    data: fetchBranches,
    isLoading,
    refetch,
  } = useListBranchQuery(page, updatePagination);

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <BranchCreateModalBtn onChanged={(u) => u && refetch()} />

        {/*Search by name*/}
        <Input
          icon={<IconSearch />}
          placeholder={"branch name..."}
          type={"text"}
          className="w-56"
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
            <col className="w-14" />
            <col className="w-40" />
            <col className="w-36" />
            <col className="w-32" />
            <col className="w-28" />
            <col />
            <col className="w-14" />
          </colgroup>
          <TableHeader />
          <tbody>
            {isLoading ? (
              <RowPlaceholderTable
                colSpan={7}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : (
              fetchBranches &&
              fetchBranches.data.map((d, i) => (
                <TableRecord
                  key={d.id}
                  no={i + 1}
                  data={d}
                  action={
                    <BranchViewModalBtn
                      branchData={d}
                      onChanged={(isUpdate) => isUpdate && refetch()}
                    />
                  }
                />
              ))
            )}
          </tbody>
        </Table>
      </div>
      <Divider my={8} />
      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={page}
        onChange={(p) => updatePagination({ newPage: p })}
        total={totalRecord / pageSize}
      ></Pagination>
    </div>
  );
};

Index.routerName = "List of Branches";
Index.guarded = USER_ROLE.admin;

export default Index;
