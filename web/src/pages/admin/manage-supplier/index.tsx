import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { useQuery } from "@tanstack/react-query";
import { Divider, Pagination, Table } from "@mantine/core";
import TableRecordHolder from "../../../components/table-record-holder";
import { SupplierModel } from "../../../model/supplier.model";
import mockProviders from "../../../mock/provider";
import SupplierHeaderTable from "./_partial/supplier-header.table";
import SupplierRowTable from "./_partial/supplier-row.table";
import SupplierCreateButton from "./_partial/supplier-create.button";

const Index: AppPageInterface = () => {
  const {
    pageSize,
    currentPage,
    totalRecord,
    update: updatePagination,
  } = usePaginationHook();

  // query to get the list of the supplier
  const {
    data: suppliers,
    isLoading,
    refetch,
  } = useQuery<SupplierModel[]>(
    ["list-supplier", currentPage],
    async () => {
      const suppliers = await mockProviders();
      updatePagination({ total: suppliers.length });
      return suppliers;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      {/*  Search section   */}
      <div className="flex justify-end space-x-2">
        {/*  Btn create new supplier   */}
        <SupplierCreateButton onCreated={refetch} />
      </div>

      <Divider my={8}></Divider>

      <div className="flex-1">
        <Table
          className={"table-fixed"}
          withBorder
          withColumnBorders
          highlightOnHover
          striped
        >
          <SupplierHeaderTable />

          <tbody>
            {isLoading ? (
              <TableRecordHolder
                colSpan={6}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : (
              suppliers &&
              suppliers.map((d, i) => (
                <SupplierRowTable
                  rowUpdated={refetch}
                  key={d.id}
                  data={d}
                  no={getItemNo(i, currentPage, pageSize)}
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
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalRecord / pageSize}
      />
    </div>
  );
};

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Supplier";

export default Index;
