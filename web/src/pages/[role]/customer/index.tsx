import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../const/user-role.const";
import useWindowPathname from "../../../hooks/window-pathname.hook";
import { Button, Divider, Pagination, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import ListHeaderTable from "./_partial/list/_header.table";
import { useQuery } from "@tanstack/react-query";
import mockCustomer from "../../../mock/customer";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import ListRowTable from "./_partial/list/_row.table";

const ListCustomer: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook();

  const viewingRole = paths[0] as USER_ROLE.manager | USER_ROLE.sale_staff;

  const { data: listUser, isLoading: listUserLoading } = useQuery(
    ["list-customer", router.query.role, currentPage],
    () => mockCustomer()
  );

  if (
    viewingRole !== USER_ROLE.sale_staff &&
    viewingRole !== USER_ROLE.manager
  ) {
    void router.replace("/404");
    return <>redirecting...</>;
  }

  return (
    <div className={"flex h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        {/*  Btn create new customer   */}
        <Button color={"teal"} leftIcon={<IconPlus />}>
          Customer
        </Button>
      </div>

      <Divider my={8}></Divider>

      <div className="flex-1">
        <Table
          className={"table-fixed"}
          withBorder
          withColumnBorders
          highlightOnHover
          striped
          cellSpacing={16}
          horizontalSpacing={16}
          verticalSpacing={16}
        >
          <ListHeaderTable />

          <tbody>
            {listUserLoading ? (
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
              listUser &&
              listUser.map((d, i) => (
                <ListRowTable
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

ListCustomer.guarded = [USER_ROLE.manager, USER_ROLE.sale_staff];

export default ListCustomer;
