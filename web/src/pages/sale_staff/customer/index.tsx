import { AppPageInterface } from "../../../interfaces/app-page.interface";
import ListCustomer from "../../_shared/customer/customer-list";
import { useRouter } from "next/router";
import { Button, Divider, Pagination } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import usePaginationHook from "../../../hooks/pagination.hook";
import { useQuery } from "@tanstack/react-query";
import mockCustomer from "../../../mock/customer";

const SaleStaffCustomerList: AppPageInterface = () => {
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
    <div className={"flex min-h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        {/*  Btn create new customer   */}
        <Button color={"teal"} leftIcon={<IconPlus />}>
          Customer
        </Button>
      </div>

      <Divider my={8}></Divider>

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

export default SaleStaffCustomerList;
