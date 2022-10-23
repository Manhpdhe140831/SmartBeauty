import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ManagerModel } from "../../../model/manager.model";
import mockManager from "../../../mock/manager";
import BtnCreateManager from "./_partial/_btn-create-manager";
import { Divider, Pagination, Table } from "@mantine/core";
import TableHeader from "./_partial/_table-header";
import TableRecordHolder from "../../../components/table-record-holder";
import TableRecord from "./_partial/_table-record";
import ManagerViewModal from "./_partial/_btn-view-manager";

const ManageManager: AppPageInterface = () => {
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // query to get the list of the manager
  const {
    data: managers,
    isLoading,
    refetch,
  } = useQuery<ManagerModel[]>(["list-manager", page], async () => {
    const managers = await mockManager();
    setTotalRecords(managers.length);
    setPage(1);
    return managers;
  });

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      {/*  Search section   */}
      <div className="flex justify-end space-x-2">
        {/*  Btn create new manager   */}
        <BtnCreateManager onChanged={(e) => console.log(e)} />
      </div>

      <Divider my={8}></Divider>

      <div className="flex-1">
        <Table
          className={"table-fixed"}
          withBorder
          withColumnBorders
          highlightOnHover
        >
          <colgroup>
            <col className="w-14" />
            <col className="w-44" />
            <col className="w-28" />
            <col className="w-44" />
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
              managers &&
              managers.map((d, i) => (
                <TableRecord
                  key={d.id}
                  no={i + 1}
                  data={d}
                  action={<ManagerViewModal managerData={d} />}
                />
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Divider my={8}></Divider>

      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={page}
        onChange={setPage}
        total={totalRecords / 10}
      ></Pagination>
    </div>
  );
};

ManageManager.routerName = "Account Manager";

export default ManageManager;
