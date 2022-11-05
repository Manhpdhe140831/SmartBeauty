import { AppPageInterface } from "../../../interfaces/app-page.interface";
import ListCustomer from "../../_shared/customer/customer-list";
import { USER_ROLE } from "../../../const/user-role.const";
import { useRouter } from "next/router";
import { Divider, Pagination } from "@mantine/core";
import usePaginationHook from "../../../hooks/pagination.hook";
import { useQuery } from "@tanstack/react-query";
import mockCustomer from "../../../mock/customer";

const ManageCustomer: AppPageInterface = () => {
  const router = useRouter();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook(undefined, Number(router.query.page ?? "1"));

  // TODO integrate API list customer.
  const { data: listUser, isLoading: listUserLoading } = useQuery(
    ["list-customer", router.query.role, currentPage],
    () => mockCustomer()
  );

  function navigateToDetail(id: number, currentPage: number) {
    const url = `${router.pathname}/detail/${id}`;
    void router.push(
      {
        pathname: url,
        query: {
          previousUrl: router.pathname,
          page: currentPage,
        },
      },
      url
    );
  }

  return (
    <div className={"flex h-full flex-col space-y-4 p-4"}>
      <div className="flex-1">
        <ListCustomer
          page={currentPage}
          pageSize={pageSize}
          data={listUser}
          isLoading={listUserLoading}
          onRowClick={(d) => navigateToDetail(d.id, currentPage)}
        />
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

ManageCustomer.guarded = USER_ROLE.manager;

export default ManageCustomer;