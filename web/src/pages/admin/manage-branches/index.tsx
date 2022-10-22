import { Divider, Input, Pagination, Table } from "@mantine/core";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { IconSearch } from "@tabler/icons";
import TableHeader from "./_partial/_table-header";
import TableRecord from "./_partial/_table-record";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableRecordHolder from "../../../components/table-record-holder";
import BranchCreateModalBtn from "./_partial/_branch-create-modal-btn";
import BranchViewModalBtn from "./_partial/_branch-view-modal-btn";
import { mockBranchWithManager } from "../../../mock/branch";
import { BranchModel } from "../../../model/branch.model";
import { ManagerModel } from "../../../model/manager.model";

const Index: AppPageInterface = () => {
  const [page, setPage] = useState(1);

  const {
    data: branches,
    isLoading,
    refetch,
  } = useQuery<BranchModel<ManagerModel>[]>(["list-branch", page], () =>
    mockBranchWithManager()
  );

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <BranchCreateModalBtn onChanged={(u) => u && refetch()} />

        {/*Search by name*/}
        <Input
          icon={<IconSearch />}
          placeholder={"tên chi nhánh..."}
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
            <col className="w-28" />
            <col className="w-28" />
            <col />
            <col className="w-14" />
          </colgroup>
          <TableHeader />
          <tbody>
            {isLoading ? (
              <TableRecordHolder
                colSpan={7}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : (
              branches &&
              branches.map((d, i) => (
                <TableRecord
                  key={d.id}
                  no={i + 1}
                  data={d}
                  action={<BranchViewModalBtn branchData={d} />}
                />
              ))
            )}
          </tbody>
        </Table>
      </div>
      <Divider my={8} />
      <Pagination position="center" page={page} onChange={setPage} total={10} />
    </div>
  );
};

Index.routerName = "Quản lý Chi nhánh";

export default Index;
