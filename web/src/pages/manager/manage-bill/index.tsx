import { Divider, Input, Pagination } from "@mantine/core";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { IconSearch } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { BillModel } from "../../../model/bill.model";
import mockBill from "../../../mock/bill";
import BillCreateModalBtn from "./_partial/_staff-create-modal-btn";
import BillList from "../../_shared/bill/bill-list";
import { useRouter } from "next/router";
import usePaginationHook from "../../../hooks/pagination.hook";

const Index: AppPageInterface = () => {
  const router = useRouter();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook(undefined, Number(router.query.page ?? "1"));

  const {
    data: bills,
    isLoading,
    refetch,
  } = useQuery<BillModel[]>(["list-bill", currentPage], async () => {
    const bills = await mockBill();
    updatePagination({ total: bills.length });
    return bills;
  });

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
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <BillCreateModalBtn onChanged={(u) => u && refetch()} />

        {/*Search by name*/}
        <Input
          icon={<IconSearch />}
          placeholder={"Bill name..."}
          type={"text"}
          className="w-56"
        />
      </div>
      <Divider my={8} />
      <div className="flex-1">
        <BillList
          page={currentPage}
          pageSize={pageSize}
          data={bills}
          isLoading={isLoading}
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

Index.routerName = "List of Bill";

export default Index;
