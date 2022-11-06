import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { Divider, Pagination, Table } from "@mantine/core";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import SupplierHeaderTable from "./_partial/supplier-header.table";
import SupplierRowTable from "./_partial/supplier-row.table";
import SupplierCreateButton from "./_partial/supplier-create.button";
import { useListSupplierQuery } from "../../../query/model-list";

const Index: AppPageInterface = () => {
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook();

  // query to get the list of the supplier
  const {
    data: suppliers,
    isLoading,
    refetch,
  } = useListSupplierQuery(currentPage, updatePagination);

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
              suppliers &&
              suppliers.data.map((d, i) => (
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
        total={totalPage}
      />
    </div>
  );
};

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Supplier";

export default Index;
