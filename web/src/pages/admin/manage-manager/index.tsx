import { AppPageInterface } from "../../../interfaces/app-page.interface";
import BtnCreateManager from "./_partial/_btn-create-manager";
import { Divider, Group, Pagination, Table } from "@mantine/core";
import ManagerHeaderTable from "./_partial/manager-header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import ManageRowTable from "./_partial/manager-row.table";
import ManagerViewModal from "./_partial/_btn-view-manager";
import BtnPasswordManager from "./_partial/_btn-password-manager";
import usePaginationHook from "../../../hooks/pagination.hook";
import { USER_ROLE } from "../../../const/user-role.const";
import { useListUser } from "../../../query/model-list";
import { ManagerModel } from "../../../model/manager.model";

const ManageManager: AppPageInterface = () => {
  const {
    pageSize,
    currentPage,
    totalRecord,
    update: updatePagination,
  } = usePaginationHook();

  // query to get the list of the manager
  const {
    data: allManager,
    isLoading,
    refetch,
  } = useListUser<ManagerModel>(
    USER_ROLE.manager,
    currentPage,
    updatePagination
  );

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      {/*  Search section   */}
      <div className="flex justify-end space-x-2">
        {/*  Btn create new manager   */}
        <BtnCreateManager onChanged={(e) => e && refetch()} />
      </div>

      <Divider my={8}></Divider>

      <div className="flex-1">
        <Table
          className={"table-fixed"}
          withBorder
          withColumnBorders
          highlightOnHover
        >
          <ManagerHeaderTable />

          <tbody>
            {isLoading ? (
              <RowPlaceholderTable
                colSpan={6}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : (
              allManager?.data &&
              allManager.data.map((d, i) => (
                <ManageRowTable
                  key={d.id}
                  no={i + 1}
                  data={d}
                  action={
                    <Group position={"center"} spacing={"xs"}>
                      <ManagerViewModal
                        managerData={d}
                        onChanged={(updated) => updated && refetch()}
                      />
                      <Divider orientation={"vertical"} />
                      <BtnPasswordManager manager={d} />
                    </Group>
                  }
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
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalRecord / pageSize}
      ></Pagination>
    </div>
  );
};

ManageManager.routerName = "Account Manager";
ManageManager.guarded = USER_ROLE.admin;

export default ManageManager;
