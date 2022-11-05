import { Divider, Input, Pagination, Table } from "@mantine/core";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { IconSearch } from "@tabler/icons";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import TableHeader from "./_partial/_table-header";
import TableRecord from "./_partial/_table-record";
import { StaffModel } from "../../../model/staff.model";
import mockStaff from "../../../mock/staff";
import StaffViewModalBtn from "./_partial/_staff-view-modal-btn";
import StaffCreateModalBtn from "./_partial/_staff-create-modal-btn";
import StaffCDeleteModalBtn from "./_partial/_staff-delete-modal-btn";

const Index: AppPageInterface = () => {
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const {
    data: staffs,
    isLoading,
    refetch
  } = useQuery<StaffModel[]>(["list-staff", page], async () => {
    const staffs = await mockStaff();
    setTotalRecords(staffs.length);
    setPage(1);
    return staffs;
  });

  const arrBtn = (data: any) => {
    return (
      <div className="flex gap-1" key={data.length}>
        <StaffViewModalBtn staffData={data} />
        <StaffCDeleteModalBtn staffData={data} />
      </div>
    )
  };

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <StaffCreateModalBtn onChanged={(u) => u && refetch()} />

        {/*Search by name*/}
        <Input
          icon={<IconSearch />}
          placeholder={"Staff name..."}
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
          ) : (
            staffs &&
            staffs.map((d, i) => (
              <TableRecord
                key={d.id}
                no={i + 1}
                data={d}
                action={arrBtn(d)}
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
        onChange={setPage}
        total={totalRecords / 10}
      ></Pagination>
    </div>
  );
};

Index.routerName = "List of Staff";

export default Index;
