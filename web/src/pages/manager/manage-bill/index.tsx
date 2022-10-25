import { Divider, Input, Pagination, Table } from "@mantine/core";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { IconSearch } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableRecordHolder from "../../../components/table-record-holder";
import { BillModel } from "../../../model/bill.model";
import mockBill from "../../../mock/bill";
import BranchCreateModalBtn from "../manage-staff/_partial/_staff-create-modal-btn";
import TableHeader from "./_partial/_table-header";
import TableRecord from "./_partial/_table-record";
import BillViewModalBtn from "./_partial/_bill-view-modal-btn";


const Index: AppPageInterface = () => {
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
  
    const {
      data: staffs,
      isLoading,
      refetch,
    } = useQuery<BillModel[]>(["list-bill", page], async () => {
      const staffs = await mockBill();
      setTotalRecords(staffs.length);
      setPage(1);
      return staffs;
    });
  
    return (
      <div className="flex min-h-full flex-col space-y-4 p-4">
        <div className="flex justify-end space-x-2">
          <BranchCreateModalBtn onChanged={(u) => u && refetch()} />
  
          {/*Search by name*/}
          <Input
            icon={<IconSearch />}
            placeholder={"bill name..."}
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
              {/* <col /> */}
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
                staffs &&
                staffs.map((d, i) => (
                  <TableRecord
                    key={d.id}
                    no={i + 1}
                    data={d}
                    action={<BillViewModalBtn billData={d} />}
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
  
  Index.routerName = "List of Bill";
  
  export default Index;
  