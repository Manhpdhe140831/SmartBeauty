import { Divider, Input, Pagination, Table } from "@mantine/core";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { IconSearch } from "@tabler/icons";
import TableHeader from "./_table-header";
import TableRecord, { RecordData } from "./_table-record";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableRecordHolder from "../../../components/table-record-holder";

const Index: AppPageInterface = () => {
  const example: Array<RecordData> = [
    {
      id: "1",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
    {
      id: "2",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
    {
      id: "3",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
    {
      id: "4",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
    {
      id: "5",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
    {
      id: "6",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
    {
      id: "7",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
    {
      id: "8",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
    {
      id: "9",
      branchName: "Phòng Khám đa khoa An Việt",
      branchManager: "Phan Văn Đức",
      mobile: "0912333456",
      address: "12 Hoàng quốc việt, Lorem ipsum dolor sit, Hanoi",
    },
  ];
  const [page, setPage] = useState(1);

  const { data: branches, isLoading } = useQuery<RecordData[]>(
    ["list-branch", page],
    () => {
      return new Promise<RecordData[]>((resolve) =>
        setTimeout(() => resolve(example), 1000)
      );
    }
  );

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end">
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
                  id={d.id}
                  branchName={d.branchName}
                  branchManager={d.branchManager}
                  mobile={d.mobile}
                  address={d.address}
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
